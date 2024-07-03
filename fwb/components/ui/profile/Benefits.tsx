import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { auth } from '@clerk/nextjs'

import { getUser } from '@/app/(auth)/(routes)/profile/page'
import { DiscountData, UserData, UserToDiscounts } from '@/app/types/types'
import React from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import ShareDiscountButton from './ShareDiscountButton'

async function getUserDiscountTable(
  bearer_token: string,
  supabase_jwt: string
) {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userToDiscount`,
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

async function getDiscountIdsArray(userToDiscountsTable: UserToDiscounts[]) {
  var discountIds: any = []
  userToDiscountsTable.map((item) => discountIds.push(item.discount_id))
  return discountIds
}

const Benefits = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  // While this seems like we're making excessive calls to getUser(), Next's caching should use the data in the cache instead since this route handler isn't a POST request, so this is safe and performant.
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data
  // https://nextjs.org/docs/app/building-your-application/caching#data-cache

  const userData: UserData =
    bearer_token && supabase_jwt
      ? await getUser(bearer_token, supabase_jwt)
      : undefined
  const userToDiscountsTable: UserToDiscounts[] =
    bearer_token && supabase_jwt
      ? await getUserDiscountTable(bearer_token, supabase_jwt)
      : undefined
  const discountIds = await getDiscountIdsArray(userToDiscountsTable)
  const discountData: DiscountData[] =
    userData && bearer_token && supabase_jwt
      ? await getAllDiscountsData(discountIds, bearer_token, supabase_jwt)
      : []

  return (
    <div>
      {discountData.length > 0 ? (
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap justify-start gap-4 pl-2">
            {discountData.map((company: any, index: React.Key) => (
              <DiscountCard company={company} key={company.id} />
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
