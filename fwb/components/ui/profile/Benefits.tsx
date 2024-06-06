import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { auth } from '@clerk/nextjs'

import { UserData, DiscountData } from '@/app/types/types'
import React from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import ShareDiscountButton from './ShareDiscountButton'
import { getUser } from '@/app/(auth)/(routes)/profile/page'

const Benefits = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  // While this seems like we're making multiple calls, Next's caching should use the data in the cache instead of actually making this API call.
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
    <div>
      {filteredDiscountData && filteredDiscountData.length > 0 ? (
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap justify-start gap-4 pl-2">
            {filteredDiscountData.map((company: any, index: React.Key) => (
              <DiscountCard company={company} key={crypto.randomUUID()} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[120px] flex h-1/4 items-center justify-center text-3xl text-yellow-200 sm-max:mt-10 sm-max:text-xl xs-max:mt-10 xs-max:text-xl xxs-max:mt-10 xxs-max:text-xl">
            Be the wingman to a friend&apos;s wallet now!
          </div>
          <div className="mt-[24px] flex grow items-center justify-center">
            <a href="/addbenefit">
              <ShareDiscountButton />
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default Benefits
