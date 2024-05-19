import { DiscountData } from '@/app/types/types'
import Productfilters from '@/components/ui/explore/productfilters'
import { Box, Grid } from '@mui/material'
import DiscountCard from './DiscountCard'
import MobileDiscountFilters from './MobileDiscountFilters'
import SearchBar from './SearchBar'
import { useState } from 'react'
import { FilterOptions } from '../../explore/constants'

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
    <div className="bg-[#1a1a23] xs-max:flex xs-max:flex-col xs-max:items-center xxs-max:flex xxs-max:flex-col xxs-max:items-center">
      <div className="w-11/12 xs-max:w-full xxs-max:w-full">
        <Productfilters activeOptions={activeOptions}
              setActiveOptions={setActiveOptions}/>
      </div>
      <div className='xs-max:w-full xxs-max:w-full xs-max:flex xxs-max:flex xs-max:flex-col xxs-max:flex-col xs-max:gap-[1.5rem] xxs-max:gap-[1.5rem]'>
        <SearchBar />
        <MobileDiscountFilters activeOptions={activeOptions}
              setActiveOptions={setActiveOptions}/>
      </div>
      <div className=" ml-24 flex justify-center xs-max:ml-0 xxs-max:ml-0">
        <Box
          sx={{
            flexGrow: 1,
            paddingBottom: '20px',
            justifyContent: 'center',
            minHeight: '100%',
          }}
        >
          <Grid container spacing={14} rowGap={2} sx={{ marginBottom: '60px' }} className='xs-max:m-0 xxs-max:m-0 xs-max:w-[90vw] xxs-max:w-[90vw]'>
            {discountData.map((company: any, index: React.Key) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                key={index}
                sx={{ width: '282px', height: '322px' }}
                className='xs-max:p-0 xxs-max:p-0 xs-max:h-[55vw] xxs-max:h-[55vw]'
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
