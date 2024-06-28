'use client'

import { DiscountData } from '@/app/types/types'
import React, { use } from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import ShareDiscountButton from './ShareDiscountButton'

interface BenefitsProps {
  discountData: Promise<any[]>
}
const Benefits = ({ discountData }: BenefitsProps) => {
  const discounts = use(discountData)

  return (
    <div>
      {discounts.length > 0 ? (
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap justify-start gap-4 pl-2">
            {discounts.map((company: any, index: React.Key) => (
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
