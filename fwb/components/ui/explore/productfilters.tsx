"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import arrowIcon from "@/components/ui/explore/icons/expand_more_24px.svg";
import Image from "next/image";

function BasicSelect({ name, options }) {
  const [option, setOption] = React.useState("");
  const [flip, setFlip] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const arrowStyle = {
    color: "white",
    width: "28.8px",
    height: "28.8px",
    transform: flip ? "rotate(180deg)" : "rotate(0deg)",
  };

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{ display: "flex", minWidth: 246, height: "48px" }}
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "white",
            borderColor: "white",
            fontWeight: "700",
            letterSpacing: "0.32px",
          }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label={`${name}`}
          onChange={handleChange}
          onOpen={() => setFlip(true)}
          onClose={() => setFlip(false)}
          IconComponent={() => (
            <Image src={arrowIcon} alt="arrow" style={arrowStyle} />
          )}
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: "#1A1A23",
                },
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#8E94E9",
              borderWidth: "2px",
              borderRadius: "10px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            color: "white",
          }}
        >
          {options.map((option: string) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ backgroundColor: "#1A1A23", color: "white" }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default function Productfilters() {
  return (
    <Box
      sx={{
        backgroundColor: "#1A1A23",
        marginY: "5vh",
        position: "sticky",
        top: "112px",
        height: "76px",
        zIndex: 1,
        justifyContent: "flex-end",
        display: "flex",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "24px" }}>
        <BasicSelect
          name="Sort by"
          options={[
            "Most Popular",
            "Most Recent",
            "Highest to Loweest Discounts",
            "Lowest to Hightest Discounts",
          ]}
        />
        <BasicSelect name="Private Group" options={["Group 1", "Group 2"]} />
        <BasicSelect
          name="Category"
          options={[
            "Sports",
            "Fashion",
            "Electronic",
            "Health",
            "Home & Kitchen",
            "Computer & Accessories",
            "Beauty & Skincare",
            "Books",
            "Hobbies",
          ]}
        />
      </Box>
    </Box>
  );
}
