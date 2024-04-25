'use client'

import { useState } from 'react'
import ChevronDownwardsIcon from './icons/ChevronDownwardsIcon'
import MessageIcon from './icons/MessageIcon'
import ShareIcon from './icons/ShareIcon'

import { DiscountDataDetail } from '@/app/types/types'
import ChevronUpwardsIcon from './icons/ChevronUpwardsIcon'
import DiscountTermsAndConditions from './DiscountTermsAndConditions'
import { AnimatePresence, motion } from 'framer-motion'
import useIntitialChatClient from '@/app/chat/useIntializeChatClient'
import { useAuth, useUser } from '@clerk/nextjs'
import { LoadingIndicator } from 'stream-chat-react'
import CustomTooltip from '../tooltips/CustomTooltip'

interface ProductCardProps {
  data: DiscountDataDetail
  key: number
}

export default function ProductCard({ data, key }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const chatClient = useIntitialChatClient()
  const { userId } = useAuth()
  const { user } = useUser()

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
    setShowTooltip(true)

    setTimeout(() => {
      setShowTooltip(false)
    }, 2000)
  }

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <motion.div
      className="relative mx-[120px] mb-[32px] flex flex-row"
      initial={{ height: 'auto' }}
      animate={{ height: showDetails ? 'auto' : '248px' }}
      exit={{ height: '248px' }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <div className="flex w-[20%] rounded-l-[25px] bg-[#8E94E9] text-white">
        <div className="m-auto w-[70px] text-[40px] font-bold">
          {data.discount_amount}% OFF
        </div>
      </div>
      <div className="flex w-[80%] flex-col rounded-r-[25px] bg-white px-[40px]">
        <div className="flex w-full justify-between py-[64px]">
          <div>
            <div className="text-[24px] font-bold">
              Get {data.discount_amount}% off Shoes and Sandals
            </div>
            <div className="text-[14px]">*Terms & Conditions apply</div>
            <div className="mt-[48px] flex flex-row">
              <div
                className="mr-[5px] h-[24px] w-[24px] rounded-[24px] bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${data.user_image ? data.user_image : 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjanBvRjl3OXpJTXRUM3JBak9vcTNBQkRIOCJ9'})`,
                }}
              ></div>
              <div>
                by {data.user_username ? data.user_username : 'Unknown'}
              </div>
            </div>
          </div>
          <div className="my-auto flex h-auto cursor-pointer items-center gap-4">
            {/* This is the sharable link */}
            <button onClick={copyShareURL}>
              <CustomTooltip title="Copied!" showTooltip={showTooltip}>
                <ShareIcon />
              </CustomTooltip>
            </button>

            <div className="my-auto">
              <MessageIcon />
            </div>
            {data.terms_and_conditions ? (
              <button
                className="cursor-pointer"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <div>
                    <ChevronUpwardsIcon />
                  </div>
                ) : (
                  <div className="ml-1 flex w-[212px] justify-between rounded-[30px] bg-[#8E94E9] px-3 py-2 text-xl font-semibold text-white">
                    <span className="pl-5">More Details</span>
                    <ChevronDownwardsIcon />
                  </div>
                )}
              </button>
            ) : null}
          </div>
        </div>

        {/* Terms and Conditions block */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isAnimating ? null : <DiscountTermsAndConditions data={data} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
