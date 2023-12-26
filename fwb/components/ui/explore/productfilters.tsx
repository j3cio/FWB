"use client";

import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import arrowIcon from "@/components/ui/explore/icons/expand_more_24px.svg";
import Image from "next/image";
import { FilterContext } from "./filter_context";

function BasicSelect({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: string[];
  defaultValue: string;
}) {
  const [option, setOption] = useState(defaultValue);
  const [flip, setFlip] = useState(false);
  const {
    setSortBy,
    setCategory,
    setPrivateGroup,
  } = useContext(FilterContext);

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
          id="simple-select-label"
          sx={{
            color: "white",
            borderColor: "white",
            fontWeight: "700",
            letterSpacing: "0.32px",
            fontFamily: "inherit",
          }}
        >
          {name}
        </InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={option}
          label={`${name}`}
          onChange={(event: SelectChangeEvent) => {
            setOption(event.target.value as string);
            if (name === "Sort by") {
              setSortBy(event.target.value as string);
            } else if (name === "Category") {
              setCategory(event.target.value as string);
            } else if (name === "Private Group") {
              setPrivateGroup(event.target.value as string);
            }
          }}
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
            fontFamily: "inherit",
          }}
        >
          {options.map((option: string) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                backgroundColor: "#1A1A23",
                color: "white",
                fontFamily: "inherit",
                borderRadius: "10px",
              }}
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
        marginTop: "108px",
        marginBottom: "32px",
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
            "Highest to Lowest Discounts",
            "Lowest to Hightest Discounts",
          ]}
          defaultValue="Most Popular"
        />
        <BasicSelect
          name="Private Group"
          options={["All", "Group 1", "Group 2"]}
          defaultValue="All"
        />
        <BasicSelect
          name="Category"
          options={[
            "All",
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
          defaultValue="All"
        />
      </Box>
    </Box>
  );
}
