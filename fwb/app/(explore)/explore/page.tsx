import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import ProductCard from "@/components/ui/explore/product_card";
import groupIcon from "@/components/ui/explore/icons/group_24px.svg";
import Image from "next/image";
import Header from "@/components/ui/explore/header";
import Button from "@mui/material/Button";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import {Divider} from "@mui/material";
export default function ExplorePage() {
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container>
        <Header />
        <AdSection />
        <MostPopular />
        <Divider color="white" />
        <Productfilters />
        <ResponsiveGrid />
      </Container>
    </Box>
  );
}
