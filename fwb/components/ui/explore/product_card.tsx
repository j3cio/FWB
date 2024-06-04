'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { CardActionArea } from '@mui/material'

import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

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
          className="absolute left-[80%] top-[-50px] flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#8e94e9] sm:left-[180px] sm:top-[-55px] sm:h-[60px] sm:w-[60px]"
        >
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'inherit',
            }}
          >
            <p className="text-xs font-semibold leading-3 text-[#F6FF82] sm:text-2xl sm:leading-5">
              {`${amount}%`}
            </p>
            <p className="text-right text-[8px] text-[#F6FF82] sm:text-xs sm:leading-4">
              off
            </p>
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

  const setSearchResults = useContextSelector(
    SearchContext,
    (context) => context.setSearchResults
  )
  const setSearchQuery = useContextSelector(
    SearchContext,
    (context) => context.setSearchQuery
  )

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
          height: 'calc(48vw + (48vw * 0.142))', //maintaining our card's aspect ratio in mobile
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
                <div>
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
