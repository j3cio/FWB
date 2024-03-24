import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'
import avatar from '@/components/ui/message/icons/avatar.svg'
import Image from '@/node_modules/next/image'

export default function ChatChannel() {
  return (
    <div
      className="w-full rounded-lg bg-opacity-10 bg-white "
      style={{ height: '771px' }}
    >
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  )
}
