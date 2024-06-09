'use client'

import useIntitialChatClient from '@/app/chat/useIntializeChatClient'
import { DiscountData, UserData } from '@/app/types/types'
import { useUser } from '@clerk/nextjs'
import { Button } from '@mui/base'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Chat, LoadingIndicator } from 'stream-chat-react'
import Bargains from './BargainsPicture'
import DiscountsSection from './DiscountsSection'
import MembersSection from './MembersSection'
import CreateDiscountCardMobile from './CreateDiscountCardMobile'

const Tabs = ({
  userData,
  discountData,
}: {
  userData: UserData[]
  discountData: DiscountData[]
}) => {
  const chatClient = useIntitialChatClient()
  const { user } = useUser()

  // Tab State
  const [showMembers, setShowMembers] = useState(false)

  const hasNoDiscounts = discountData.length === 0

  const showMemberTab = () => {
    setShowMembers(true)
  }
  const showDiscountsTab = () => {
    setShowMembers(false)
  }

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <div
      className="w-full bg-[#1a1a23] xs-max:px-[20px] xxs-max:px-[15px]"
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="my-10 flex items-center justify-evenly ">
        <div
          onClick={showDiscountsTab}
          className={`w-1/2 cursor-pointer border-b text-xl font-bold hover:border-white hover:text-white ${
            !showMembers
              ? `border-white text-white`
              : `border-gray-600 text-gray-600`
          }`}
        >
          <Box textAlign="center">
            <Button className="items-center pb-2 xxs-max:text-[15px] xs-max:text-[15px] xs-max:font-normal xxs-max:font-normal">Discounts Offers</Button>
          </Box>
        </div>
        <div
          onClick={showMemberTab}
          className={`w-1/2 cursor-pointer border-b text-xl font-bold hover:border-white hover:text-white ${
            showMembers
              ? `border-b border-white text-white`
              : `border-gray-600 text-gray-600`
          }`}
        >
          <Box textAlign="center">
            <Button className="items-center pb-2 xxs-max:text-[15px] xs-max:text-[15px] xs-max:font-normal xxs-max:font-normal">Members</Button>
          </Box>
        </div>
      </div>
      <div className="">{showMembers ? <></> : <Bargains />}</div>
      <div className="h-screen w-full">
        {showMembers ? (
          <Chat client={chatClient}>
            <MembersSection userData={userData} />
          </Chat>
        ) : hasNoDiscounts ? (
          <CreateDiscountCardMobile />
        ) : (
          <DiscountsSection discountData={discountData} />
        )}
      </div>
    </div>
  )
}

export default Tabs
