'use client'

import { useState } from 'react'
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
import { useUser } from '@clerk/nextjs'
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

import './page.css'

//random

export default function ChatPage() {
  const [companyQuery, setCompanyQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'general' | 'groups'>('general')

  const router = useRouter()
  const chatClient = useIntitialChatClient()
  const { user } = useUser()
  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  if (!chatClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  const handleSearch = (companyQuery: any) => {
    const url = `/explore?company=${companyQuery}`
    router.push(url)
  }

  return (
    // <div className="w-8/12 h-screen mr-20">
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      {isDesktop ? (
        <Container disableGutters maxWidth="lg">
          <Navbar
            handleSearch={handleSearch}
            companyQuery={companyQuery}
            setCompanyQuery={setCompanyQuery}
          />
          <div className="flex flex-col items-center">
            <Chat client={chatClient}>
              {/* <Chat theme={"str-chat__theme-dark"} client={chatClient}> */}
              {/* The channel list shows only channels that the currently loggeed in user is a member (filters prop) */}
              <div className="flex flex-row justify-center w-full pt-2 px-14 gap-6">
                <ChatSideBar user={user} />
                <ChatChannel />
              </div>
              {/* <Third name={tab === "general" ? "Name" : "GroupName"}>
      {tab === "general" ? <RightGeneral /> : <RightGroup />}
    </Third> */}
            </Chat>
          </div>
        </Container>
      ) : (
        <div className="flex flex-col text-white px-[13px]">
          {/* Mobile Nav bar thingy */}
          <MobileChatNavigation />
          {/* Tabs */}
          <MobileTabsSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Chat lists */}
          <Chat client={chatClient}>
            <MobileChatList user={user} />
            {/* Group/Contact Chat Details */}
          </Chat>
        </div>
      )}
    </Box>
  )
}
