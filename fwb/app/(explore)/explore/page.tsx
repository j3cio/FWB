'use client'
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Box, Typography } from "@mui/material";
import ProductCard from "@/components/ui/explore/product_card";
export default function ExplorePage() {
  return (
    <Box>
      <Typography variant="h1" textAlign={"center"}>Explore Page</Typography>
      
      <ProductCard />
    </Box>
  );
}