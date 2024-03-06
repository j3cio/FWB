import React from "react";

import { Skeleton, Box } from "@mui/material";

const TitleAndButtonsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Skeleton sx={{ fontSize: "2rem",  bgcolor: "#CED2E4", width: "11ch"}} />
      <Box sx={{ display: "flex", gap: "24px" }}>

      <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: "#CED2E4",}}/>
      <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: "#CED2E4",}}/>
      </Box>
    </Box>
  );
};

export default TitleAndButtonsSkeleton;
