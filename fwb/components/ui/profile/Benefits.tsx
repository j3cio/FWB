'use client'

import { TestDiscountData } from '@/app/types/types'
import React, { use } from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import ShareDiscountButton from './ShareDiscountButton'

interface BenefitsProps {
  discountData: TestDiscountData[]
}
const Benefits = ({ discountData }: BenefitsProps) => {
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
            <ShareDiscountButton />
          </div>
        </>
      )}
    </div>
  )
}

export default Benefits
