'use client'

import React, { useEffect, useState } from 'react'
import { DiscountData } from '@/app/types/types'
import AddBenefitCTA from '@/components/ui/profile/AddBenefitCTA'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import { useAuth, useUser } from '@clerk/nextjs'
import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { generateSkeletons } from '../skeletons/generateSkeletons'

const CustomerBenefitList = () => {
  const { isLoaded, userId, getToken } = useAuth()

  const [filteredDiscountData, setFilteredDiscountData] = useState<
    DiscountData[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const supabase_jwt = await getToken({ template: 'supabase' })
    const bearer_token = await getToken({ template: 'testing_template' })

    var myHeaders = new Headers()

    if (supabase_jwt && bearer_token) {
      myHeaders.append('supabase_jwt', supabase_jwt)
      myHeaders.append('Authorization', `Bearer ${bearer_token}`)

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
          requestOptions
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const userData = await response.json()

        const discountIdArray = userData
          ? userData.users[0].user_discounts
          : ['']
        const discountData: DiscountData[] =
          userData && bearer_token && supabase_jwt
            ? await getAllDiscountsData(
                discountIdArray,
                bearer_token,
                supabase_jwt
              )
            : []

        const parseDiscountData = discountData.filter(
          (company) => company !== undefined
        )

        setFilteredDiscountData(parseDiscountData)
        setIsLoading(false)
        return // This returns the result object
      } catch (error) {
        console.error('Error fetching data: ', error)
        throw error // This re-throws the error to be handled by the caller
      }
    }
    // try {
    //   if (isLoaded && typeof window !== 'undefined') {
    //     const supabaseToken = await window.Clerk.session.getToken({
    //       template: 'supabase',
    //     })
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  }

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(true)
      fetchData()
    }
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap justify-start gap-4">
            {generateSkeletons({ type: 'ProductCard', quantity: 8 })}
          </div>
        </div>
      ) : filteredDiscountData.length ? (
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap justify-start gap-4 pl-2">
            {filteredDiscountData.map((company: any, index: React.Key) => (
              <DiscountCard company={company} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <AddBenefitCTA />
      )}
    </div>
  )
}

export default CustomerBenefitList
