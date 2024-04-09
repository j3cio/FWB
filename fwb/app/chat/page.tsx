'use client'

import { useCallback, useContext, useEffect, useState } from 'react'

import Navbar from '@/components/ui/navbar/Navbar'

import './page.css'
import { useAuth, useUser } from '@clerk/nextjs'
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
import RightGroup from '@/components/ui/message/RightGroup'
import RightGeneral from '@/components/ui/message/RightGeneral'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'

export default function ChatPage() {
  const [tab, setTab] = useState<'general' | 'groups'>('general')

  const { getToken } = useAuth()
  const router = useRouter()
  const chatClient = useIntitialChatClient()
  const { user } = useUser()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    searchResults,
    setSearchResults,
  } = useContext(SearchContext)

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

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
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    )
  }
  return (
    // <div className="w-8/12 h-screen mr-20">
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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
