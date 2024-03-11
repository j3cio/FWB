import MenuBar from './MenuBar'
import { ChannelList } from 'stream-chat-react'
import { UserResource } from '@clerk/types'
import { useState } from 'react'
import Third from '@/components/ui/message/Third'
import RightGroup from '@/components/ui/message/RightGroup'
import RightGeneral from '@/components/ui/message/RightGeneral'
import FirstRight from '@/components/ui/message/FirstRight'
import GeneralBigChat from '@/components/ui/message/GeneralBigChat'
interface ChatSidebarProps {
    user: UserResource
}

export default function ChatSideBar({ user }: ChatSidebarProps) {
    const [tab, setTab] = useState<'general' | 'groups'>('general')
    return (
        <div className="w-full max-w-[432px]" style={{ width: '425px' }}>
            {/* <MenuBar/> */}
            <div
                className="flex flex-row ml-14 bg-opacity-10 bg-white shadow-xl backdrop-blur-12.5"
                style={{ width: '0px', borderRadius: '10px' }}
            >
                <div className="flex flex-col max-h-[771px] rounded-lg overflow-y-auto items-center gap-32 pt-6 mr-7 pl-3 pr-3 pb-6 flex-shrink-0 bg-opacity-10 bg-white backdrop-blur-12.5 shadow-xl justify-start">
                    <div
                        className="flex flex-row justify-between"
                        style={{ width: '400px', height: '26px' }}
                    >
                        <div
                            className="text-white"
                            style={{ fontSize: '24px' }}
                        >
                            Messages
                        </div>
                        <div className="flex flex-row">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ marginRight: '16px' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18 11.5C19.66 11.5 20.99 10.16 20.99 8.5C20.99 6.84 19.66 5.5 18 5.5C17.68 5.5 17.37 5.55 17.09 5.64C17.66 6.45 17.99 7.43 17.99 8.5C17.99 9.57 17.65 10.54 17.09 11.36C17.37 11.45 17.68 11.5 18 11.5ZM7 10.5H5V8.5C5 7.95 4.55 7.5 4 7.5C3.45 7.5 3 7.95 3 8.5V10.5H1C0.45 10.5 0 10.95 0 11.5C0 12.05 0.45 12.5 1 12.5H3V14.5C3 15.05 3.45 15.5 4 15.5C4.55 15.5 5 15.05 5 14.5V12.5H7C7.55 12.5 8 12.05 8 11.5C8 10.95 7.55 10.5 7 10.5ZM15.99 8.5C15.99 10.16 14.66 11.5 13 11.5C11.34 11.5 10 10.16 10 8.5C10 6.84 11.34 5.5 13 5.5C14.66 5.5 15.99 6.84 15.99 8.5ZM13 13.5C11 13.5 7 14.5 7 16.5V17.5C7 18.05 7.45 18.5 8 18.5H18C18.55 18.5 19 18.05 19 17.5V16.5C19 14.5 15 13.5 13 13.5ZM21 16.5C21 15.32 20.45 14.39 19.62 13.66C21.63 14.01 24 14.96 24 16.5V18C24 18.28 23.78 18.5 23.5 18.5H20.95C20.98 18.34 21 18.17 21 18V16.5Z"
                                    fill="#F6FF82"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M15.4964 4.1665C14.9652 4.1665 14.4557 4.37753 14.0801 4.75315L5.11021 13.723L4.16602 17.4998L7.94281 16.5556L16.9127 7.58575C17.2883 7.21012 17.4993 6.70067 17.4993 6.16945C17.4993 5.63824 17.2883 5.12878 16.9127 4.75315C16.5371 4.37753 16.0276 4.1665 15.4964 4.1665Z"
                                    fill="#F6FF82"
                                    stroke="#F6FF82"
                                    stroke-width="1.66667"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex flex-row justify-between -mt-24"
                        style={{ width: '400px', height: '26px' }}
                    >
                        <div
                            className="font-semibold text-center text-white border-white border-b-1 font-Urbanist text-16 leading-125"
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
                            className="font-semibold text-center text-white border-white border-b-1 font-Urbanist text-16 leading-125 "
                            style={{
                                width: '200px',
                                height: '26px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setTab('groups')}
                        >
                            Groups
                        </div>
                    </div>
                    <div
                        style={{
                            width: '400px',
                            marginTop: '-100px',
                            height: '771px',
                        }}
                    >
                        <ChannelList
                            filters={{
                                type: 'messaging',
                                members: { $in: [user.id] },
                            }}
                            sort={{ last_message_at: -1 }}
                            options={{ state: true, presence: true, limit: 10 }}
                            showChannelSearch
                            additionalChannelSearchProps={{
                                searchForChannels: true,
                                searchQueryParams: {
                                    channelFilters: {
                                        filters: {
                                            memebers: { $in: [user.id] },
                                        },
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
    )
}
