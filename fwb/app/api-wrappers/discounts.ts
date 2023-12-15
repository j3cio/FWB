import { useAuth } from "@clerk/nextjs";
/**
 * Fetches discounts from the API.
 * 
 * How to get the authentication token and Supabase JWT:
 * const { getToken } = useAuth();
 * const auth_token = getToken({template: 'testing_template'})
 * const supabase_jwt = getToken({template: 'supabase'})
 * 
 * @param auth_token - The authentication token.
 * @param supabase_jwt - The Supabase JWT.
 * @param sortBy - The sorting criteria for the discounts.
 * @param privateGroup - The private group for the discounts.
 * @param category - The category of the discounts.
 * @param page - The page number for pagination.
 * @returns A Promise that resolves to the fetched discounts.
 */
function fetchDiscounts(
  auth_token: string,
  supabase_jwt: string,
  sortBy: string,
  privateGroup: string,
  category: string,
  page: string
) {

  var myHeaders = new Headers();
  myHeaders.append("supabase_jwt", supabase_jwt);
  myHeaders.append("Authorization", `${auth_token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var queryParams = {
    sort_by: sortBy,
    private_group: privateGroup,
    category: category,
    page: page,
  };

  return fetch(
    `http://localhost:3000/api/discounts?sort_by=${queryParams.sort_by}&private_group=${queryParams.private_group}&category=${queryParams.category}&page=${queryParams.page}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
}
