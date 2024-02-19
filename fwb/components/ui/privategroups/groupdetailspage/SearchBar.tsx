import searchIcon from "@/components/ui/explore/icons/search_24px.svg";
import { Box, IconButton, TextField } from "@mui/material";
import { Image } from "next/dist/client/image-component";

const SearchBar = () => {
  return (
    <div className="mr-4">
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
    </div>
  );
};

export default SearchBar;
