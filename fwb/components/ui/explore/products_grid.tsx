'use client'

import { Box, Paper, Grid, styled, Typography } from "@mui/material";
import * as React from 'react';
import ProductCard from "./product_card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Array.from(Array(20)).map((_, index) => (
          <Grid item xs={2} sm={3} md={3} key={index}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}