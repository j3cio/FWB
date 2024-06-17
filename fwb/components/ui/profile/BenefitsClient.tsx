'use client'

import { DiscountData } from '@/app/types/types'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import ShareDiscountButton from './ShareDiscountButton'

interface BenefitsClientData {
  filteredDiscountData?: DiscountData[]
}

const BenefitsClient = ({ filteredDiscountData }: BenefitsClientData) => {
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

export default BenefitsClient
