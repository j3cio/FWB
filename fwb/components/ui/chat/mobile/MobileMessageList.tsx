import React from 'react'
import { MessageList, MessageInput, Channel } from 'stream-chat-react'

const MobileMessageList = () => {
  return (
    <Channel>
      <section className="flex flex-col">
        {/* setting loadingMore to false gets rid of the loading indicator */}
        <MessageList loadingMore={false} />

        <div className="fixed bottom-0 left-0 h-[50px] w-full">
          <MessageInput />
        </div>
      </section>
    </Channel>
  )
}

export default MobileMessageList
