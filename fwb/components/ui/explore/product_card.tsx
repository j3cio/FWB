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
import { useAuth } from "@clerk/nextjs";
import { get } from "http";
import { useEffect } from "react";

/**
 * Renders a discount component.
 * @param {boolean} isHovered - Indicates whether the component is being hovered.
 * @param {number} amount - The discount amount in percentage.
 * @returns {JSX.Element} The discount component.
 */
const Discount = ({
  isHovered,
  amount,
}: {
  isHovered: boolean;
  amount: Number;
}) => {
  return (
    <Box>
      <div style={{ position: "relative", fontFamily: "inherit" }}>
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }} // Move up 10 pixels when hovering
          style={{
            position: "absolute",
            top: -55,
            left: 180,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#8e94e9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "inherit",
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "inherit",
            }}
          >
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
              {`${amount}%`}
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
    </Box>
  );
};

/**
 * Renders a product card component.
 * @returns JSX.Element
 */
const ProductCard = function ProductCard({
  company,
  userProfiles,
}: {
  company: any;
  userProfiles: any[];
}) {
  const [isHovered, setIsHovered] = React.useState(false); // Indicates whether the card is being hovered
  const { getToken } = useAuth();
  let profilePics: string[] = [];

  // Get the profile pictures of the first 3 users offering discounts for the company
  if (userProfiles) {
    let firstThreeUsers = company.discounts
      .slice(0, 3)
      .map((discount: any) => discount.user_id);
    firstThreeUsers.forEach((user_id: string) => {
      let user = userProfiles.find((user: any) => user.user_id == user_id);
      if (user) {
        profilePics.push(user.profile_picture_url);
      }
    });
  }

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
            image={`${company.logo}`}
            alt={`${company.name} logo`}
            sx={{
              height: "72%",
              padding: "0px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
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
                sx={{
                  fontSize: 24,
                  fontWeight: "600",
                  wordWrap: "break-word",
                  fontFamily: "inherit",
                  fontStyle: "normal",
                  lineHeight: "26.4px",
                }}
              >
                {company.name}
              </Typography>
            </Box>
            <Discount
              isHovered={isHovered}
              amount={company.greatest_discount}
            />

            {/*Profile Pictures of Users Offering Discounts for The Company*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginY: "4px",
                alignItems: "center",
              }}
            >
              <div
                style={{ position: "relative", width: "64px", height: "24px" }}
              >
                {profilePics[0] && (
                  <Avatar
                    alt="avatar1"
                    src={`${profilePics[0]}`}
                    sx={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      left: "0px",
                    }}
                  />
                )}
                {profilePics[1] && (
                  <Avatar
                    alt="avatar2"
                    src={`${profilePics[1]}`}
                    sx={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      left: "20px",
                    }}
                  />
                )}
                {profilePics[2] && (
                  <Avatar
                    alt="avatar3"
                    src={`${profilePics[0]}`}
                    sx={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      left: "40px",
                    }}
                  />
                )}
              </div>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  fontFamily: "inherit",
                  fontStyle: "normal",
                  color: "#6B77AD",
                  lineHeight: "18px",
                  marginLeft: "6px",
                }}
              >
                +{company.discounts.length} Benefits available
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
    </motion.div>
  );
};
export default ProductCard;
