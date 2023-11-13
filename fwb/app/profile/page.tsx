"use client";

import Navbar from "@/components/profile/Navbar";
import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import imageSrc from "../../public/bargain1700x350.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#8e94e9",
      light: "#ffffff",
    },
    ochre: {
      main: "#1a1a23",
      light: "#f6ff82",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});

function page() {
  // Set up color theme
  // Proper icons and logos
  // Need to update font
  // Make Bargain text responsive
  // Animations/Hover effects for buttons, etc..
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-[#1a1a23] min-h-screen">
        <Navbar></Navbar>
        {/*Container div*/}
        <div className="flex flex-1 flex-col h-full w-full items-center justify-center">
          {/*Profile div*/}
          <div className="flex w-11/12 h-1/5 mt-6 mb-6 gap-10 border-b-2 border-slate-200 pb-6">
            <div className="flex bg-slate-200 w-48 rounded-full justify-center items-center">Profile Icon</div>
            <div className="flex flex-col grow justify-center">
              <div className="m-2  text-slate-200">User Name</div>
              <div className="m-2 text-slate-200">Works at: Company Name</div> {/* Company name should be Yellow*/}
              <div className="flex gap-2 m-2">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 28,
                    borderStyle: "solid",
                    borderColor: "white",
                    borderWidth: 2,
                    bgcolor: "ochre.main",
                    color: "primary.light",
                  }}
                >
                  Edit Profile {">"}{" "}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 28,
                    borderStyle: "solid",
                    borderColor: "white",
                    borderWidth: 2,
                    bgcolor: "ochre.main",
                    color: "primary.light",
                  }}
                >
                  Verify Employment [logo]
                </Button>
              </div>
            </div>
          </div>
          {/*Bargains div*/}
          <div className="flex flex-col h-3/5 w-11/12 grow gap-6">
            <div className="flex rounded-3xl items-center justify-center relative z-0">
              <Image
                src={imageSrc}
                alt="Image Alt Text"
                className="object-cover object-center"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                objectFit="cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="flex w-1/6 ml-48 mt-10 text-6xl font-bold text-yellow-200">Booty Call for Bargains!</h1>
                <div className="flex flex-row-reverse w-5/6 mr-28">
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 28,
                      borderStyle: "solid",
                      borderColor: "white",
                      borderWidth: 2,
                      bgcolor: "ochre.light",
                      color: "primary.main",
                    }}
                  >
                    Share your discount {">"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex h-2/5 gap-6">
              <a href="google.com" className="flex flex-1 bg-white rounded-3xl items-center h-44">
                <div className="flex flex-col mx-6">
                  <div>Saved Discounts</div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                </div>
                <div className="flex flex-row-reverse grow mx-10">Icon</div>
              </a>
              <a href="google.com" className="flex flex-1 bg-white rounded-3xl items-center gap-6">
                <div className="flex flex-col mx-6">
                  <div>Private Group</div>
                  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                </div>
                <div className="flex flex-row-reverse grow mx-10">Icon</div>
              </a>
            </div>
          </div>
          {/*My Benefits div*/}
          <div className="flex flex-col w-11/12 h-1/5 my-10 rounded-lg">
            <div className="flex flex-col h-full w-full">
              <div className="flex h-2/5 border-b-2 border-slate-200 pt-2 pl-2 text-3xl text-white">My Benefits!</div>
              <div className="flex h-1/4 items-center justify-center text-yellow-200 mt-10 text-3xl">
                Be the wingman to a friend&apos;s wallet now!
              </div>
              <div className="flex grow items-center justify-center mt-6">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 28,
                    borderStyle: "solid",
                    borderColor: "white",
                    borderWidth: 2,
                    bgcolor: "ochre.main",
                    color: "primary.light",
                  }}
                >
                  Share your discount {">"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default page;
