"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { CardActionArea } from "@mui/material";
import { motion } from "framer-motion";


/**
 * Renders a circle component with animation based on hover state.
 * @param {boolean} isHovered - Indicates whether the circle is being hovered.
 * @returns {JSX.Element} The rendered circle component.
 */
const Circle = ({isHovered} : {isHovered: boolean}) => {
  return (
    <div style={{ position: "relative", fontFamily: "inherit" }}>
      <motion.div
        animate={{ y: isHovered ? -10 : 0 }} // Move up 10 pixels when hovering
        style={{
          position: "absolute",
          top: -40,
          left: 80,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#8e94e9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "inherit"
        }}
      >
        <Box sx={{ justifyContent: "center", alignItems: "center", fontFamily: "inherit" }}>
          <Typography
            sx={{
              color: "#F6FF82",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "20px",
              fontFamily: "inherit",
              fontStyle: "normal",
            }}
          >
            50%
          </Typography>
          <Typography
            sx={{
              color: "#F6FF82",
              fontSize: "12px",
              fontWeight: "400",
              textAlign: "right",
              fontFamily: "inherit",
              fontStyle: "normal",
              lineHeight: "14px",
            }}
          >
            off
          </Typography>
        </Box>
      </motion.div>
    </div>
  );
};


/**
 * Renders a discount component.
 * @param {boolean} isHovered - Indicates whether the component is being hovered.
 * @returns {JSX.Element} The rendered discount component.
 */
const Discount = ({isHovered}: {isHovered: boolean}) => {
  return (
    <Box>
      <Circle isHovered={isHovered} />
    </Box>
  );
};



/**
 * Renders a product card component.
 * @returns JSX.Element
 */
export default function ProductCard({image, company}) {
  const [isHovered, setIsHovered] = React.useState(false); // Indicates whether the card is being hovered
  return (
    <motion.div
    onHoverStart={() => setIsHovered(true)}
    onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Component */}
      <Box
        sx={{
          width: "282px",
          height: "322px",
          background: "white",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          display: "inline-flex",
          backgroundColor: "transparent",
          borderWidth: "2px",
          borderRadius: "20px",
          borderColor: isHovered ? "#F6FF82" : "#1A1A23",
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          {/* Card Image */}
          <CardMedia
            component="img"
            image="https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"
            alt="nike"
            sx={{ height: "72%", padding: "0px", borderRadius: "20px",}}
          />
          {/* Card Content */}
          <CardContent
            sx={{
              backgroundColor: "white",
              height: "28%",
              paddingTop: "8px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{ fontSize: 24, 
                  fontWeight: "600",
                  wordWrap: "break-word",
                  fontFamily: "inherit",
                  fontStyle: "normal",
                  lineHeight: "26.4px",
                 }}
              >
                Nike, Inc.
              </Typography>
              <Discount isHovered={isHovered}/>
            </Box>

            {/*Profile Pictures of Users Offering Discounts for The Company*/}
            <Box sx={{ display: "flex", flexDirection: "row", marginY: "4px", alignItems: "center" }}>
              <div style={{ position: "relative", width: "64px", height: "24px" }}>
                <Avatar
                  alt="man1"
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  sx={{ width: "24px", height: "24px", position: "absolute", left: "0" }}
                />
                <Avatar
                  alt="man1"
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  sx={{ width: "24px", height: "24px", position: "absolute", left: "20px" }}
                />
                <Avatar
                  alt="man1"
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  sx={{ width: "24px", height: "24px", position: "absolute", left: "40px" }}
                />
              </div>
              <Typography sx={{
                fontSize: "12px",
                fontWeight: "400",
                fontFamily: "inherit",
                fontStyle: "normal",
                color: "#6B77AD",
                lineHeight: "18px",
                marginLeft: "6px",
              }}>
                +5 Benefits available
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
    </motion.div>
  );
}
