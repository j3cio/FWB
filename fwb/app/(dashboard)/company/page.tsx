"use client"

import { Container, Box, Typography } from "@mui/material";
import Header from "@/components/ui/explore/header";

const CompanyPage = () => {
  return (
    <Box sx={{ backgroundColor: "#1A1A23", minHeight: "100vh" }}>
      <Container disableGutters maxWidth="lg">
        <Header />
        
      </Container>
    </Box>
  );
};

export default CompanyPage;
