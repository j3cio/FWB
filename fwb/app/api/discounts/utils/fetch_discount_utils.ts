async function getDiscount(
  discount_id: string,
  bearer_token: string,
  supabase_jwt: string
) {
  if (!supabase_jwt) {
    console.warn('Not signed in')
    return
  }

  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabase_jwt)
  myHeaders.append('Authorization', `Bearer ${bearer_token}`)
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    if (discount_id !== '') {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tempdiscounts?discount_id=${discount_id}`,
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      return result.data[0] // This returns the result object
    }
    return null // Explicitly added null instead of undefined or empty object to show that this is intended. API fix should be considered however, discount_id should never be ''.
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

export async function getAllDiscountsData(
  discount_ids: string[],
  bearer_token: string,
  supabase_jwt: string
) {
  const discountPromises = discount_ids.map(
    (discount_id: string, key: number) =>
      getDiscount(discount_id, bearer_token, supabase_jwt)
  )
  const discounts = await Promise.all(discountPromises)
  const filteredResults = discounts.filter((discount) => discount !== null)

  return filteredResults
}
