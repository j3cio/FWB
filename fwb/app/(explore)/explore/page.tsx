"use client";
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDiscounts } from "@/backend/supabaseRequests";
import { useContext } from "react";
import { SupabaseContext } from "@/backend/supabaseContext";
export default function ExplorePage() {
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const supabase = useContext(SupabaseContext);
  
  useEffect(() => {
    const fetchDiscounts = async () => {
      if (supabase) {
        let fetchedDiscounts = await getAllDiscounts(supabase);
        console.log(fetchedDiscounts);
        fetchedDiscounts = fetchedDiscounts ? fetchedDiscounts : [];
        setDiscounts(fetchedDiscounts);
      }
    };
    fetchDiscounts();
  }, [supabase]);

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
