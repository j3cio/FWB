"use client";
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";

// Supabase + Clerk imports for accessing backend
import { useAuth } from "@clerk/nextjs";
import { getAllDiscounts } from "@/backend/supabaseRequests";
export default function ExplorePage() {
    // Example of using accessing backend with supabase client
  const { userId, getToken } = useAuth();
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [discounts, setDiscounts] = useState<any[]>([]);
  useEffect(() => {
    const loadDiscounts = async () => {
      let token = await getToken({ template: "supabase" });
      token = token ? token : "";
      let discounts = await getAllDiscounts( { userId, token});
      discounts = discounts ? discounts : [];
      setDiscounts(discounts);

      console.log(discounts);
    };
    loadDiscounts();
  }, [getToken, userId]);

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
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
