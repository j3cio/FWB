// theme.ts
"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 palette: {
   primary: {
     main: '#1a1a23',
   },
   secondary: {
     main: '#f44336',
   },
   common: {
    black: '#000',
    white: '#fff',
  }
 },
 // Add other theme configurations here
});

export default theme;
