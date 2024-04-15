// This is a fairly involves layout since /groups uses RSCs, so we can't rely on using an isLoading state, but Tabs is also fairly abstracted (with some prop drilling) so I can't just drop <ProductCardSkeleton /> components in a suspense boundary. Therefore we'll mock up the Tabs component itself, but replace any data calls with placeholders.

import { Box, Grid, Typography } from '@mui/material'
import ProductFiltersSkeleton from './ProductFiltersSkeleton'
import { generateSkeletons } from '../generateSkeletons'

const GroupTabsSkeleton = () => {
  return (
    <div
      className="w-full bg-[#1a1a23]"
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="my-10 flex flex-row items-center justify-evenly">
        <div
          className={`} w-1/2 border-b-2 border-white text-3xl font-bold  text-white hover:border-b-2 hover:border-white
            hover:text-white`}
        >
          <Box textAlign="center">
            <Typography className=" items-center font-urbanist text-3xl font-bold">
              Discounts Offers
            </Typography>
          </Box>
        </div>
        <div
          className={`} w-1/2 text-3xl font-bold text-gray-600 hover:border-b-2 hover:border-white
            hover:text-white`}
        >
          <Box textAlign="center">
            <Typography className=" items-center font-urbanist text-3xl font-bold">
              Members
            </Typography>
          </Box>
        </div>
      </div>
      <div className=""></div>
      <div className="w-full">
        <div className="bg-[#1a1a23]">
          <div className="w-11/12 bg-white">
            <ProductFiltersSkeleton />
          </div>
          <div className="flex justify-center">
            <Box
              sx={{
                flexGrow: 1,
                paddingBottom: '20px',
                justifyContent: 'center',
                minHeight: '1706px',
              }}
            >
              <Grid
                container
                spacing={2}
                rowGap={2}
                sx={{ marginBottom: '60px' }}
              >
                <div className="ml-2 flex flex-wrap gap-x-4">
                  {generateSkeletons({
                    type: 'ProductCard',
                    quantity: 20,
                  })}
                </div>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupTabsSkeleton
