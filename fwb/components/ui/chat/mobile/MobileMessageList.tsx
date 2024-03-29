import React from 'react'
import { Channel, MessageList, MessageInput } from 'stream-chat-react'

const MobileMessageList = () => {
  return (
    <Channel>
      <section className="flex flex-col">
        <MessageList />
        <div className="fixed bottom-0 w-full px-4">
          <MessageInput />
        </div>
      </section>
    </Channel>
  )
}

export default MobileMessageList
