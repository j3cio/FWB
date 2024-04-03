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
import CreateDiscountCard from '../../addbenefit/CreateDiscountCard'

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
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <div
      className="w-full bg-[#1a1a23]"
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="flex justify-evenly items-center my-10 ">
        <div
          className={`w-1/2 hover:text-white border-b hover:border-white font-bold text-xl ${
            !showMembers
              ? `text-white border-white`
              : `text-gray-600 border-gray-600`
          }`}
        >
          <Box textAlign="center">
            <Button onClick={showDiscountsTab} className="pb-2 items-center">
              Discounts Offers
            </Button>
          </Box>
        </div>
        <div
          className={`w-1/2 hover:text-white border-b hover:border-white font-bold text-xl ${
            showMembers ? `text-white border-b border-white` : `text-gray-600 border-gray-600`
          }`}
        >
          <Box textAlign="center">
            <Button className="pb-2 items-center" onClick={showMemberTab}>Members</Button>
          </Box>
        </div>
      </div>
      <div className="">{showMembers ? <></> : <Bargains />}</div>
      <div className="w-full h-screen">
        {showMembers ? (
          <Chat client={chatClient}>
            <MembersSection userData={userData} />
          </Chat>
        ) : hasNoDiscounts ? (
          <CreateDiscountCard />
        ) : (
          <DiscountsSection discountData={discountData} />
        )}
      </div>
    </div>
  )
}

export default Tabs
