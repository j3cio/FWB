import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('accessToken')

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

    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`)
    }

    const userData = await response.json()

    // Now we can use the userData object containing the user information
    return NextResponse.json({ userData }, { status: 200 })

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

    // // STEP 2
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

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorizationCode = searchParams.get('authorizationCode')

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

    if (!authorizationCode) {
      console.error('AUTH CODE MISSING')
      throw new Error('Missing LinkedIn Authorization code')
    }

    // console.log({ authorizationCode })

    // const response = await getLinkedinAccessToken({
    //   authorizationCode,
    //   linkedinClientId,
    //   linkedinClientSecret,
    //   redirect_uri,
    // })

    // console.log({ response })

    const accessTokenResponse = await fetch(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: authorizationCode,
          client_id: linkedinClientId,
          client_secret: linkedinClientSecret,
          redirect_uri,
        }),
      }
    )

    const data = await accessTokenResponse.json()

    if (!accessTokenResponse.ok) {
      throw new Error(`Failed to fetch access token: ${data.error_description}`)
    }

    const accessToken = data.access_token

    return NextResponse.json({ accessToken }, { status: 200 })

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

    // // STEP 2
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
