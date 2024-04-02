import ChannelDetails from '@/app/chat/ChannelDetails'
import ChatChannel from '@/app/chat/ChatChannel'
import ChatSideBar from '@/app/chat/ChatSidebar'
import { UserData } from '@/app/types/types'
import { FWBChatContext } from '@/contexts/ChatContext'
import { Group } from 'next/dist/shared/lib/router/utils/route-regex'
import React, { useContext } from 'react'

interface DesktopChatProps {
  userData: UserData
  groupData: Group[]
}
const DesktopChat = ({ userData, groupData }: DesktopChatProps) => {
  const { showChatDetails, activeTab } = useContext(FWBChatContext)
  const user = userData.users[0]

  return (
    <>
      <ChatSideBar
        channelData={activeTab === 'general' ? user : groupData[0]}
      />
      <ChatChannel />
      {showChatDetails ? <ChannelDetails /> : null}
    </>
  )
}

export default DesktopChat
