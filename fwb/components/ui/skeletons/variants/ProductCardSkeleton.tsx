'use client'

import { Skeleton } from '@mui/material'
import { useMediaQuery } from 'react-responsive'

const ProductCardSkeleton = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  return (
    <div
      style={{
        width: '48vw',
        height: 'calc(48vw + (48vw * 0.142))', //maintaining our card's aspect ratio in mobile
        maxWidth: '282px',
        maxHeight: '322px',
        minHeight: '168px',
        minWidth: '140px',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 2,
      }}
    >
      {/* the default variant is text, but that leads to some weird scaling, shifting to rectangular gives more direct styling control */}
      <Skeleton
        sx={{
          bgcolor: '#CED2E4',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        variant="rectangular"
        height={'72%'}
      />
      <div className="mt-2 flex flex-col items-start pl-4 sm:items-center sm:pl-0">
        <Skeleton
          variant="rectangular"
          width={isDesktop ? '83%' : '60%'}
          height={isDesktop ? 26 : 20}
          sx={{
            bgcolor: '#CED2E4',
            borderRadius: '5px',
          }}
        />
        <div
          className="mt-1 flex items-center justify-between"
          style={{ width: '83%' }}
        >
          <div className="hidden sm:flex">
            <Skeleton
              sx={{
                bgcolor: '#CED2E4',
              }}
              variant="circular"
              width={24}
              height={24}
            />
            <Skeleton
              variant="circular"
              sx={{ bgcolor: '#CED2E4', marginLeft: -0.6 }}
              width={24}
              height={24}
            />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              sx={{ bgcolor: '#CED2E4', marginLeft: -0.6 }}
            />
          </div>

          <Skeleton
            variant="rectangular"
            width={isDesktop ? 160 : 140}
            height={isDesktop ? 18 : 16}
            sx={{
              bgcolor: '#CED2E4',
              borderRadius: '5px',
              marginBottom: isDesktop ? 0 : 10,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
