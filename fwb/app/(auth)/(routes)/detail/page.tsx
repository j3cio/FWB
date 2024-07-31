import { FilterProvider } from '@/components/ui/explore/filter_context'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import DetailPage from './detail'

export async function getCompanyId(companyName: string) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const userId = await auth().userId
  if (!supabase_jwt) {
    console.log('Not signed in')
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test_companies/${companyName}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.company[0].id // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

export async function getCompanyDiscountsTable(company_id: string) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const userId = await auth().userId
  if (!supabase_jwt) {
    console.log('Not signed in')
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/companyToDiscount?company_id=${company_id}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.discounts // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

const handleSearch = async (companyName: string) => {
  try {
    const bearer_token = await auth().getToken({ template: 'testing_template' })
    const supabase_jwt = await auth().getToken({ template: 'supabase' })

    if (!supabase_jwt) {
      console.log('Not signed in')
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/search?companyQuery=${companyName}`,
        requestOptions
      )

      // Check if the first request is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Parse the JSON data from the first response
      const company = await response.json()
      return company // This returns the result object
    } catch (error) {
      console.error('Error fetching data: ', error)
      throw error // This re-throws the error to be handled by the caller
    }
  } catch (error) {
    console.error('GET Company Discount API Failed', error)
  }
}

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: any | undefined }
}) => {
  if (searchParams.name) {
    const data: any | undefined = await handleSearch(searchParams.name)
    const companyId: any = await getCompanyId(searchParams.name)
    const discountIdArray: any = await getCompanyDiscountsTable(companyId)

    return (
      <div>
        {data ? (
          <FilterProvider>
            <DetailPage company={data} discountIds={discountIdArray} />
            <div> 123 </div>
          </FilterProvider>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  } else {
    redirect('/explore')
  }
}

export default page
