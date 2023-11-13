"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

function BasicSelect({ name, options }) {
  const [option, setOption] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%", height: "100px", minWidth: 120, flexGrow: 1 }}>
      <FormControl
        fullWidth
        sx={{ color: "white", borderColor: "white", maxWidth: 200 }}
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: "white", borderColor: "white" }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={`${name}`}
          onChange={handleChange}
          sx={{ color: "white" }}
        >
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
          <MenuItem value={30}>Option 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default function Productfilters() {
  return (
    <Box>
      <Typography
        sx={{ color: "#F6FF82", fontWeight: "600", fontSize: "32px" }}
      >
        All Products
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <BasicSelect name="Sort by" options={[]} />
        <BasicSelect name="Private Group" options={[]} />
        <BasicSelect name="Category" options={[]} />
      </Box>
    </Box>
  );
}
