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
import { useContext } from 'react'
import { DetailContext } from './filter_context'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import arrowIcon from '@/components/ui/explore/icons/expand_more_24px.svg'

function BasicSelect({
    name,
    options,
    defaultValue,
  }: {
    name: string
    options: string[]
    defaultValue: string
  }) {
    const [option, setOption] = useState(defaultValue)
    const [flip, setFlip] = useState(false)
    const { setSortBy, setPrivateGroup } = useContext(DetailContext)
  
    const arrowStyle = {
      color: 'white',
      width: '28.8px',
      height: '28.8px',
      transform: flip ? 'rotate(180deg)' : 'rotate(0deg)',
    }
  
    return (
      <Box>
        <FormControl
          fullWidth
          sx={{ display: 'flex', minWidth: 246, height: '48px' }}
        >
          <InputLabel
            id="simple-select-label"
            sx={{
              color: 'white',
              borderColor: 'white',
              fontWeight: '700',
              letterSpacing: '0.32px',
              fontFamily: 'inherit',
            }}
          >
            {name}
          </InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={option}
            label={`${name}`}
            onChange={(event: SelectChangeEvent) => {
              setOption(event.target.value as string)
              if (name === 'Sort by') {
                setSortBy(event.target.value as string)
              } else if (name === 'Private Group') {
                setPrivateGroup(event.target.value as string)
              }
            }}
            onOpen={() => setFlip(true)}
            onClose={() => setFlip(false)}
            IconComponent={() => (
              <Image src={arrowIcon} alt="arrow" style={arrowStyle} />
            )}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: '#1A1A23',
                  },
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#8E94E9',
                borderWidth: '2px',
                borderRadius: '10px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              color: 'white',
              fontFamily: 'inherit',
            }}
          >
            {options.map((option: string) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  backgroundColor: '#1A1A23',
                  color: 'white',
                  fontFamily: 'inherit',
                  borderRadius: '10px',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    )
  }

/*export default function MobileDetailFilters() {
    return (
      <Box
        sx={{
          backgroundColor: '#1A1A23',
          position: 'relative',
          height: '76px',
          zIndex: 1,
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '24px',
          }}
        >
          <BasicSelect
            name="Sort by"
            options={[
              'Most Popular',
              'Most Recent',
              'Highest to Lowest Discounts',
              'Lowest to Highest Discounts',
            ]}
            defaultValue="Most Popular"
          />
          <BasicSelect
            name="Private Group"
            options={['All', 'Group 1', 'Group 2']}
            defaultValue="All"
          />
        </Box>
      </Box>
    )
  }*/

export default function MobileDetailFilters({
    activeOptions,
    setActiveOptions,
  }: FilterState) {
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
      px-4 pb-6 text-white sm:hidden xs-max:pl-0 xxs-max:pl-0"
      >
        <MobileFilterButton text="Filter" icon handleClick={openFilterModal} />
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
                {/* change back to mb-14 when uncommenting  */}
                <div className="mb-10 flex flex-col">
                  <div className="flex justify-between text-sm font-semibold">
                    <p>Private Group</p>
                    <Link href={'/groups'} className="text-[#F6FF82]">
                      Create Group
                    </Link>
                  </div>
                  {/* <article className="flex flex-wrap gap-1 pt-3">
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
                  </article> */}
                </div>
              </>
            </div>
          </article>
        </MobileCustomModal>
      </div>
    )
  }
  
  