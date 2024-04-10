import { ChannelList } from 'stream-chat-react'

import DesktopTabsSelector from '@/components/ui/chat/desktop/DesktopTabsSelector'
import DesktopChannelListTopBar from '@/components/ui/chat/desktop/DesktopChannelListTopBar'

import { Group, User } from '@/app/types/types'
interface ChatSidebarProps {
  channelData: User | Group
}

export default function ChatSideBar({ channelData }: ChatSidebarProps) {
  // See MobileChatList for more details on this function
  const isUser = (object: User | Group): object is User => 'user_id' in object
  // const { client, channel, setActiveChannel } = useChatContext()

  return (
    <section className="flex max-h-[500px] min-h-[300px] w-full flex-col rounded-lg bg-[#313139] px-4 text-white md:w-[717px] lg:h-[771px] lg:max-h-[771px] lg:w-[432px]">
      <DesktopChannelListTopBar />
      <DesktopTabsSelector />

      <div className="pt-4">
        <ChannelList
          filters={{
            type: 'messaging',
            members: {
              $in: [
                // Currently this should make both channels be the exact same since I don't think we have group chat functionality sorted yet/ group channels figured out. Either way, this now works with our tab swap.

                isUser(channelData)
                  ? channelData.user_id
                  : channelData.users[0],
                // channelData.id,
              ],
            },
          }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
          showChannelSearch
          additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
              channelFilters: {
                filters: { members: { $in: [channelData.id] } },
              },
            },
          }}
        />
      </div>
    </section>
  )
}
