"use client";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  use,
} from "react";
import ResponsiveGrid from "@/components/ui/explore/products_grid";
import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";
import AdSection from "@/components/ui/explore/ads_section";
import MostPopular from "@/components/ui/explore/most_popular";
import Productfilters from "@/components/ui/explore/productfilters";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import {
  FilterContext,
  FilterProvider,
} from "@/components/ui/explore/filter_context";
import { useAuth } from "@clerk/nextjs";

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
  const { getToken } = useAuth();

  const { sortby, category, privateGroup } = useContext(FilterContext);
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [infinteScroll, setInfinteScroll] = React.useState(false);

  const fetchUserProfiles = async () => {
    const protocal = window.location.protocol === "https:" ? "https:" : "http:";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getToken()}`);
    myHeaders.append("supabase_jwt", `${await getToken({ template: "supabase" })}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    fetch(`${protocal}//${window.location.host}/api/users`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setUserProfiles(res.users)
      })
      .catch((error) => console.log("error", error));
  };

  const fetchData = async (concat: boolean) => {
    fetchUserProfiles();
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${await getToken()}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      const protocal = window.location.protocol;
      fetch(
        `${protocal}//${
          window.location.host
        }/api/companies?sort_by=${encodeURIComponent(
          sortby
        )}&category=${encodeURIComponent(
          category.toLowerCase()
        )}&private_group=${encodeURIComponent(
          privateGroup.toLowerCase()
        )}&page=${encodeURIComponent(page)}`,
        requestOptions
      )
        .then(async (res) => {
          if (concat) {
            setCompanies([...companies].concat((await res.json()).result));
          } else {
            setCompanies((await res.json()).result);
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch Data and concatinate when page is changed or infinite scroll is enabled
  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infinteScroll]);

  // Fetch Data on Filter Change
  useEffect(() => {
    setPage(0);
    fetchData(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortby, category, privateGroup]);

  React.useEffect(() => {
    const checkScroll = () => {
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;
      setIsAtBottom(isAtBottom);

      if (infinteScroll && isAtBottom) {
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
        <MostPopular userProfiles={userProfiles} />
        <Divider color="white" />
        <Productfilters />
        <ResponsiveGrid items={companies} userProfiles={userProfiles} />
        <Box sx={{ display: "flex", justifyContent: "center"}}>
          <Button
            onClick={() => {
              setPage(page + 1);
              setInfinteScroll(true);
            }}
            sx={{ color: "white", marginBottom: "20px" }}
          >
            Load More...
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
