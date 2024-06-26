'use client'
import { Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import arrowIcon from '@/components/ui/explore/icons/arrow_forward_ios_24px.svg'
import ProductCard from './product_card'
import { generateSkeletons } from '../skeletons/generateSkeletons'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@clerk/nextjs'

export default function MostPopular() {
  const { getToken } = useAuth()

  const [position, setPosition] = useState(0)
  const itemWidth = 282 // Adjust this value based on your component width
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${await getToken()}`)

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect,
      }

      const protocol = window.location.protocol
      fetch(
        `${protocol}//${window.location.host}/api/companies?sort_by=${'Most%20Popular'}&category=${'all'}&page=0`,
        requestOptions
      )
        .then(async (res) =>
          setData(
            (await res.json()).result.map((company: any) => (
              <ProductCard
                key={`MostPopular${company.name}`}
                company={company}
              />
            ))
          )
        )
        .catch((error) => console.error('error', error))
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error)
    }
  }, [setData, setIsLoading, getToken])

  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false)
    }
  }, [data])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const TitleAndButtons = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'inherit',
            fontWeight: '600',
            fontSize: '32px',
            lineHeight: '110%',
            fontStyle: 'normal',
          }}
        >
          Most Popular
        </Typography>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <IconButton
            color="inherit"
            onClick={() => handleScroll('backward')}
            sx={{
              padding: '9.6px',
              borderRadius: '50%',
              border: '2px solid white',
            }}
          >
            <Image
              src={arrowIcon}
              alt="Back Arrow"
              style={{ width: '28.8px', height: '28.8px' }}
            />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => handleScroll('forward')}
            sx={{
              padding: '9.6px',
              borderRadius: '50%',
              border: '2px solid white',
            }}
          >
            <Image
              src={arrowIcon}
              alt="Next Arrow"
              style={{
                width: '28.8px',
                height: '28.8px',
                transform: 'scaleX(-1)',
              }}
            />
          </IconButton>
        </Box>
      </Box>
    )
  }

  const handleScroll = (direction: 'forward' | 'backward') => {
    const containerWidth = (itemWidth + 24) * (data.length - 4) // (itemWidth + spacing) * (number of product cards - number of cards on screen). Adjust the values accordingingly
    // Handle forward and backward scroll
    if (direction === 'forward') {
      const newPosition = position - itemWidth
      const maxPosition = -containerWidth // Calculate the maximum position based on the number of items
      setPosition(newPosition < maxPosition ? maxPosition : newPosition)
    } else if (direction === 'backward') {
      const newPosition = position + itemWidth
      setPosition(newPosition > 0 ? 0 : newPosition)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <Box>
      {isLoading ? (
        <div className="h-4">
          {generateSkeletons({ type: 'TitleAndButtons' })}
        </div>
      ) : (
        <TitleAndButtons />
      )}
      <div
        style={{
          overflowX: 'hidden',
          paddingTop: '40px',
          paddingBottom: '40px',
          minHeight: '318px',
        }}
      >
        <motion.div
          className="carousel-container"
          variants={containerVariants}
          initial="visible"
          animate={{ opacity: 1, x: position }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: `${itemWidth}px`, // Adjust this value based on your component width
          }}
          transition={{ ease: 'easeOut', duration: 0.5 }} // Adjust the easing and duration as needed
        >
          {isLoading ? (
            <motion.div
              className="carousel-item"
              variants={itemVariants}
              style={{
                display: 'flex',
                minWidth: `${itemWidth}px`,
                gap: 24,
              }}
            >
              {generateSkeletons({
                type: 'ProductCard',
                quantity: 4,
              })}
            </motion.div>
          ) : (
            data.map((item, index) => (
              <motion.div
                key={index}
                className="carousel-item"
                variants={itemVariants}
                style={{
                  minWidth: `${itemWidth}px`,
                  marginRight: '24px',
                }} // Adjust this value based on your component width
              >
                {item}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </Box>
  )
}
