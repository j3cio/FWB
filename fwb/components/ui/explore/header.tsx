import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import groupIcon from "@/components/ui/explore/icons/group_24px.svg";
import messsageIcon from "@/components/ui/explore/icons/message_24px.svg";
import notificationIcon from "@/components/ui/explore/icons/notifications_24px.svg";
import searchIcon from "@/components/ui/explore/icons/search_24px.svg";
import { Image } from "next/dist/client/image-component";
import { TextField, IconButton, Box } from "@mui/material";
const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "right",
        borderRadius: "100px",
        backgroundColor: "white",
        flexGrow: 1,
        border: "none",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        style={{ flex: 1, height: "48px", borderRadius: "25px 0 0 25px" }}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
      />
      <IconButton
        color="primary"
        aria-label="search"
        sx={{
          backgroundColor: "black",
          padding: "10px",
          border: "none",
          margin: "4px",
        }}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  );
};
export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1A1A23",
        boxShadow: "none",
        padding: "2.2vh",
      }}
    >
      <Toolbar sx={{ display: "flex", gap: "0.9vw" }}>
        <Typography
          sx={{
            marginRight: "69px",
            height: "48px",
            width: "114px",
            fontSize: "38px",
          }}
        >
          LOGO.
        </Typography>
        <SearchBar />
        <IconButton
          color="inherit"
          sx={{
            padding: "9.6px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        >
          <Image
            src={messsageIcon}
            alt="message"
            style={{
              width: "28.8px",
              height: "28.8px",
            }}
          />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{
            padding: "9.6px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        >
          <Image
            src={groupIcon}
            alt="Group Icon"
            style={{ width: "28.8px", height: "28.8px" }}
          />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{
            padding: "9.6px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        >
          <Image
            src={notificationIcon}
            alt="Notification Icon"
            style={{ width: "28.8px", height: "28.8px" }}
          />
        </IconButton>
        <Avatar alt="User" sx={{width: "48px", height: "48px"}}/>
      </Toolbar>
    </AppBar>
  );
}
