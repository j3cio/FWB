import { NextResponse } from 'next/server'

export async function GET() {
  const linkedinClientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const linkedinClientSecret = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET // change this from being NEXT_PUBLIC when using actual client config
  const redirect_uri =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000/linkedin'
      : 'https://fwb-git-brandon-linkedin-button-j3cs-projects-612eefdf.vercel.app/linkedin'

  try {
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

    // STEP 1
    // We need to first get an authorization code before we can do anything else.
    const authorizationCodeResponse = await fetch(
      `https://www.linkedin.com/oauth/v2/authorization?${authCodeParams}`
    )
    if (!authorizationCodeResponse.ok) {
      throw new Error('Authorization Code not found.')
    }

    // const authorizationCode = await authorizationCodeResponse.json()
    console.log({
      authorizationCodeResponse: await authorizationCodeResponse.json(),
    })
    return NextResponse.json({ authorizationCodeResponse }, { status: 200 }) // test return for each stage

    // STEP 2
    // Once we get an auth code, our next step is to exchange our Authorization code for an access token. This is what we actually use for our calls.
    // const accessTokenResponse = await fetch(
    //   'https://www.linkedin.com/oauth/v2/accessToken',
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: new URLSearchParams({
    //       grant_type: 'authorization_code',
    //       code: authorizationCode,
    //       client_id: linkedinClientId,
    //       client_secret: linkedinClientSecret,
    //       redirect_uri,
    //     }),
    //   }
    // )

    // const data = await accessTokenResponse.json()
    // const accessToken = data.access_token

    // return NextResponse.json({ data }, { status: 200 }) // test return for each stage
    // if (!accessTokenResponse.ok) {
    //   throw new Error('Access Token not generated.')
    // }

    // // STEP 3
    // // Now we take our access token and use that in our actual API calls.
    // const response = await fetch('https://api.linkedin.com/v2/me', {
    //   headers: {
    //     Authorization: 'Bearer ' + accessToken,
    //   },
    // })

    // const userData = await response.json()

    // return NextResponse.json({ userData }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
