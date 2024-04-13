'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import YellowVerifyIcon from './icons/YellowVerifyIcon'
import NavigationArrowIcon from './icons/NavigationArrowIcon'
import { getLinkedinAccessToken } from '@/app/api/linkedin/utils/linkedin_utils'
import { useEffect } from 'react'

const VerifyEmploymentCard = () => {
  // we can change this as needed ofc, something like this: const redirect_UI = process.env.NODE_ENV !== "production" ?  'http://localhost:3000/linkedin' : "https://app.makefwb.com/linkedin", im just leaving it to localhost for debugging

  const router = useRouter()

  const linkedinClientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const linkedinClientSecret = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET // change this from being NEXT_PUBLIC when using actual client config
  const redirect_uri =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/linkedin'
      : 'https://fwb-git-brandon-linkedin-button-j3cs-projects-612eefdf.vercel.app/linkedin'

  if (!linkedinClientId || !linkedinClientSecret) {
    console.error('ENV VARIABLES MISMATCH')
    throw new Error('Missing LinkedIn client ID or client secret.')
  }
  const authCodeParams = new URLSearchParams({
    response_type: 'code',
    client_id: linkedinClientId,
    state: 'crypto.randomUUID()', // This is used to prevent CSRF, so it being random is important
    redirect_uri,
    scope: 'r_basicprofile', // You normally use a chain of scopes, but for now this seems like all we need
  })

  const handleVerification = async () => {
    // STEP 1
    // this is where we get our aothorization code--we need to physically go to our URL to sign in and auth our app
    router.push(
      `https://www.linkedin.com/oauth/v2/authorization?${authCodeParams}`
    )

    // const response = await fetch('/api/linkedin')

    // if (response.ok) {
    //   console.log(await response.json())
    // } else {
    //   console.error('Something went wrong')
    // }
  }

  const searchParams = useSearchParams()
  const authorizationCode = searchParams.get('code')
  const authorizationState = searchParams.get('state')

  useEffect(() => {
    const fetchData = async () => {
      if (authorizationCode && authorizationState) {
        console.log('auth code found')
        const response = await getLinkedinAccessToken({
          authorizationCode,
          linkedinClientId,
          linkedinClientSecret,
          redirect_uri,
        })
        console.log({ response })
      } else {
        console.log("Call not made since we didn't get the auth code yet")
      }
    }
    fetchData()
  }, [])

  return (
    // Not responsive for the moment, this is just to save someone time when we implement this properly. Should be easy to implement since the width is hardcoded at the parent level.
    <article
      className="flex h-[84px] w-[657px] cursor-pointer items-center justify-between rounded-[5px] bg-[#8E94E9] p-4 text-white"
      onClick={() => handleVerification()}
    >
      <section className="flex flex-col">
        <div className="text__container--with-icon flex items-center gap-1">
          <YellowVerifyIcon />
          <h1 className=" text-2xl font-semibold">Verify your employment</h1>
        </div>
        <p className="text__container--without-icon">
          Verified using linkedin and got verification badge
        </p>
      </section>

      <NavigationArrowIcon />
    </article>
  )
}

export default VerifyEmploymentCard
