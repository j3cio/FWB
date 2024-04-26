'use client'

import React, { Dispatch, useEffect, useState } from 'react'

import MobileFilterButton from './MobileFilterButton'

import {
  FilterOptions,
  FilterState,
  filterCategories,
  groupLists,
  sortOptions,
} from './constants'
import MobileCustomModal from '../modals/MobileCustomModal'
import FilterIconWhite from './icons/FilterIconWhite'
import Link from 'next/link'

const MobileProductFilters = ({
  activeOptions,
  setActiveOptions,
}: FilterState) => {
  const [open, setOpen] = useState(false)

  const openFilterModal = () => {
    setOpen(true)
  }

  const activateOption = (
    type: 'sort' | 'privateGroups' | 'categories',
    option: string
  ) => {
    const updatedOptions: FilterOptions = { ...activeOptions }

    if (type === 'sort') {
      if (updatedOptions.sort === option) {
        updatedOptions.sort = ''
      } else {
        updatedOptions.sort = option
      }
    } else {
      const index = updatedOptions[type].indexOf(option)
      if (index !== -1) {
        // Remove the option if it already exists
        updatedOptions[type].splice(index, 1)
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

      <MobileCustomModal
        initial={{ y: '10%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        showModal={open}
        setShowModal={setOpen}
      >
        <article className="w-screen">
          <div className="fixed bottom-0 flex h-[80vh] w-full flex-col justify-between gap-8 rounded-t-[24px] border border-b-0 border-[#8E94E9] bg-[#1A1A23] px-4 text-white">
            <div className="mt-8 flex items-center gap-1 font-semibold">
              <FilterIconWhite />
              Filter
            </div>
            <>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Sort by</p>
                <article className="flex flex-wrap gap-1 pt-3">
                  {sortOptions.map((option) => (
                    <MobileFilterButton
                      text={option}
                      key={crypto.randomUUID()}
                      handleClick={() => activateOption('sort', option)}
                      activeOptions={activeOptions}
                      type="sort"
                    />
                  ))}
                </article>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Category</p>
                <article className="flex flex-wrap gap-1 pt-3">
                  {filterCategories.map((option) => (
                    <MobileFilterButton
                      text={option}
                      key={crypto.randomUUID()}
                      handleClick={() => activateOption('categories', option)}
                      activeOptions={activeOptions}
                      type="categories"
                    />
                  ))}
                </article>
              </div>
              <div className="mb-14 flex flex-col">
                <div className="flex justify-between text-sm font-semibold">
                  <p>Private Group</p>
                  <Link href={'/groups'} className="text-[#F6FF82]">
                    Create Group
                  </Link>
                </div>
                <article className="flex flex-wrap gap-1 pt-3">
                  {groupLists.map((option) => (
                    <MobileFilterButton
                      text={option}
                      key={crypto.randomUUID()}
                      handleClick={() =>
                        activateOption('privateGroups', option)
                      }
                      activeOptions={activeOptions}
                      type="privateGroups"
                    />
                  ))}
                </article>
              </div>
            </>
          </div>
        </article>
      </MobileCustomModal>
    </div>
  )
}

export default MobileProductFilters
