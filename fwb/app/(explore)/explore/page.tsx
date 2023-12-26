"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { FilterContext, FilterProvider } from "@/components/ui/explore/filter_context";

/**
 * Renders the ExplorePage component. With the FilterProvider
 * 
 * @returns The rendered ExplorePage component.
 */
export default function ExplorePage() {
  return (
    <FilterProvider>
      <ExplorePageContent />
    </FilterProvider>
  );
}

function ExplorePageContent() {
  const {sortby, category, privateGroup} = useContext(FilterContext);
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);

  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [infinteScroll, setInfinteScroll] = React.useState(false);

  const fetchData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yWEpITkRrNmpLRTZPZTN0T1MxRFFyNjB3cjAiLCJ0eXAiOiJKV1QifQ.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cHM6Ly93d3cubWFrZWZ3Yi5jb20iLCJlbWFpbCI6ImRlcmlja0BqM2MuaW8iLCJleHAiOjIwMTcxNTg0NTcsImlhdCI6MTcwMTc5ODQ1NywiaXNzIjoiaHR0cHM6Ly9tdXNpY2FsLWNvbGxpZS04MC5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI5OTJmMzQ2ZDMyZjRmOGI0Zjk1MiIsIm5iZiI6MTcwMTc5ODQ1Miwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzdWIiOiJ1c2VyXzJaM1FJeXB6Q0R3UG5RQkhUWkFjVExVMGtRUyIsInVzZXJfaWQiOiJ1c2VyXzJaM1FJeXB6Q0R3UG5RQkhUWkFjVExVMGtRUyIsInVzZXJfbWV0YWRhdGEiOnt9fQ.Gdlnv4o4ybef5MRZtNgOyh5T0ESj3rfIkpeRht3dAqE_4KuMApDTEU3lB2SZOZJzbjUT2n554xf18F6e3CPP2yvMRb_GD3qKJG9n7hj4Q9x77nbyAqhLSFffMSRnwq7q7zt99UGn7nRGG0QKkMLmjbOzk3VcP60X3oLnZv817o0uX839-Wz2pqPYXQD34pd5sez-E11GpjcAvnRK6n0EwpHL6XxhAxmi2rNsswXwgo-musyBHzM79LRVBsEOc9QTgRlc6h6nbcJAZI4H0yJOGf4qztANtU_6-fgElNETir9N9vQi1rZ1zvMzuWcztrqazb_rxwpZ5qvqHM7J5vzk-g"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      fetch(
        `http://localhost:3000/api/companies?sort_by=${encodeURIComponent(
          sortby
        )}&category=${encodeURIComponent(
          category
        )}&private_group=${encodeURIComponent(
          privateGroup
        )}&page=${encodeURIComponent(page)}`,
        requestOptions
      )
        .then(async (res) =>
          setCompanies([...companies].concat((await res.json()).result))
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infinteScroll, category, sortby, privateGroup]);

  React.useEffect(() => {
    const checkScroll = () => {
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;
      setIsAtBottom(isAtBottom);

      if (infinteScroll && isAtBottom) {
        // Fetch More Products
        // Add your code here to fetch more products
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [infinteScroll, page]);

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Header />
        <AdSection />
        <MostPopular />
        <Divider color="white" />
        <Productfilters/>
        <ResponsiveGrid items={companies} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setPage(page + 1);
              setInfinteScroll(true);
            }}
            sx={{ color: "white" }}
          >
            Load More...
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
