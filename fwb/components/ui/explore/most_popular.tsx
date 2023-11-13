'use client'
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import arrowIcon from "@/components/ui/explore/icons/arrow_forward_ios_24px.svg";
import ProductCard from "./product_card";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const cards = [
    <ProductCard key={0} />,
    <ProductCard key={1} />,
    <ProductCard key={2} />,
    <ProductCard key={3} />,
    <ProductCard key={4} />,
    // Add more ProductCard components as needed
  ];

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? 0 : prevPage + 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleCards = cards.slice(startIndex, endIndex);

  return (
    <div>
      <AnimatePresence initial={false} custom={currentPage}>
        <motion.div
          key={currentPage}
          custom={currentPage}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(event, { offset, velocity }) => {
            if (offset.x > 100 || velocity.x > 500) {
              prevPage();
            } else if (offset.x < -100 || velocity.x < -500) {
              nextPage();
            }
          }}
          style={{ position: 'relative', width: 'calc(282px * 4)', height: '322px' }}
        >
          {visibleCards.map((card) => card)}
        </motion.div>
      </AnimatePresence>
      <button onClick={prevPage} style={{ color: "white"}}>Previous</button>
      <button onClick={nextPage} style={{ color: "white"}}>Next</button>
    </div>
  );
};



export default function MostPopular() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <Typography
          sx={{ color: "#F6FF82", fontWeight: "600", fontSize: "32px" }}
        >
          Most Popular
        </Typography>
        <Box sx={{ display: "flex", gap: "24px" }}>
          <IconButton
            color="inherit"
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
      
      <Carousel />
    </Box>
  );
}
