import React from 'react'
import {
  MessageList,
  MessageInput,
  Channel,
  Window,
  ChannelHeader,
} from 'stream-chat-react'

const MobileMessageList = () => {
  return (
    <Channel>
      <Window>
        {/* setting loadingMore to false gets rid of the loading indicator */}
        <MessageList loadingMore={false} />

        <div className="fixed bottom-0 left-0 h-[50px] w-full bg-[#1a1a23]">
          <MessageInput />
        </div>
      </Window>
    </Channel>
  )
}

export default MobileMessageList
