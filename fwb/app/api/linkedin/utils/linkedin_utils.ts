interface getLinkedinAccessTokenParams {
  authorizationCode: string
  linkedinClientId: string
  linkedinClientSecret: string
  redirect_uri: string
}

export const getLinkedinAccessToken = async ({
  authorizationCode,
  linkedinClientId,
  linkedinClientSecret,
  redirect_uri,
}: getLinkedinAccessTokenParams) => {
  console.log({
    authorizationCode,
    linkedinClientId,
    linkedinClientSecret,
    redirect_uri,
  })
  //   const accessTokenResponse = await fetch(
  //     'https://www.linkedin.com/oauth/v2/accessToken',
  //     {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //       body: new URLSearchParams({
  //         grant_type: 'authorization_code',
  //         code: authorizationCode,
  //         client_id: linkedinClientId,
  //         client_secret: linkedinClientSecret,
  //         redirect_uri,
  //       }),
  //     }
  //   )

  //   const data = await accessTokenResponse.json()

  //   return data
}
