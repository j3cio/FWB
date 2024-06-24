export const fetchData = async (companyRedirect: string) => {
  try {
    const bearerToken = await window.Clerk.session.getToken({
      template: 'testing_template',
    })
    const supabaseToken = await window.Clerk.session.getToken({
      template: 'supabase',
    })

    const response = await fetch(
      `api/companies/search?companyQuery=${companyRedirect}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log('Searching for Discount was Successful', data)
      return data
    } else {
      const errorData = await response.json()
      console.error('Error Finding a Discount', errorData)
      alert('There are no discounts for that company!')
    }
  } catch (error) {
    console.error('GET Company Discount API Failed', error)
  }
}
