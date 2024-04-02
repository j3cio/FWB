// import { UserResource } from '@clerk/types'
import { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import { Group, User } from '@/app/types/types'
import AddFriendsIcon from '@/components/ui/chat/icons/AddFriendsIcon'
import EditIcon from '@/components/ui/chat/icons/EditIcon'

interface ChatSidebarProps {
  channelData: User | Group
}

export default function ChatSideBar({ channelData }: ChatSidebarProps) {
  const [tab, setTab] = useState<'general' | 'groups'>('general')

  // See MobileChatList for more details on this function
  const isUser = (object: User | Group): object is User => 'user_id' in object
  // const { client, channel, setActiveChannel } = useChatContext()

  return (
    <div className="md:w-full mx-auto justify-center xxl:max-w-[432px] xl:w-[432px] xl:max-w-[432px] lg:w-full lg:max-w-full sm:w-full xs:w-full">
      {/* <MenuBar/> */}
      <div className="flex w-full flex-row justify-center xl:max-w-[432px] lg:max-w-full lg:justify-center">
        <div
          className="backdrop-blur-12.5 flex flex-row justify-center bg-white bg-opacity-10 shadow-xl"
          style={{ width: '0px', borderRadius: '10px' }}
        >
          <div className="backdrop-blur-12.5 flex max-h-[771px] w-[95vw] max-w-[95vw] flex-shrink-0  flex-col items-center justify-start gap-32 overflow-y-auto rounded-lg bg-white bg-opacity-10 pb-6 pl-3 pr-3 pt-6 shadow-xl xxl:w-[432px] xl:w-[432px] lg:w-full lg:max-w-full">
            <div
              className="flex flex-row justify-between"
              style={{ width: '400px', height: '26px' }}
            >
              <div className="text-white" style={{ fontSize: '24px' }}>
                Messages
              </div>
              <div className="flex flex-row items-center gap-3">
                <AddFriendsIcon />
                <EditIcon />
              </div>
            </div>
            <div
              className="-mt-24 flex flex-row justify-between"
              style={{ width: '400px', height: '26px' }}
            >
              <div
                className="border-b-1 font-Urbanist text-16 leading-125 border-white text-center font-semibold text-white"
                style={{
                  width: '200px',
                  height: '26px',
                  borderBottom: '1px solid white',
                  cursor: 'pointer',
                }}
                onClick={() => setTab('general')}
              >
                General
              </div>
              <div
                className="border-b-1 font-Urbanist text-16 leading-125 border-white text-center font-semibold text-white "
                style={{ width: '200px', height: '26px', cursor: 'pointer' }}
                onClick={() => setTab('groups')}
              >
                Groups
              </div>
            </div>
            <div
              className="w-full lg:w-[400px] "
              style={{ marginTop: '-100px', height: '771px' }}
            >
              <ChannelList
                customActiveChannel="LEAVE_THIS_PROP_ALONE" // This prop allows us to set a default active channel. For now, we want this active channel to be invalid so that nothing stays selected by default on mobile, as this is pretty heavily what our mobile UX is based off of: We see our list of chats, we click one chat, and we "navigate" to said chat. However, due to that flow, we can't have any chats set to active by default, anjd using an empty string doesn't work
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
            {/* <Third name={tab === "general" ? "Name" : "GroupName"}>
          {tab === "general" ? <RightGeneral /> : <RightGroup />}
        </Third> */}
          </div>
        </div>
      </div>
    </div>
  )
}
