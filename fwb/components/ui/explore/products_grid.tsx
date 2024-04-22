'use client'

import * as React from 'react'

import { useMediaQuery } from 'react-responsive'
import { Box, Paper, Grid, styled, Typography, Button } from '@mui/material'

import ProductCard from './product_card'

import { generateSkeletons } from '../skeletons/generateSkeletons'

interface ProductGridProps {
  items: any[] //TODO: Fix 'any' typing
  isLoading: boolean
}

export default function ProductGrid({ items, isLoading }: ProductGridProps) {
  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  return (
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
        spacing={isDesktop ? 2 : 0}
        rowGap={isDesktop ? 2 : 1}
        sx={{ marginBottom: '60px', justifyContent: 'center' }}
      >
        {isLoading ? (
          <div className="ml-2 flex flex-wrap gap-x-4">
            {generateSkeletons({
              type: 'ProductCard',
              quantity: 20,
            })}
          </div>
        ) : (
          items.map((company: any, index: React.Key) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              key={crypto.randomUUID()}
              // sx={{ width: '282px', height: '322px' }}
            >
              <ProductCard company={company} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}
