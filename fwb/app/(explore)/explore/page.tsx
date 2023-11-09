import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import ProductCard from "@/components/ui/explore/product_card";
import Header from "@/components/ui/explore/header";
export default function ExplorePage() {
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="xl">
        <Header />
      </Container>
    </Box>
  );
}
