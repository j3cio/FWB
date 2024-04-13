'use client'

import { useRouter } from 'next/navigation'
import YellowVerifyIcon from './icons/YellowVerifyIcon'
import NavigationArrowIcon from './icons/NavigationArrowIcon'

const VerifyEmploymentCard = () => {
  const linkedinClientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const linkedinClientSecret = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
  // we can change this as needed ofc, something like this: const redirect_UI = process.env.NODE_ENV !== "production" ?  'http://localhost:3000/linkedin' : "https://app.makefwb.com/linkedin", im just leaving it to localhost for debugging
  const redirect_UI =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/linkedin'
      : 'https://fwb-git-brandon-linkedin-button-j3cs-projects-612eefdf.vercel.app/linkedin'

  const router = useRouter()

  const handleVerification = async () => {
    console.log({ linkedinClientId, linkedinClientSecret })
    if (!linkedinClientId || !linkedinClientSecret) {
      console.error('ENV VARIABLES MISMATCH')
      return { status: 500 }
    }
    console.log('firing')
    const authCodeParams = new URLSearchParams({
      response_type: 'code',
      client_id: linkedinClientId,
      state: crypto.randomUUID(), // This is used to prevent CSRF, so it being random is important
      scope: 'r_basicprofile', // You normally use a chain of scopes, but for now this seems like all we need
      redirect_uri: redirect_UI,
    })
    // We need to first get an authorization code before we can do anything else.
    const authorizationCode = await fetch(
      `https://www.linkedin.com/oauth/v2/authorization?${authCodeParams}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    // if (!authorizationCode) {
    //   console.log('something broke')
    //   return { error: 'Authorization Code Not found', status: 500 }
    // }
    // const data = await authorizationCode.json()
    // Once we get an auth code, our next step is to exchange our Authorization code for an access token
    if (authorizationCode.ok) {
      console.log({ authorizationCode: await authorizationCode.json() })
    }
    return authorizationCode
  }
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
