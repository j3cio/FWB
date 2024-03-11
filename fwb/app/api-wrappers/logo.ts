/**
 * This file contains functions that wrap the API calls to the logo endpoint.
 * Written by: Kevin Lai
 *
 * How to get the authentication token useAuth must be called from a React component:
 * const { getToken } = useAuth();
 * const auth_token = getToken({template: 'testing_template'})
 *
 */

/**
 * Fetches the logo for a given domain name using the provided authentication token.
 * @param auth_token The authentication token used for authorization.
 * @param domain_name The domain name for which the logo is being fetched.
 * @returns A Promise that resolves to the fetched logo data.
 */
function fetchLogo(auth_token: string, domain_name: string) {
    var myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${auth_token}`)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect,
    }

    return fetch(
        `http://${window.location.host}/api/images/logos?domain_name=${domain_name}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
}

export { fetchLogo }
