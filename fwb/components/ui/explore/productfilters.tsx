'use client'

import React, { SetStateAction, useContext, useState, Dispatch } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import arrowIcon from '@/components/ui/explore/icons/expand_more_24px.svg'
import Image from 'next/image'
import { FilterContext } from './filter_context'
import {
  FilterOptions,
  FilterState,
  filterCategories,
  groupLists,
  sortOptions,
} from './constants'

interface BasicSelectProps {
  name: string
  options: string[]
  defaultValue: string
  activeOptions: FilterOptions
  setActiveOptions: Dispatch<SetStateAction<FilterOptions>>
}

function BasicSelect({
  name,
  options,
  defaultValue,
  activeOptions,
  setActiveOptions,
}: BasicSelectProps) {
  const [option, setOption] = useState(defaultValue)
  const [flip, setFlip] = useState(false)

  const arrowStyle = {
    color: 'white',
    width: '28.8px',
    height: '28.8px',
    transform: flip ? 'rotate(180deg)' : 'rotate(0deg)',
  }

  const activateOption = (
    type: 'sort' | 'privateGroups' | 'categories',
    option: string
  ) => {
    const updatedOptions: FilterOptions = { ...activeOptions }

    if (type === 'sort') {
      updatedOptions.sort = option
    } else {
      updatedOptions[type] = [option]
    }

    setActiveOptions(updatedOptions)
  }

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{ display: 'flex', minWidth: 180, height: '48px' }}
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
              activateOption('sort', event.target.value)
            } else if (name === 'Category') {
              activateOption(
                'categories',
                event.target.value === 'All' ? '' : event.target.value
              )
            } else if (name === 'Private Group') {
              activateOption('privateGroups', event.target.value)
            }
          }}
          onOpen={() => setFlip(true)}
          onClose={() => setFlip(false)}
          IconComponent={() => (
            <Image src={arrowIcon} alt="arrow" style={arrowStyle} /> // setSortBy(event.target.value as string)
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
export default function ProductFilters({
  activeOptions,
  setActiveOptions,
}: FilterState) {
  return (
    <div className="sticky top-0 z-[1] mb-8 hidden h-[85px] justify-end bg-[#1A1A23] pt-3 sm:flex">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '24px',
        }}
      >
        <BasicSelect
          name="Sort by"
          options={sortOptions}
          defaultValue="Most Popular"
          activeOptions={activeOptions}
          setActiveOptions={setActiveOptions}
        />
        {/* <BasicSelect
          name="Private Group"
          options={groupLists}
          defaultValue="All"
          activeOptions={activeOptions}
          setActiveOptions={setActiveOptions}
        /> */}
        <BasicSelect
          name="Category"
          options={filterCategories}
          defaultValue="All"
          activeOptions={activeOptions}
          setActiveOptions={setActiveOptions}
        />
      </Box>
    </div>
  )
}
