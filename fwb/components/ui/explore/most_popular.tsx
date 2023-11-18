"use client";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import arrowIcon from "@/components/ui/explore/icons/arrow_forward_ios_24px.svg";
import ProductCard from "./product_card";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MostPopular() {
  const [position, setPosition] = useState(0);
  const itemWidth = 282; // Adjust this value based on your component width

  const TitleAndButtons = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ color: "#F6FF82", fontWeight: "600", fontSize: "32px" }}
        >
          Most Popular
        </Typography>
        <Box sx={{ display: "flex", gap: "1.6vw" }}>
          <IconButton
            color="inherit"
            onClick={() => handleScroll("backward")}
            sx={{
              padding: "9.6px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          >
            <Image
              src={arrowIcon}
              alt="Back Arrow"
              style={{ width: "28.8px", height: "28.8px" }}
            />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => handleScroll("forward")}
            sx={{
              padding: "9.6px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          >
            <Image
              src={arrowIcon}
              alt="Next Arrow"
              style={{
                width: "28.8px",
                height: "28.8px",
                transform: "scaleX(-1)",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const handleScroll = (direction: "forward" | "backward") => {
    const containerWidth = itemWidth * data.length; // Adjust this value based on the number of items

    if (direction === "forward") {
      const newPosition = position - itemWidth;
      setPosition(
        newPosition < -containerWidth + itemWidth
          ? -containerWidth + itemWidth
          : newPosition
      );
    } else if (direction === "backward") {
      const newPosition = position + itemWidth;
      setPosition(newPosition > 0 ? 0 : newPosition);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const data: React.ReactNode[] = [
    <ProductCard key={1} />,
    <ProductCard key={2} />,
    <ProductCard key={3} />,
    <ProductCard key={4} />,
    <ProductCard key={5} />,
  ]; // Replace this with your array of components

  return (
    <Box>
      <TitleAndButtons />
      <div
        style={{
          overflowX: "hidden",
          paddingTop: "4.6vh",
          paddingBottom: "4.6vh",
        }}
      >
        <motion.div
          className="carousel-container"
          variants={containerVariants}
          initial="visible"
          animate={{ opacity: 1, x: position }}
          style={{
            display: "flex",
            flexDirection: "row",
            minWidth: `${itemWidth}px`, // Adjust this value based on your component width
          }}
          transition={{ ease: "easeOut", duration: 0.5 }} // Adjust the easing and duration as needed
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="carousel-item"
              variants={itemVariants}
              style={{ minWidth: `${itemWidth}px`, marginRight: "1.5vw" }} // Adjust this value based on your component width
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Box>
  );
}
