import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import ProductCard from "@/components/ui/explore/product_card";
import groupIcon from "@/components/ui/explore/icons/group_24px.svg";
import Image from "next/image";
import Header from "@/components/ui/explore/header";
import Button from "@mui/material/Button";
export default function ExplorePage() {
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="xl">
        <Header />
      </Container>
    </Box>
  );
}
