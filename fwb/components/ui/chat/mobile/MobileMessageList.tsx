import React from 'react'
import { Channel, MessageList, MessageInput } from 'stream-chat-react'

const MobileMessageList = () => {
  return (
    <Channel>
      <MessageList />
      <MessageInput />
    </Channel>
  )
}

export default MobileMessageList
