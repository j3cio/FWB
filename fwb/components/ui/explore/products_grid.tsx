"use client";

import { Box, Paper, Grid, styled, Typography, Button } from "@mui/material";
import * as React from "react";
import ProductCard from "./product_card";

const ProductGrid = React.memo(function ProductGrid({items}: {items: any[]}) {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "20px", justifyContent: "center", minHeight: "1706px" }}>
      <Grid container spacing={2} rowGap={2} sx={{ marginBottom: "60px" }}>
        {items.map((company: any, index: React.Key) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ width: "282px", height: "322px" }}
          >
            <ProductCard company={company} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default ProductGrid;
