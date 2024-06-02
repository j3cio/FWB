'use client'

import {
  ChannelList,
  useChatContext,
  Channel,
  DefaultStreamChatGenerics,
} from 'stream-chat-react'

import MobileMessageList from './MobileMessageList'

import { Group, User } from '@/app/types/types'
import { useContext, useEffect } from 'react'
import MobileTabsSelector from './MobileTabsSelector'
import { FWBChatContext } from '@/contexts/ChatContext'

interface MobileChatListProps {
  channelData: User | Group
}

const MobileChatList = ({ channelData }: MobileChatListProps) => {
  // Type guard function! Pretty cool way to type check our data for conditional rendering
  const isUser = (object: User | Group): object is User => 'user_id' in object
  const { client, channel, setActiveChannel } = useChatContext()
  const { customActiveChannel } = useContext(FWBChatContext)

  // Please note the `setActiveChannelOnMount` Prop as that's key to this approach
  useEffect(() => {
    customActiveChannel &&
      setActiveChannel(client.channel('messaging', customActiveChannel))
  }, [customActiveChannel, setActiveChannel, client])

  return (
    <div>
      {!channel ? (
        <>
          {/* Tabs */}
          {/* <MobileTabsSelector />  */}
          <ChannelList
            customActiveChannel="LEAVE_THIS_PROP_ALONE" // This prop allows us to set a default active channel. For now, we want this active channel to be invalid so that nothing stays selected by default on mobile, as this is pretty heavily what our mobile UX is based off of: We see our list of chats, we click one chat, and we "navigate" to said chat. However, due to that flow, we can't have any chats set to active by default, and using an empty string doesn't work
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
            setActiveChannelOnMount={customActiveChannel ? false : true}
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
        </>
      ) : (
        <MobileMessageList />
      )}
    </div>
  )
}

export default MobileChatList
