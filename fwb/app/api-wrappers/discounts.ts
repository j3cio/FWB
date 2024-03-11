/**
 * This file contains functions that wrap the API calls to the discounts endpoint.
 * Written by: Kevin Lai
 *
 * Creating supabase jwt token from client side is not secure and should only be used during development.
 * This was done to make long-lived tokens work with clerk and supabase for testing purposes.
 *
 * How to get the authentication token and Supabase JWT useAuth must be called from a React component:
 * const { getToken } = useAuth();
 * const auth_token = getToken({template: 'testing_template'})
 * const supabase_jwt = getToken({template: 'supabase'})
 *
 */

import { useAuth } from '@clerk/nextjs'

interface Discount {
    id: string
    company: string
    terms_and_conditions: string
    company_url: string
    discount_amount: string
    public: boolean
    private_groups: string[]
    categories: string[]
}

/**
 * Fetches discounts from the API.
 *
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
    // Set the headers
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${auth_token}`)

    // Set the query parameters
    var queryParams = {
        sort_by: sortBy,
        private_group: privateGroup,
        category: category,
        page: page,
    }

    // Make the request
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect,
    }

    return fetch(
        `http://${window.location.host}/api/discounts?sort_by=${queryParams.sort_by}&private_group=${queryParams.private_group}&category=${queryParams.category}&page=${queryParams.page}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log('error', error))
}

/**
 * Adds a discount to the server.
 *
 * @param auth_token - The authentication token.
 * @param supabase_jwt - The Supabase JWT.
 * @param discount - The discount object to be added.
 * @returns {Promise} A Promise that resolves to the result of the request.
 */
function addDiscount(
    auth_token: string,
    supabase_jwt: string,
    discount: Discount
) {
    // Set the headers
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${auth_token}`)

    // Set the form data
    var formdata = new FormData()
    formdata.append('company', discount.company)
    formdata.append('terms_and_conditions', discount.terms_and_conditions)
    formdata.append('company_url', discount.company_url)
    formdata.append('discount_amount', discount.discount_amount)
    formdata.append('public', discount.public.toString())
    formdata.append('private_groups', discount.private_groups.toString())
    formdata.append('categories', discount.categories.toString())

    // Make the request
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect,
    }

    return fetch(`http://${window.location.host}/api/discounts`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
}

/**
 * Deletes a discount.
 *
 * @param {string} auth_token - The authentication token.
 * @param {string} supabase_jwt - The Supabase JWT.
 * @param {string} discount_id - The ID of the discount to delete.
 * @returns {Promise} A promise that resolves when the discount is deleted successfully.
 */
function deleteDiscount(
    auth_token: string,
    supabase_jwt: string,
    discount_id: string
) {
    // Set the headers
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${auth_token}`)

    // Make the request
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect,
    }

    return fetch(
        `http://${window.location.host}/api/discounts?discount_id=${discount_id}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
}

/**
 * Updates a discount.
 *
 * @param {string} auth_token - The authentication token.
 * @param {string} supabase_jwt - The Supabase JWT.
 * @param {string} discount_id - The ID of the discount to update.
 * @param {Discount} discount - The updated discount object.
 * @returns {Promise} A promise that resolves when the discount is updated successfully.
 */
function updateDiscount(
    auth_token: string,
    supabase_jwt: string,
    discount_id: string,
    discount: Discount
) {
    // Set the headers
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${auth_token}`)

    // Set the form data
    var formdata = new FormData()
    formdata.append('discount_id', discount_id)

    // Add the fields that are not undefined
    if (discount.company) {
        formdata.append('company', discount.company)
    }
    if (discount.terms_and_conditions) {
        formdata.append('terms_and_conditions', discount.terms_and_conditions)
    }
    if (discount.company_url) {
        formdata.append('company_url', discount.company_url)
    }
    if (discount.discount_amount) {
        formdata.append('discount_amount', discount.discount_amount)
    }
    if (discount.public !== undefined) {
        formdata.append('public', discount.public.toString())
    }
    if (discount.private_groups && discount.private_groups.length > 0) {
        formdata.append('private_groups', discount.private_groups.toString())
    }
    if (discount.categories && discount.categories.length > 0) {
        formdata.append('categories', discount.categories.toString())
    }

    // Make the request
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow' as RequestRedirect,
    }

    return fetch(`http://${window.location.host}/api/discounts`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
}

export { fetchDiscounts, addDiscount, deleteDiscount, updateDiscount }
