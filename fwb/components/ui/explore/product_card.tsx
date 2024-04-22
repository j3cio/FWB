'use client'

import { useContext, useState } from 'react'

import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { CardActionArea } from '@mui/material'

import { SearchContext } from '@/contexts/SearchContext'

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
  isHovered: boolean
  amount: Number
}) => {
  return (
    <Box>
      <div style={{ position: 'relative', fontFamily: 'inherit' }}>
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }} // Move up 10 pixels when hovering
          style={{
            position: 'absolute',
            top: -55,
            left: 180,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#8e94e9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'inherit',
          }}
        >
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'inherit',
            }}
          >
            <Typography
              sx={{
                color: '#F6FF82',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '20px',
                fontFamily: 'inherit',
                fontStyle: 'normal',
              }}
            >
              {`${amount}%`}
            </Typography>
            <Typography
              sx={{
                color: '#F6FF82',
                fontSize: '12px',
                fontWeight: '400',
                textAlign: 'right',
                fontFamily: 'inherit',
                fontStyle: 'normal',
                lineHeight: '14px',
              }}
            >
              off
            </Typography>
          </Box>
        </motion.div>
      </div>
    </Box>
  )
}

/**
 * Renders a product card component.
 * @returns JSX.Element
 */
export default function ProductCard({ company }: { company: any }) {
  const [isHovered, setIsHovered] = useState(false) // Indicates whether the card is being hovered

  const { setSearchQuery, setSearchResults } = useContext(SearchContext)

  const router = useRouter()
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const handleClick = () => {
    router.push(`/detail?name=${company.name}`)
    clearSearch()
  }
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex justify-center"
    >
      {/* Card Component */}
      <Box
        sx={{
          width: '48vw',
          height: 'calc(48vw + (48vw * 0.142))',
          maxWidth: '282px',
          maxHeight: '322px',
          minHeight: '168px',
          minWidth: '140px',
          background: 'white',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'flex-start',

          alignItems: 'center',
          display: 'inline-flex',
          backgroundColor: 'transparent',
          borderWidth: '2px',
          borderRadius: '20px',
          borderColor: isHovered ? '#F6FF82' : '#1A1A23',
        }}
        onClick={() => handleClick()}
      >
        <CardActionArea sx={{ height: '100%' }}>
          {/* Card Image */}
          <CardMedia
            component="img"
            image={company.logo ? `${company.logo}` : 'nologo.png'}
            // image={`${company.logo}`}
            alt={`${company.name} logo`}
            sx={{
              height: '72%',
              padding: '0px',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          />
          {/* Card Content */}
          <CardContent
            sx={{
              backgroundColor: 'white',
              height: '28%',
              paddingTop: '8px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingBottom: '24px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <p className="font-semibold sm:text-2xl">{company.name}</p>
            </Box>
            <Discount
              isHovered={isHovered}
              amount={company.greatest_discount}
            />

            {/*Profile Pictures of Users Offering Discounts for The Company*/}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginY: '4px',
                alignItems: 'center',
              }}
            >
              <div className="relative hidden h-6 w-16 sm:block">
                <div className="">
                  <Avatar
                    alt="man1"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    sx={{
                      width: '24px',
                      height: '24px',
                      position: 'absolute',
                      left: '0',
                    }}
                  />
                  <Avatar
                    alt="man1"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    sx={{
                      width: '24px',
                      height: '24px',
                      position: 'absolute',
                      left: '20px',
                    }}
                  />
                  <Avatar
                    alt="man1"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    sx={{
                      width: '24px',
                      height: '24px',
                      position: 'absolute',
                      left: '40px',
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-[#6B77AD] sm:ml-2">
                +{company.discounts.length}{' '}
                {company.discounts.length > 1 ? 'Benefits ' : 'Benefit '}
                available
              </p>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
    </motion.div>
  )
}
