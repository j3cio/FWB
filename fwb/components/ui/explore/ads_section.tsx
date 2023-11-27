
import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";

export default function AdSection(): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        height: "9,5vh",
        backgroundColor: "#8E94E9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "5vh",
        marginBottom: "5vh",
      }}
    >
      <Typography sx={{ color: "#F6FF82", fontSize: "24px", fontWeight: "600", margin: 20 }}>
        AD Section
      </Typography>
    </Box>
  );
}
