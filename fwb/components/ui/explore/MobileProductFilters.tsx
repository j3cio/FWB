'use client'

import React, { useState } from 'react'

import MobileFilterButton from './MobileFilterButton'

import { sortOptions } from './constants'

const MobileProductFilters = () => {
  const [open, setOpen] = useState(false)
  const [activeSort, setActiveSort] = useState<string>()

  const openFilterModal = () => {
    setOpen(true)
  }

  return (
    <div
      className="max-w-screen flex gap-1 overflow-x-auto 
    overflow-y-hidden  
    px-4 pb-6 text-white sm:hidden"
    >
      <MobileFilterButton text="filter" icon handleClick={openFilterModal} />
      {sortOptions.map((option) => (
        <MobileFilterButton
          text={option}
          key={crypto.randomUUID()}
          handleClick={() => setActiveSort(option)}
          activeSort={activeSort}
        />
      ))}
    </div>
  )
}

export default MobileProductFilters
