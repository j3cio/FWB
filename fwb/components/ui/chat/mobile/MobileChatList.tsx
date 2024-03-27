import { UserResource } from '@clerk/types'

import { ChannelList } from 'stream-chat-react'

interface MobileChatListProps {
  user: UserResource
}

const MobileChatList = ({ user }: MobileChatListProps) => {
  return (
    <div>
      <ChannelList
        filters={{ type: 'messaging', members: { $in: [user.id] } }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
      />
    </div>
  )
}

export default MobileChatList
