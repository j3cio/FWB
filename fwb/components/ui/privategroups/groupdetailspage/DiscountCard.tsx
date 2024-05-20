'use client'
import { CardActionArea } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import * as React from 'react'
import ConditionalLink from './ConditionalLink'
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
          className='xs-max:left-[110px] xxs-max:left-[100px] xs-max:w-[55px] xxs-max:w-[45px] xs-max:h-[55px] xxs-max:h-[45px] [@media(max-width:300px)]:w-[35px] [@media(max-width:300px)]:h-[35px] [@media(max-width:300px)]:left-[70px] [@media(max-width:300px)]:top-[-35px]'
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
              className='xs-max:font-normal xxs-max:font-normal xs-max:text-[20px] xxs-max:text-[15px] [@media(max-width:300px)]:text-[12px] [@media(max-width:300px)]:leading-[10px]'
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
              className='xxs-max:text-[10px] [@media(max-width:300px)]:text-[8px]'
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
export default function DiscountCard({ company }: { company:any }) {
  const [isHovered, setIsHovered] = React.useState(false) // Indicates whether the card is being hovered
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Component */}
      <ConditionalLink targetPage={`/addbenefit/${company.id}`}>
      <Box
        sx={{
          width: '282px',
          height: '322px',
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
        className='xs-max:p-0 xxs-max:p-0 xs-max:w-full xxs-max:w-full xs-max:h-[55vw] xxs-max:h-[55vw] xs-max:rounded-2xl xxs-max:rounded-2xl'
      >
        <CardActionArea sx={{ height: '100%' }}>
          {/* Card Image */}
          <CardMedia
            component="img"
            image={company.logo ? `${company.logo}` : '/nologo.png'} // The '/' is needed when we're in dynamic routes
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
            className='xs-max:pl-[10px] xxs-max:pl-[10px]'

          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: '600',
                  wordWrap: 'break-word',
                  fontFamily: 'inherit',
                  fontStyle: 'normal',
                  lineHeight: '26.4px',
                }}
                className='xs-max:text-[17px] xxs-max:text-[17px] [@media(max-width:300px)]:text-[13px] [@media(max-width:300px)]:leading-[10px]'
              >
                {company.name}
              </Typography>
            </Box>
            <Discount isHovered={isHovered} amount={company.discount_amount} />

            {/*Profile Pictures of Users Offering Discounts for The Company*/}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginY: '4px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '24px',
                }}
                className='xs-max:hidden xxs-max:hidden'
              >
                <Avatar
                  alt="man1"
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                  sx={{
                    width: '24px',
                    height: '24px',
                    position: 'absolute',
                    left: '0',
                  }}
                  className='xs-max:hidden xxs-max:hidden'
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
                  className='xs-max:hidden xxs-max:hidden'
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
                  className='xs-max:hidden xxs-max:hidden'
                />
              </div>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'inherit',
                  fontStyle: 'normal',
                  color: '#6B77AD',
                  lineHeight: '18px',
                  marginLeft: '6px',
                }}
                className='xs-max:ml-0 xxs-max:ml-0 xs-max:leading-[4px] xxs-max:leading-[4px] [@media(max-width:300px)]:leading-[10px] [@media(max-width:300px)]:text-[10px]'
              >
                + Benefits available
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Box>
      </ConditionalLink>
    </motion.div>
  )
}
