import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { CardActionArea } from "@mui/material";
import { motion } from "framer-motion";

const Circle = () => {
  return (
    <div style={{ position: "relative" }}>
      <motion.div
        whileHover={{ y: -10 }} // Move up 10 pixels when hovering
        style={{
          position: "absolute",
          top: -40,
          left: 50,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#8e94e9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
          <Typography
            sx={{
              color: "#F6FF82",
              fontSize: 24,
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            50%
          </Typography>
          <Typography
            sx={{
              color: "#F6FF82",
              fontSize: 12,
              fontWeight: "400",
              textAlign: "right",
            }}
          >
            off
          </Typography>
        </Box>
      </motion.div>
    </div>
  );
};

const Discount = () => {
  return (
    <Box>
      <Circle />
    </Box>
  );
};

export default function ProductCard() {
  return (
    <Card
      sx={{
        width: "282px",
        height: "322px",
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "inline-flex",
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          image="https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
          alt="nike"
          sx={{ height: "72%", padding: "0" }}
        />
        <CardContent
          sx={{
            height: "28%",
            paddingTop: "8px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{ fontSize: 24, fontWeight: "600", wordWrap: "break-word" }}
            >
              Nike, Inc.
            </Typography>
            <Discount />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar
              alt="man1"
              src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
              sx={{ width: "24px", height: "24px" }}
            />
            <Avatar
              alt="man1"
              src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
              sx={{ width: "24px", height: "24px" }}
            />
            <Avatar
              alt="man1"
              src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
              sx={{ width: "24px", height: "24px" }}
            />
            <Typography variant="body2" color="text.secondary" padding="2px">
              +5 Benefits available
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
