import { auth } from '@clerk/nextjs'
import DetailPage from './detail'
import { redirect } from 'next/navigation'
import {
  DetailData,
  CompanyAndDiscounts,
  DiscountDataDetail,
} from '@/app/types/types'

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
      const company: CompanyAndDiscounts = await response.json()

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
  searchParams: { [key: string]: string | undefined }
}) => {

  if (searchParams.name) {
    const data: CompanyAndDiscounts | undefined = await handleSearch(searchParams.name)

    return (
      <div>{data ? <DetailPage company={data} /> : <div>Loading...</div>}</div>
    )
  } else {
    redirect('/explore')
  }
}

export default page
