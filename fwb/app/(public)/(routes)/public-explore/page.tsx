'use client'

import React from 'react'

import { FilterProvider } from '@/components/ui/explore/filter_context'

import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'

const Page = () => {
  return (
    <FilterProvider>
      <ExplorePageContent />
    </FilterProvider>
  )
}

export default Page
