import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';


function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <div>LOGO</div>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Button color="inherit">LOGO</Button>
        <Button color="inherit">LOGO</Button>
        <Button color="inherit">LOGO</Button>
        <Button color="inherit">Explore Benefits %</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
