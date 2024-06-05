'use client'

import { useContext } from 'react'

import { Container } from '@mui/material'
import { Chat, LoadingIndicator } from 'stream-chat-react'
import { useMediaQuery } from 'react-responsive'

import ChatChannel from './ChatChannel'
import ChatSideBar from './ChatSidebar'
import ChannelDetails from './ChannelDetails'
import Navbar from '@/components/ui/navbar/Navbar'
import MobileChatNavigation from '@/components/ui/chat/mobile/MobileChatNavigation'
import MobileChatList from '@/components/ui/chat/mobile/MobileChatList'

import useIntitialChatClient from './useIntializeChatClient'
import { UserData, Group } from '@/app/types/types'
import { FWBChatContext } from '@/contexts/ChatContext'
import { useContextSelector } from 'use-context-selector'

interface ChatPageProps {
  userData: UserData
  groupData: Group[]
}

const ChatPage = ({ userData, groupData }: ChatPageProps) => {
  const chatClient = useIntitialChatClient()
  const showChatDetails = useContextSelector(
    FWBChatContext,
    (context) => context.showChatDetails
  )
  const activeTab = useContextSelector(
    FWBChatContext,
    (context) => context.activeTab
  )
  const user = userData.users[0]

  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1A1A23]">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <main className="h-full bg-[#1A1A23]">
      {isDesktop ? (
        <>
          <Container disableGutters maxWidth="lg"></Container>
          <div className="flex flex-col items-center overflow-y-hidden bg-[#1A1A23] pb-6 lg:pb-0">
            <Chat client={chatClient}>
              {/* The channel list shows only channels that the currently logged in user is a member (filters prop) */}
              <div className="flex w-full flex-row flex-wrap justify-center  gap-6 px-4 pt-2 lg:flex-nowrap">
                <ChatSideBar
                  channelData={activeTab === 'general' ? user : groupData[0]}
                />
                <ChatChannel />
                {showChatDetails ? <ChannelDetails user={user} /> : null}
              </div>
            </Chat>
          </div>
        </>
      ) : (
        <div className="flex flex-col px-[13px] text-white">
          <Chat client={chatClient}>
            {/* Mobile Navigation */}
            <MobileChatNavigation />

            {/* Chat lists */}
            <MobileChatList
              channelData={activeTab === 'general' ? user : groupData[0]}
            />
          </Chat>
        </div>
      )}
    </main>
  )
}

export default ChatPage
