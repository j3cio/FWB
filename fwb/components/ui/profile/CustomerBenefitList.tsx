import React from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import { DiscountData } from '@/app/types/types'

interface CustomerBenefitListProps {
  filteredDiscountData: DiscountData[]
}

const CustomerBenefitList = ({
  filteredDiscountData,
}: CustomerBenefitListProps) => {
  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="flex flex-wrap justify-start gap-4 pl-2">
          {filteredDiscountData.map((company: any, index: React.Key) => (
            <DiscountCard company={company} key={crypto.randomUUID()} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerBenefitList
