'use client'

import React, { useState } from 'react'

import MobileFilterButton from './MobileFilterButton'

import { FilterOptions, sortOptions } from './constants'

const MobileProductFilters = () => {
  const [open, setOpen] = useState(false)
  const [activeOptions, setActiveOptions] = useState<FilterOptions>({
    sort: '',
    privateGroups: [''],
    categories: [''],
  })

  const openFilterModal = () => {
    setOpen(true)
  }

  const activateOption = (
    type: 'sort' | 'privateGroups' | 'categories',
    option: string
  ) => {
    const updatedOptions: FilterOptions = { ...activeOptions }

    if (type !== 'sort' && activeOptions[type].includes(option)) {
      return
    }

    if (type === 'sort') {
      updatedOptions.sort = option
    } else {
      if (updatedOptions[type].includes(option)) {
        // Remove the option if it already exists
        updatedOptions[type] = updatedOptions[type].filter(
          (item) => item !== option
        )
      } else {
        // Add the option if it doesn't exist
        updatedOptions[type] = [...updatedOptions[type], option]
      }
    }
    setActiveOptions(updatedOptions)
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
          handleClick={() => activateOption('sort', option)}
          activeOptions={activeOptions}
          type="sort"
        />
      ))}
    </div>
  )
}

export default MobileProductFilters
