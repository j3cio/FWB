'use client'

import { DiscountDataDetail } from '@/app/types/types'
import { useState, useCallback, useEffect } from 'react'
import Button from '@mui/material/Button'
import MoreButton from '@/components/ui/detail/moreDetail'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductCard(
  { data }: { data: DiscountDataDetail },
  { key }: { key: number }
) {
  const copyShareURL = () => {
    const currentURL = window.location.href
    // Copy URL to clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL copied to clipboard:', currentURL)
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err)
      })
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleDetail = () => setIsOpen(!isOpen)

  const [contentHeight, setContentHeight] = useState(0)
  useEffect(() => {
    if (isOpen) {
      // Get the actual height of the content
      const element = document.getElementById('content')
      if (element) {
        const height = element.offsetHeight
        setContentHeight(height)
      }
    }
  }, [isOpen])

  return (
    <motion.div className="mx-[120px] flex flex-row relative mb-[32px]" layout>
      <div className="w-[20%] bg-[#8E94E9] text-white flex rounded-l-[25px]">
        <motion.div className="text-[40px] font-bold w-[70px] m-auto" layout>
          {data.discount_amount}% OFF
        </motion.div>
      </div>
      <div className="w-[80%] px-[40px] bg-white flex flex-col rounded-r-[25px]">
        <div className="w-full flex justify-between py-[64px]">
          <div>
            <div className="text-[24px] font-bold">
              Get {data.discount_amount}% off Shoes and Sandals
            </div>
            <div className="text-[14px]">*Terms & Conditions apply</div>
            <div className="flex flex-row mt-[48px]">
              <div
                className="h-[24px] w-[24px] rounded-[24px] mr-[5px] bg-no-repeat bg-center bg-contain"
                style={{
                  backgroundImage: `url(${data.user_image ? data.user_image : 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjanBvRjl3OXpJTXRUM3JBak9vcTNBQkRIOCJ9'})`,
                }}
              ></div>
              <div>
                by {data.user_username ? data.user_username : 'Unknown'}
              </div>
            </div>
          </div>
          <div className="flex h-auto my-auto cursor-pointer">
            <div className="mr-[16px] my-auto">
              <Button
                onClick={() => console.log('message')}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  padding: '0px',
                  minWidth: '48px',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="45.9996"
                    height="45.9996"
                    rx="22.9998"
                    stroke="#8E94E9"
                    strokeWidth="2"
                  />
                  <path
                    d="M33.5998 11.9998H14.4C13.08 11.9998 12.012 13.0797 12.012 14.3997L12 35.9996L16.8 31.1996H33.5998C34.9198 31.1996 35.9998 30.1196 35.9998 28.7996V14.3997C35.9998 13.0797 34.9198 11.9998 33.5998 11.9998Z"
                    fill="#8E94E9"
                  />
                </svg>
              </Button>
            </div>
            {/* This is the sharable link */}
            <div className="mr-[16px] my-auto cursor-pointer">
              <Button
                onClick={() => copyShareURL()}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  padding: '0px',
                  minWidth: '48px',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="45.9996"
                    height="45.9996"
                    rx="22.9998"
                    stroke="#8E94E9"
                    strokeWidth="2"
                  />
                  <path
                    d="M31.1991 28.9437C30.2871 28.9437 29.4711 29.3037 28.8471 29.8677L20.2912 24.8878C20.3512 24.6118 20.3992 24.3358 20.3992 24.0478C20.3992 23.7598 20.3512 23.4838 20.2912 23.2078L28.7511 18.2758C29.3991 18.8758 30.2511 19.2478 31.1991 19.2478C33.1911 19.2478 34.7991 17.6398 34.7991 15.6478C34.7991 13.6558 33.1911 12.0479 31.1991 12.0479C29.2071 12.0479 27.5991 13.6558 27.5991 15.6478C27.5991 15.9358 27.6471 16.2118 27.7071 16.4878L19.2472 21.4198C18.5992 20.8198 17.7472 20.4478 16.7992 20.4478C14.8072 20.4478 13.1992 22.0558 13.1992 24.0478C13.1992 26.0397 14.8072 27.6477 16.7992 27.6477C17.7472 27.6477 18.5992 27.2757 19.2472 26.6757L27.7911 31.6677C27.7311 31.9197 27.6951 32.1837 27.6951 32.4477C27.6951 34.3797 29.2671 35.9517 31.1991 35.9517C33.1311 35.9517 34.7031 34.3797 34.7031 32.4477C34.7031 30.5157 33.1311 28.9437 31.1991 28.9437Z"
                    fill="#8E94E9"
                  />
                </svg>
              </Button>
            </div>
            <div className="cursor-pointer">
              <div
                className="flex items-center cursor-pointer select-none"
                onClick={() => toggleDetail()}
              >
                <MoreButton />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={{
                transition: 'height 0.5s',
                overflow: 'hidden',
              }}
              initial={{
                height: 0,
                marginBottom: '0px',
              }}
              animate={{
                height: contentHeight,
                marginBottom: '40px',
              }}
              exit={{
                height: 0,
                marginBottom: '-40px',
              }}
              transition={{
                duration: 0.5,
                ease: 'easeIn',
              }}
            >
              <div id="content" className="mb-[24px]">
                <div className="w-full bg-[#ADB4D2] h-[1px]"></div>
                <div>
                  <div className="text-[16px] text-[#1A1A23] font-bold mb-[3px] mt-[5px]">
                    Terms & Conditions:
                  </div>
                  <div>{data.terms_and_conditions}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
