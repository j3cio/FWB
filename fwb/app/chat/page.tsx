'use client'
import Navbar from '@/components/ui/message/message_navbar'

import './page.css'
import { useUser } from '@clerk/nextjs'
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
import ChatChannel from './ChatChannel'
import ChatSideBar from './ChatSidebar'
import MenuBar from './MenuBar'
import useIntitialChatClient from './useIntializeChatClient'
import Third from '@/components/ui/message/Third'
import { useState } from 'react'
import RightGroup from '@/components/ui/message/RightGroup'
import RightGeneral from '@/components/ui/message/RightGeneral'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/navigation'

//random

export default function ChatPage() {
  const [companyQuery, setCompanyQuery] = useState('')
  const [tab, setTab] = useState<'general' | 'groups'>('general')

  const router = useRouter()
  const chatClient = useIntitialChatClient()
  const { user } = useUser()

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
    </Box>
  )
}
