"use client";
import Navbar from "@/components/ui/privategroups/groups_navbar";
import GroupDetailsSection from "@/components/ui/privategroups/GroupDetailsSection";
import Tabs from "@/components/ui/privategroups/Tabs";
import { Container, Box } from "@mui/material";
import { relative } from "path";
import SearchBar from "@/components/ui/privategroups/SearchBar";

//TODOs:
// Backend ---
// Hook up to backend (Group info, discount info, and user info)
// Search bar for searching members

const Page = () => {
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh"}}>
      <Container disableGutters maxWidth="lg">
        <Navbar />
        <Box sx={{ position: 'relative', marginTop: "156px", zIndex: 0 }}>
          <GroupDetailsSection />
          <Tabs />
        </Box>
      </Container>
    </Box>
  );
};

export default Page;