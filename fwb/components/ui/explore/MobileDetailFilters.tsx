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

export default function MobileDetailFilters() {
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
  }

