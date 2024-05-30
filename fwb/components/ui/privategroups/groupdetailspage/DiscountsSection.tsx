'use client'

import { useState } from 'react'

import { Box, Grid } from '@mui/material'

import DiscountCard from './DiscountCard'
import Productfilters from '@/components/ui/explore/productfilters'

import { FilterOptions } from '../../explore/constants'
import { DiscountData } from '@/app/types/types'

const DiscountsSection = ({
  discountData,
}: {
  discountData: DiscountData[]
}) => {
  const [activeOptions, setActiveOptions] = useState<FilterOptions>({
    sort: '',
    privateGroups: [],
    categories: [],
  })
  return (
    <div className="bg-[#1a1a23]">
      <div className="w-11/12">
        <Productfilters
          activeOptions={activeOptions}
          setActiveOptions={setActiveOptions}
        />
      </div>
      <div className=" ml-24 flex justify-center">
        <Box
          sx={{
            flexGrow: 1,
            paddingBottom: '20px',
            justifyContent: 'center',
            minHeight: '100%',
          }}
        >
          <Grid container spacing={14} rowGap={2} sx={{ marginBottom: '60px' }}>
            {discountData.map((company: any, index: React.Key) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ width: '282px', height: '322px' }}
              >
                <DiscountCard company={company} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  )
}

export default DiscountsSection
