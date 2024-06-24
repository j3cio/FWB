'use client'

import React, { useEffect, useState } from 'react'
import DiscountCard from '../privategroups/groupdetailspage/DiscountCard'
import { DiscountData } from '@/app/types/types'
import AddBenefitCTA from './AddBenefitCTA'

interface CustomerBenefitListProps {
  discountData: DiscountData[]
}

const CustomerBenefitList = ({ discountData }: CustomerBenefitListProps) => {
  const [filteredDiscountData, setFilteredDiscountData] = useState<
    DiscountData[]
  >([])

  useEffect(() => {
    const parseDiscountData = discountData.filter(
      (company) => company !== undefined
    )

    setFilteredDiscountData(parseDiscountData)
  }, [])

  return (
    <div>
      {filteredDiscountData.length ? (
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
