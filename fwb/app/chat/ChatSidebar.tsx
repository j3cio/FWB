import { ChannelList, useChatContext } from 'stream-chat-react'

import DesktopTabsSelector from '@/components/ui/chat/desktop/DesktopTabsSelector'
import DesktopChannelListTopBar from '@/components/ui/chat/desktop/DesktopChannelListTopBar'

import { Group, User } from '@/app/types/types'
import { useContext, useEffect, useState } from 'react'
import { FWBChatContext } from '@/contexts/ChatContext'
interface ChatSidebarProps {
  channelData: User | Group
}

export default function ChatSideBar({ channelData }: ChatSidebarProps) {
  // See MobileChatList for more details on this function
  const isUser = (object: User | Group): object is User => 'user_id' in object
  const { customActiveChannel } = useContext(FWBChatContext)
  const { client, setActiveChannel } = useChatContext()

  // Please note the `setActiveChannelOnMount` Prop as that's key to this approach
  useEffect(() => {
    setActiveChannel(client.channel('messaging', customActiveChannel))
  }, [customActiveChannel, setActiveChannel, client])

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
          // sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
          setActiveChannelOnMount={customActiveChannel ? false : true}
          showChannelSearch
          additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
              channelFilters: {
                filters: { members: { $in: [channelData.id] } },
              },
            },
          }}
          EmptyStateIndicator={() => (
            <div className="str-chat__channel-list-empty">
              <svg fill="none" height="96" viewBox="0 0 136 136" width="96" xmlns="http://www.w3.org/2000/svg">
                <path d="M106 24.5H30C24.775 24.5 20.5 28.775 20.5 34V119.5L39.5 100.5H106C111.225 100.5 115.5 96.225 115.5 91V34C115.5 28.775 111.225 24.5 106 24.5ZM106 91H39.5L30 100.5V34H106V91Z" fill="#B4B7BB"></path>
              </svg>
              <p role="listitem">You have no chats</p>
            </div>
          )}
        />
      </div>
    </section>
  )
}
