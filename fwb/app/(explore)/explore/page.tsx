"use client"
import React, { useEffect, useState } from "react";
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import { Divider } from "@mui/material";

export default function ExplorePage() {
  const [sortby, setSortBy] = useState("Most Popular");
  const [category, setCategory] = useState("electronic");
  const [privateGroup, setPrivateGroup] = useState("");
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
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
          .then(async (res) => setCompanies((await res.json()).result))
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Header />
        <AdSection />
        <MostPopular />
        <Divider color="white" />
        <Productfilters />
        <ResponsiveGrid items={companies}/>
      </Container>
    </Box>
  );
}
