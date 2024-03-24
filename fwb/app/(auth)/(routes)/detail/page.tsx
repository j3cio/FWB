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

      // // Use the data from the first response in the second request
      const responseDetail = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tempdiscounts/detail?discount_ids=${company.discounts}`,
        requestOptions
      )

      // Check if the second request is successful
      if (!responseDetail.ok) {
        throw new Error(`HTTP error! status: ${responseDetail.status}`)
      }

      // // Parse the JSON data from the second response
      const discounts: DiscountDataDetail[] = await responseDetail.json()

      const combinedData = { company, discounts }

      return combinedData // This returns the result object
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
  console.log({ searchParams })

  if (searchParams.name) {
    const data: DetailData | undefined = await handleSearch(searchParams.name)

    return (
      <div>{data ? <DetailPage data={data} /> : <div>Loading...</div>}</div>
    )
  } else {
    redirect('/explore')
  }
}

export default page
