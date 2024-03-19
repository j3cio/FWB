'use client'
import Navbar from '@/components/ui/message/Navbar'

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
import { Container } from '@mui/material'
//random

export default function ChatPage() {
  const chatClient = useIntitialChatClient()
  const { user } = useUser()
  const [tab, setTab] = useState<'general' | 'groups'>('general')
  if (!chatClient || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    // <div className="w-8/12 h-screen mr-20">

    <div
      style={{
        background: '#1A1A23',
        paddingBottom: '80px',
        minHeight: '100dvh',
      }}
    >
      <Navbar />
      <div className="flex flex-col items-center">
        <Chat client={chatClient}>
          {/* <Chat theme={"str-chat__theme-dark"} client={chatClient}> */}
          {/* The channel list shows only channels that the currently loggeed in user is a member (filters prop) */}
          <div
            className="flex flex-row justify-center w-full px-14 h-full gap-6"
            style={{ marginTop: '40px' }}
          >
            <ChatSideBar user={user} />
            <ChatChannel />
          </div>
          {/* <Third name={tab === "general" ? "Name" : "GroupName"}>
    {tab === "general" ? <RightGeneral /> : <RightGroup />}
  </Third> */}
        </Chat>
      </div>
    </div>
  )
}
