import { User } from '@/app/types/types'
import { ChannelList } from 'stream-chat-react'

interface MobileChatListProps {
  channelData: User
}

const MobileChatList = ({ channelData }: MobileChatListProps) => {
  return (
    <div>
      <ChannelList
        filters={{ type: 'messaging', members: { $in: [channelData.id] } }}
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
  )
}

export default MobileChatList
