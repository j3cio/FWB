'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Chat, LoadingIndicator } from 'stream-chat-react'
import { useMediaQuery } from 'react-responsive'
import { Container } from '@mui/material'
import { useAuth } from '@clerk/nextjs'

import ChatChannel from './ChatChannel'
import ChatSideBar from './ChatSidebar'
import ChannelDetails from './ChannelDetails'
import Navbar from '@/components/ui/message/message_navbar'
import MobileChatNavigation from '@/components/ui/chat/mobile/MobileChatNavigation'
import MobileTabsSelector from '@/components/ui/chat/mobile/MobileTabsSelector'
import MobileChatList from '@/components/ui/chat/mobile/MobileChatList'

import useIntitialChatClient from './useIntializeChatClient'

import { FWBChatContext } from '@/contexts/ChatContext'
import { SearchContext } from '@/contexts/SearchContext'

import { UserData, Group } from '@/app/types/types'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'

interface ChatPageProps {
  userData: UserData
  groupData: Group[]
}

const ChatPage = ({ userData, groupData }: ChatPageProps) => {
  const [companyQuery, setCompanyQuery] = useState('')

  const router = useRouter()
  const chatClient = useIntitialChatClient()
  const { showChatDetails, activeTab } = useContext(FWBChatContext)

  const user = userData.users[0]

  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  const { getToken } = useAuth()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    setSearchResults,
  } = useContext(SearchContext)

  const handleSearch = async () => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })

      setSearchResults(results)
      router.push('/explore')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSearchIndex = useCallback(async () => {
    try {
      const bearerToken = await getToken()

      if (bearerToken) {
        const companiesIndex = await getSearchIndex({
          bearer_token: bearerToken,
        })
        setSearchIndex(companiesIndex)
      }
    } catch (error) {
      console.error(error)
    }
  }, [getToken, setSearchIndex])

  useEffect(() => {
    fetchSearchIndex()
  }, [fetchSearchIndex])

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }

  return (
    <main className="h-full bg-[#1A1A23]">
      {isDesktop ? (
        <>
          <Container disableGutters maxWidth="lg">
            <Navbar
              handleSearch={handleSearch}
              companyQuery={searchQuery}
              setCompanyQuery={setSearchQuery}
            />
          </Container>
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

            {/* Tabs */}
            <MobileTabsSelector />

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
