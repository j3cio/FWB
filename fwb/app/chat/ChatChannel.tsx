import { Channel, MessageInput, MessageList, Thread } from 'stream-chat-react'

import DesktopMessageListTopBar from '@/components/ui/chat/desktop/DesktopMessageListTopBar'

export default function ChatChannel() {
  return (
    <section className="w-full rounded-lg bg-[#313139] px-4 text-white md:w-[717px] lg:h-[771px] lg:max-h-[771px]">
      <DesktopMessageListTopBar />
      <Channel>
        {/* used section instead of window so that our loading skeletons don't overlap with our topBar. This approach was chosen since setting topBar to fixed also caused some oddities so this was the simplest solution  */}
        <section className="flex h-full max-h-[500px] w-full flex-col md:max-h-[630px]">
          <MessageList loadingMore={false} />
          <MessageInput />
        </section>
        <Thread />
      </Channel>
    </section>
  )
}
