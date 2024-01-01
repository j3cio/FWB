"use client";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import arrowIcon from "@/components/ui/explore/icons/arrow_forward_ios_24px.svg";
import ProductCard from "./product_card";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MostPopular() {
  const [position, setPosition] = useState(0);
  const itemWidth = 282; // Adjust this value based on your component width
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yWEpITkRrNmpLRTZPZTN0T1MxRFFyNjB3cjAiLCJ0eXAiOiJKV1QifQ.eyJhcHBfbWV0YWRhdGEiOnt9LCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiYXpwIjoiaHR0cHM6Ly93d3cubWFrZWZ3Yi5jb20iLCJlbWFpbCI6ImRlcmlja0BqM2MuaW8iLCJleHAiOjIwMTcxNTg0NTcsImlhdCI6MTcwMTc5ODQ1NywiaXNzIjoiaHR0cHM6Ly9tdXNpY2FsLWNvbGxpZS04MC5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI5OTJmMzQ2ZDMyZjRmOGI0Zjk1MiIsIm5iZiI6MTcwMTc5ODQ1Miwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzdWIiOiJ1c2VyXzJaM1FJeXB6Q0R3UG5RQkhUWkFjVExVMGtRUyIsInVzZXJfaWQiOiJ1c2VyXzJaM1FJeXB6Q0R3UG5RQkhUWkFjVExVMGtRUyIsInVzZXJfbWV0YWRhdGEiOnt9fQ.Gdlnv4o4ybef5MRZtNgOyh5T0ESj3rfIkpeRht3dAqE_4KuMApDTEU3lB2SZOZJzbjUT2n554xf18F6e3CPP2yvMRb_GD3qKJG9n7hj4Q9x77nbyAqhLSFffMSRnwq7q7zt99UGn7nRGG0QKkMLmjbOzk3VcP60X3oLnZv817o0uX839-Wz2pqPYXQD34pd5sez-E11GpjcAvnRK6n0EwpHL6XxhAxmi2rNsswXwgo-musyBHzM79LRVBsEOc9QTgRlc6h6nbcJAZI4H0yJOGf4qztANtU_6-fgElNETir9N9vQi1rZ1zvMzuWcztrqazb_rxwpZ5qvqHM7J5vzk-g"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      const protocal = window.location.protocol;
      console.log(protocal);
      fetch(
        `${protocal}//${window.location.host}/api/companies?sort_by=${
          "Most%20Popular"
        }&category=${
          "all"
        }&page=0`,
        requestOptions
      )
        .then(async (res) => setData((await res.json()).result.map((company: any) => <ProductCard key={`MostPopular${company.name}`} company={company} />)))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          sx={{ color: "#FFF", 
            fontFamily: "inherit",
            fontWeight: "600", 
            fontSize: "32px",
            lineHeight: "110%",
            fontStyle: "normal"
           }}
        >
          Most Popular
        </Typography>
        <Box sx={{ display: "flex", gap: "24px" }}>
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
    const containerWidth = (itemWidth + 24) * (data.length - 4); // (itemWidth + spacing) * (number of product cards - number of cards on screen). Adjust the values accordingingly
    // Handle forward and backward scroll
    if (direction === "forward") {
      const newPosition = position - itemWidth;
      const maxPosition = -containerWidth; // Calculate the maximum position based on the number of items
      setPosition(newPosition < maxPosition ? maxPosition : newPosition);
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

  return (
    <Box>
      <TitleAndButtons />
      <div
        style={{
          overflowX: "hidden",
          paddingTop: "40px",
          paddingBottom: "40px",
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
              style={{ minWidth: `${itemWidth}px`, marginRight: "24px" }} // Adjust this value based on your component width
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Box>
  );
}
