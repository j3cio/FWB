"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: {
      n900: string;
      n800: string;
      n700: string;
      n600: string;
      n500: string;
      n400: string;
      n300: string;
      n200: string;
      n100: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      n900: string;
      n800: string;
      n700: string;
      n600: string;
      n500: string;
      n400: string;
      n300: string;
      n200: string;
      n100: string;
    };
  }
}

const theme = createTheme({
  typography: {
    button: {
      fontFamily: 'Urbanist, Arial, sans-serif',
    },
  },
  palette: {
    primary: {
      main: "#1A3E74",
      light: "#24549E",
      dark: "#11284B",
    },
    secondary: {
      main: "#FBE093",
      light: "#f6ff82",
      dark: "#F9D262",
    },
    neutral: {
      n900: "#171A1F",
      n800: "#2E343D",
      n700: "#535D6F",
      n600: "#68768D",
      n500: "#8490A4",
      n400: "#A1AAB9",
      n300: "#BFC5CF",
      n200: "#DCDFE5",
      n100: "#F9FAFB",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
  },
  // Add other theme configurations here
});
export default theme;
