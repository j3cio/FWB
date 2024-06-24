'use client'

import React, { Suspense } from 'react'
import { auth } from '@clerk/nextjs'
import { cookies } from 'next/headers'

import { getUser } from '@/app/(auth)/(routes)/profile/page'
import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'

import { UserData, DiscountData } from '@/app/types/types'
import CustomerBenefitList from './CustomerBenefitList'
import AddBenefitCTA from './AddBenefitCTA'

interface BenefitsClientProps {
  filteredDiscountData: DiscountData[]
}

const BenefitsClient = ({ filteredDiscountData }: BenefitsClientProps) => {
  return (
    <>
      <CustomerBenefitList filteredDiscountData={filteredDiscountData} />
    </>
  )
}

export default BenefitsClient
