'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'
import { Box, Container } from '@mui/material'
import { useUser, auth, useAuth } from '@clerk/nextjs'
import { useMediaQuery } from 'react-responsive'

import MenuBar from './MenuBar'
import ChatChannel from './ChatChannel'
import ChatSideBar from './ChatSidebar'
import useIntitialChatClient from './useIntializeChatClient'

import Navbar from '@/components/ui/message/message_navbar'
import Third from '@/components/ui/message/Third'
import RightGroup from '@/components/ui/message/RightGroup'
import RightGeneral from '@/components/ui/message/RightGeneral'
import MobileChatNavigation from '@/components/ui/chat/mobile/MobileChatNavigation'
import MobileTabsSelector from '@/components/ui/chat/mobile/MobileTabsSelector'
import MobileChatList from '@/components/ui/chat/mobile/MobileChatList'

import { UserData, Group } from '@/app/types/types'

interface ChatPageProps {
  userData: UserData
  groupData: Group[]
}

const ChatPage = ({ userData, groupData }: ChatPageProps) => {
  const [companyQuery, setCompanyQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'groups'>('general')

  const router = useRouter()
  const chatClient = useIntitialChatClient()

  const user = userData.users[0]

  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      {isDesktop ? (
        <>
          <Container disableGutters maxWidth="lg">
            <Navbar
              handleSearch={handleSearch}
              companyQuery={companyQuery}
              setCompanyQuery={setCompanyQuery}
            />
          </Container>
          <div className="flex flex-col items-center">
            <Chat client={chatClient}>
              {/* <Chat theme={"str-chat__theme-dark"} client={chatClient}> */}
              {/* The channel list shows only channels that the currently logged in user is a member (filters prop) */}
              <div className="2xl:flex-nowrap flex w-full flex-row flex-wrap justify-center gap-6 pt-2">
                <ChatSideBar
                  channelData={activeTab === 'general' ? user : groupData[0]}
                />
                <ChatChannel />
              </div>
              {/* <Third name={tab === "general" ? "Name" : "GroupName"}>
      {tab === "general" ? <RightGeneral /> : <RightGroup />}
    </Third> */}
            </Chat>
          </div>
        </>
      ) : (
        <div className="flex flex-col px-[13px] text-white">
          {/* Mobile Nav bar thingy */}
          <Chat client={chatClient}>
            <MobileChatNavigation />
            {/* Tabs */}
            <MobileTabsSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {/* Chat lists */}
            {/* swap out user with groups when we get toggle to work */}
            <MobileChatList
              channelData={activeTab === 'general' ? user : groupData[0]}
            />
            {/* Group/Contact Chat Details */}
          </Chat>
        </div>
      )}
    </Box>
  )
}

export default ChatPage
