import React, { Suspense } from 'react'
import { auth } from '@clerk/nextjs'
import { cookies } from 'next/headers'

import { getUser } from '@/app/(auth)/(routes)/profile/page'
import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'

import { UserData, DiscountData } from '@/app/types/types'
import BenefitsClient from './BenefitsClient'
import CustomerBenefitList from './CustomerBenefitList'
import AddBenefitCTA from './AddBenefitCTA'

const Benefits = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const cookieStore = cookies() // while unused in our actual rendering, this causes our component to use Dynamic rendering while still being a server component.
  const storedCookies = cookieStore.getAll()

  // console.log({ storedCookies })
  // While this seems like we're making excessive calls to getUser(), Next's caching should use the data in the cache instead since this route handler isn't a POST request, so this is safe and performant.
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data
  // https://nextjs.org/docs/app/building-your-application/caching#data-cache
  const userData: UserData =
    bearer_token && supabase_jwt
      ? await getUser(bearer_token, supabase_jwt)
      : undefined
  const discountIdArray = userData ? userData.users[0].user_discounts : ['']
  const discountData: DiscountData[] =
    userData && bearer_token && supabase_jwt
      ? await getAllDiscountsData(discountIdArray, bearer_token, supabase_jwt)
      : []

  const filteredDiscountData = discountData.filter(
    (company) => company !== undefined
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {filteredDiscountData && filteredDiscountData.length > 0 ? (
        <CustomerBenefitList filteredDiscountData={filteredDiscountData} />
      ) : (
        <AddBenefitCTA />
      )}
    </Suspense>
  )
}

export default Benefits
