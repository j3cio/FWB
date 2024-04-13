'use client'

import VerifyEmploymentCard from '@/components/ui/linkedin/VerifyEmploymentCard'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const LinkedinPage = () => {
  const [user, setUser] = useState()
  const searchParams = useSearchParams()
  const authorizationCode = searchParams.get('code')
  const authorizationState = searchParams.get('state')

  const fetchData = async () => {
    console.log('firing')
    const accessTokenResponse = await fetch(
      `/api/linkedin?authorizationCode=${authorizationCode}`,
      { method: 'POST' }
    )
    const data = await accessTokenResponse.json()
    if (accessTokenResponse.ok) {
      console.log('access token found', data.data.access_token)
      const accessToken = data.data.access_token
      const userDataResponse = await fetch(
        `/api/linkedin?accessToken=${accessToken}`
      )

      const userData = await userDataResponse.json()
      setUser(userData.userData)
    }
  }

  useEffect(() => {
    console.log({ user })
  }, [user])
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-[#1A1A23]">
      <VerifyEmploymentCard />
      {authorizationCode && authorizationState && (
        <button
          className="rounded bg-white p-4 text-black"
          onClick={() => fetchData()}
        >
          auth code found
        </button>
      )}
      {user && (
        <div className="flex flex-col rounded bg-white p-6 text-xl">
          <p>
            {/* @ts-ignore */}
            Name: {user.localizedFirstName} {user.localizedLastName}
          </p>
          {/* @ts-ignore */}
          <p>Job: {user.localizedHeadline}</p>
        </div>
      )}
    </div>
  )
}

export default LinkedinPage
