'use client'

import { useContext, useState } from 'react'
import ChevronDownwardsIcon from './icons/ChevronDownwardsIcon'
import ShareIcon from './icons/ShareIcon'

import { DiscountDataDetail } from '@/app/types/types'
import ChevronUpwardsIcon from './icons/ChevronUpwardsIcon'
import DiscountTermsAndConditions from './DiscountTermsAndConditions'
import { AnimatePresence, motion } from 'framer-motion'
import useIntitialChatClient from '@/app/chat/useIntializeChatClient'
import { useAuth, useUser } from '@clerk/nextjs'
import CustomTooltip from '../tooltips/CustomTooltip'
import { Chat, LoadingIndicator, useChatContext } from 'stream-chat-react'
import { FWBChatContext } from '@/contexts/ChatContext'
import { useRouter } from 'next/navigation'
import { Event } from 'stream-chat'
import { MobileDetailCard } from './MobileDetailCard'
import bookmark from '../../../public/bookmark.svg'
import Image from 'next/image'

const MessageButton = (
  { data }: { data: DiscountDataDetail },
  { key }: { key: number }
) => {
  const { userId } = useAuth()
  const { client, channel, setActiveChannel } = useChatContext()
  const { setCustomActiveChannel } = useContext(FWBChatContext)
  const router = useRouter()

  // Should probably get renamed to be clearer since this has overlap with `setActiveChannel`
  async function handleActiveChannel(channelId: string) {
    let subscription: { unsubscribe: () => void } | undefined

    subscription = client.on('channels.queried', (event: Event) => {
      const loadedChannelData = event.queriedChannels?.channels.find(
        (response) => response.channel.id === channelId
      )

      if (loadedChannelData) {
        setCustomActiveChannel(channelId)
        subscription?.unsubscribe()
        return
      }
    })
  }

  // This function takes in the userId of the person you are starting a chat with and will create a chat with them.
  async function startChat(userId: string | null | undefined) {
    if (userId) {
      try {
        const channel = client.channel('messaging', {
          members: [userId, data.user_id],
        })
        const response = await channel.create()
        handleActiveChannel(response.channel.id) // essentially we're just adding this channel id to our context if our channel is successfully created.
        router.push('/chat')
      } catch (error) {
        console.error('Error creating channel')
        console.error(error)
      }
    }
  }

  return (
    <div>
      <div className="my-auto mr-[16px]">
        <button onClick={() => startChat(userId)}>
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
        </button>
      </div>
    </div>
  )
}

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
      className="relative mr-[120px] mb-[32px] flex flex-row w-full xs-max:flex-col xxs-max:flex-col xs-max:mb-0 xxs-max:mb-0"
      initial={{ height: 'auto' }}
      animate={{ height: showDetails ? 'auto' : '248px' }}
      exit={{ height: '248px' }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <div className="relative flex w-[20%] rounded-l-[25px] bg-[#8E94E9] text-white xs-max:rounded-t-md xs-max:rounded-l-none xs-max:w-full xxs-max:w-full xxs-max:rounded-t-md xxs-max:rounded-l-none xxs-max:w-full xxs-max:w-full xs-max:py-[28px] xxs-max:py-[28px] ">
        <Image src={bookmark} alt='bookmark icon' className='[@media(min-width:600px)]:hidden absolute top-0 left-[10px] max-w-none w-[50px]'></Image>
        <div className="m-auto w-[70px] text-[40px] font-bold xs-max:font-medium xxs-max:font-medium xs-max:text-[28px] xxs-max:text-[28px] xs-max:leading-[30px] xxs-max:leading-[30px]">
          {data.discount_amount}% OFF
        </div>
      </div>
      <div className="flex w-[80%] flex-col rounded-r-[25px] bg-white px-[40px] xs-max:rounded-tr-none xxs-max:rounded-tr-none xs-max:w-full xxs-max:w-full  xs-max:px-[12px] xxs-max:px-[12px]  xs-max:rounded-b-md  xxs-max:rounded-b-md">
        <div className="flex w-full justify-between py-[64px] xs-max:flex-col xxs-max:flex-col xs-max:py-[12px] xxs-max:py-[12px]">
          <div>
            <div className="text-[24px] font-bold xs-max:font-medium xxs-max:font-medium xs-max:text-[20px] xxs-max:text-[20px] [@media(max-width:338px)]:text-[14px]">
              Get {data.discount_amount}% off Shoes and Sandals
            </div>
            <div className="text-[14px] [@media(max-width:600px)]:hidden">*Terms & Conditions apply</div>
            <div className="mt-[48px] flex flex-row  xs-max:mt-[10px] xxs-max:mt-[10px]">
              <div
                className="mr-[5px] h-[24px] w-[24px] rounded-[24px] bg-contain bg-center bg-no-repeat xs-max:w-[20px] xxs-max:w-[20px] xs-max:h-[20px] xxs-max:h-[20px]"
                style={{
                  backgroundImage: `url(${data.user_image ? data.user_image : 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJjanBvRjl3OXpJTXRUM3JBak9vcTNBQkRIOCJ9'})`,
                }}
              ></div>
              <div className='xs-max:text-[14px] xxs-max:text-[12px] text-[#6B77AD]'>
                by {data.user_username ? data.user_username : 'Unknown'}
              </div>
            </div>
          </div>

          <div className="my-auto flex h-auto cursor-pointer items-center gap-4 xs-max:hidden xxs-max:hidden">
            <div className="my-auto">
              <Chat client={chatClient}>
                <MessageButton data={data} />
              </Chat>
            </div>

            {/* This is the sharable link */}
            <button onClick={copyShareURL}>
              <CustomTooltip title="Copied!" showTooltip={showTooltip}>
                <ShareIcon />
              </CustomTooltip>
            </button>

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
          <MobileDetailCard />
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
