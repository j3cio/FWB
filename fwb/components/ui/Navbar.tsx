import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "ochre.main", border: 0, elevation: 0}}>
      <div className="py-2 mx-32">
        <Toolbar>
          <IconButton sx={{ color: "primary.light" }}>
            <div>LOGO.</div>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button color="inherit" sx={{ color: "primary.light" }}>
            ICON
          </Button>
          <Button color="inherit" sx={{ color: "primary.light" }}>
            ICON
          </Button>
          <Button color="inherit" sx={{ color: "primary.light" }}>
            ICON
          </Button>
          <Button
            color="inherit"
            sx={{
              borderRadius: 28,
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 2,
              color: "primary.main",
              bgcolor: "primary.light",
            }}
          >
            Explore Benefits %
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
}

export default Navbar;
