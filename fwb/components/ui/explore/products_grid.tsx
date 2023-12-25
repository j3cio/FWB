"use client";

import { Box, Paper, Grid, styled, Typography, Button } from "@mui/material";
import * as React from "react";
import ProductCard from "./product_card";

export default function ProductGrid({items}) {
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [infinteScroll, setInfinteScroll] = React.useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;
      setIsAtBottom(isAtBottom);
      if (infinteScroll) {
        // Fetch More Products
        // Add your code here to fetch more products
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [infinteScroll]);

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "20px", justifyContent: "center" }}>
      <Grid container spacing={2} rowGap={2} sx={{ marginBottom: "60px" }}>
        {items.map((company, index) => (
          console.log(company.logo),
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setInfinteScroll(true)} sx={{ color: "white" }}>
          Load More...
        </Button>
      </Box>
    </Box>
  );
}
