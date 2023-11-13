import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import groupIcon from "@/components/profile/icons/group_24px.svg";
import messsageIcon from "@/components/profile/icons/message_24px.svg";
import notificationIcon from "@/components/profile/icons/notifications_24px.svg";
import { Image } from "next/dist/client/image-component";
import { IconButton, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1A1A23",
        boxShadow: "none",
        padding: "32px",
        height: "112px",
      }}
    >
      <Toolbar sx={{ display: "flex", gap: "24px" }}>
        <Typography
          sx={{
            marginRight: "69px",
            height: "48px",
            width: "114px",
            fontSize: "38px",
            color: "#ffffff",
          }}
        >
          LOGO.
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "right",
            borderRadius: "100px",
            backgroundColor: "white",
            flexGrow: 1,
            border: "none",
          }}
        ></Box>
        <IconButton
          
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
          <Image src={groupIcon} alt="Group Icon" style={{ width: "28.8px", height: "28.8px" }} />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{
            padding: "9.6px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        >
          <Image src={notificationIcon} alt="Notification Icon" style={{ width: "28.8px", height: "28.8px" }} />
        </IconButton>
        <Avatar alt="User" sx={{ width: "48px", height: "48px" }} />
      </Toolbar>
    </AppBar>
  );
}
