'use client'

import { Box, Paper, Grid, styled, Typography } from "@mui/material";
import * as React from 'react';
import ProductCard from "./product_card";

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "5vh" }}>
      <Grid container spacing={2} rowGap={2} >
        {Array.from(Array(20)).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ width: '282px', height: '322px' }} >
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}