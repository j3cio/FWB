'use client'
import { Box, Paper, Grid, styled, Typography } from "@mui/material";
import * as React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h1" textAlign={"center"}>Explore Page</Typography>
      <Grid container spacing={2}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function ExplorePage() {
  return (
    <Box>
      <ResponsiveGrid />
    </Box>
  );
}