'use client'
import Navbar from '@/components/ui/message/Navbar'
import avatar from '@/components/ui/message/icons/avatar.svg'
import Image from 'next/image'
import { useState } from 'react'
import Third from '@/components/ui/message/Third'
import RightGroup from '@/components/ui/message/RightGroup'
import RightGeneral from '@/components/ui/message/RightGeneral'
import FirstRight from '@/components/ui/message/FirstRight'
import GeneralBigChat from '@/components/ui/message/GeneralBigChat'

const messages = [
    {
        id: 1,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Rachel',
        createdAt: '10:05AM',
        active: true,
        notifications: 0,
    },

    {
        id: 2,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Jeremy',
        createdAt: '10:05AM',
        active: false,
        notifications: 2,
    },
    {
        id: 3,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Derick',
        createdAt: '10:05AM',
        active: false,
        notifications: 6,
    },
    {
        id: 4,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Jason',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
    {
        id: 5,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Daniel',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
    {
        id: 6,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Kevin',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
    {
        id: 7,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Charlen',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
    {
        id: 8,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'John',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
    {
        id: 9,
        content: 'Lorem ipusm dolar sit amet consectetuer. Lorem ...',
        userName: 'Chazz',
        createdAt: '10:05AM',
        active: false,
        notifications: 0,
    },
]

function Page() {
    const [tab, setTab] = useState<'general' | 'groups'>('general')

    return (
        <div className="h-full bg-black">
            <Navbar></Navbar>
            <div className="flex flex-row ml-14 rounded-10 bg-opacity-10 bg-white shadow-xl backdrop-blur-12.5">
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
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
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

                    {/* search bar */}
                    <div
                        className="flex w-full h-8 py-1 pl-4 pr-1 bg-white rounded-2xl"
                        style={{ marginTop: '-110px' }}
                    >
                        <input
                            type="text"
                            className="w-full text-xs bg-white outline-none "
                            placeholder="Search..."
                        />
                        <span className="flex items-center justify-center w-6 h-6 p-1.5 rounded-full bg-neutral-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.59359 7.9018H7.98859L10.1086 10.0318C10.3136 10.2368 10.3136 10.5718 10.1086 10.7768C9.90359 10.9818 9.56859 10.9818 9.36359 10.7768L7.23859 8.6518V8.2568L7.10359 8.1168C6.40359 8.7168 5.44859 9.0268 4.43359 8.8568C3.04359 8.6218 1.93359 7.4618 1.76359 6.0618C1.50359 3.9468 3.28359 2.1668 5.39859 2.4268C6.79859 2.5968 7.95859 3.7068 8.19359 5.0968C8.36359 6.1118 8.05359 7.0668 7.45359 7.7668L7.59359 7.9018ZM2.73859 5.6518C2.73859 6.8968 3.74359 7.9018 4.98859 7.9018C6.23359 7.9018 7.23859 6.8968 7.23859 5.6518C7.23859 4.4068 6.23359 3.4018 4.98859 3.4018C3.74359 3.4018 2.73859 4.4068 2.73859 5.6518Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                    </div>

                    <div className="w-full" style={{ marginTop: '-110px' }}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex flex-row pt-3 pl-3 pr-3 mb-3"
                                style={{
                                    background: message.active
                                        ? '#8e94e9'
                                        : 'inherit',
                                    width: '400px',
                                    height: '80px',
                                    borderRadius: '10px',
                                }}
                            >
                                <div className="text-white">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 48 48"
                                            fill="none"
                                        >
                                            <circle
                                                cx="24"
                                                cy="24"
                                                r="24"
                                                fill="#DAE3EA"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '-38px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="28"
                                            height="28"
                                            viewBox="0 0 28 28"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M18.5717 9.42861C18.5717 11.9543 16.526 14 14.0003 14C11.4746 14 9.42885 11.9543 9.42885 9.42861C9.42885 6.90289 11.4746 4.85718 14.0003 4.85718C16.526 4.85718 18.5717 6.90289 18.5717 9.42861ZM4.85742 20.8572C4.85742 17.8172 10.9489 16.2857 14.0003 16.2857C17.0517 16.2857 23.1431 17.8172 23.1431 20.8572V22C23.1431 22.6286 22.6288 23.1429 22.0003 23.1429H6.00028C5.37171 23.1429 4.85742 22.6286 4.85742 22V20.8572Z"
                                                fill="#94A3B1"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="flex flex-row justify-between ml-4"
                                        style={{ width: '316px' }}
                                    >
                                        <div className="font-semibold text-white font-Urbanist">
                                            {message.userName}
                                        </div>
                                        <div
                                            className="font-normal text-white opacity-50 font-Urbanist"
                                            style={{ fontSize: '12px' }}
                                        >
                                            10:05AM
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div
                                            className="flex-1 ml-4 text-white h-18"
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontSize: '12px',
                                                fontFamily: 'Urbanist',
                                                fontWeight: 400,
                                                lineHeight: '150%',
                                                opacity: 0.5,
                                                width: '316px',
                                            }}
                                        >
                                            Lorem ipusm dolar sit amet
                                            consectetuer. Lorem ...
                                        </div>
                                        {message.notifications ? (
                                            <div
                                                className="p-0.5 flex justify-center items-center"
                                                style={{
                                                    background: '#F6FF82',
                                                    borderRadius: '100px',
                                                    width: '15px',
                                                    height: '15px',
                                                    color: 'var(--Purple-300, #8E94E9)',
                                                    textAlign: 'center',
                                                    fontFamily: 'Urbanist',
                                                    fontSize: '10px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 500,
                                                    lineHeight: '150%',
                                                    marginLeft: '-20px',
                                                }}
                                            >
                                                {message.notifications}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* right side of chat */}
                {/* <FirstRight></FirstRight> */}

                {/* 2nd chat page */}
                <div
                    className="h-full w-full flex flex-col pt-6 pl-3 pr-3 pb-6 bg-opacity-10 mr-8 bg-white backdrop-blur-12.5 shadow-xl justify-start"
                    style={{
                        height: '770px',
                        width: '546px',

                        borderRadius: '10px',
                    }}
                >
                    <div
                        className="flex justify-between items-center font-urbanist font-semibold text-lg leading-125% text-white w-full bottom-border pb-4"
                        style={{ borderBottom: '1px solid #94A3B1' }}
                    >
                        <div className="flex">
                            <div>
                                <Image
                                    src={avatar}
                                    alt="avatar Icon"
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </div>

                            <div className="flex items-center ml-3 font-urbanist font-semibold text-base leading-125%">
                                General
                            </div>
                        </div>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 7V9H13V7H11ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="text-white w-full h-full ">
                        <div
                            className="flex items-center mt-4 justify-center font-urbanist font-medium text-xs leading-150%"
                            style={{ fontFamily: 'Urbanist' }}
                        >
                            November 08 2023
                        </div>
                        <div className="flex flex-row justify-end">
                            <div
                                className="flex flex-col items-end text-neutral-000 opacity-50"
                                style={{
                                    fontSize: '10px',
                                    fontFamily: 'Urbanist',
                                }}
                            >
                                <div>Read</div>
                                <div
                                    style={{
                                        fontSize: '10px',
                                        fontFamily: 'Urbanist',
                                    }}
                                >
                                    10:05AM
                                </div>
                            </div>
                            <div
                                className="pt-2 pb-2 pr-4 pl-4 ml-1"
                                style={{
                                    background: '#8E94E9',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontFamily: 'Urbanist',
                                }}
                            >
                                Hellooo
                            </div>
                        </div>
                        <div className="flex flex-row justify-start">
                            <div>
                                <Image
                                    src={avatar}
                                    alt="avatar Icon"
                                    style={{ width: '34px', height: '34px' }}
                                />
                            </div>
                            <div
                                className="ml-2 pl-4 pr-4 pt-2"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.30)',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontFamily: 'Urbanist',
                                }}
                            >
                                Hey.Whats up??
                            </div>{' '}
                        </div>
                    </div>
                    <div
                        className="flex w-full h-1 top-border pb-4 pt-4 justify-between"
                        style={{ borderTop: '1px solid #94A3B1' }}
                    >
                        <div className="flex">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM17 9.5C17 10.33 16.33 11 15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5ZM8.5 11C9.33 11 10 10.33 10 9.5C10 8.67 9.33 8 8.5 8C7.67 8 7 8.67 7 9.5C7 10.33 7.67 11 8.5 11ZM16.75 14.75C15.8 16.39 14.03 17.5 12 17.5C9.97 17.5 8.2 16.39 7.25 14.75C7.06 14.42 7.31 14 7.69 14H16.31C16.7 14 16.94 14.42 16.75 14.75Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Write Messages..."
                                    className="outline-none ml-4 text-xs font-normal leading-6 opacity-50"
                                    style={{ font: 'Urbanist' }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between ">
                            <div className="pr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM11 16.51L8.9 13.98C8.69 13.73 8.31 13.74 8.12 14L5.63 17.2C5.37 17.53 5.6 18.01 6.02 18.01H18.01C18.42 18.01 18.66 17.54 18.41 17.21L14.9 12.53C14.7 12.26 14.3 12.26 14.1 12.52L11 16.51Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div className="pr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M18.5428 11.1144L11.0616 18.5956C9.58377 20.0734 7.18667 20.3068 5.57447 18.9774C3.72892 17.4571 3.62993 14.7136 5.28456 13.0589L14.0244 4.31909C14.9507 3.39278 16.4568 3.216 17.468 4.04332C18.6347 4.99791 18.6984 6.71618 17.6589 7.75563L10.2343 15.1803C9.8454 15.5692 9.209 15.5692 8.82009 15.1803C8.43118 14.7913 8.43118 14.1549 8.82009 13.766L15.0073 7.57885C15.2972 7.28894 15.2972 6.80811 15.0073 6.51819C14.7174 6.22828 14.2365 6.22828 13.9466 6.51819L7.85843 12.6064C6.93212 13.5327 6.75534 15.0388 7.58265 16.05C8.53725 17.2167 10.2555 17.2804 11.295 16.2409L18.5994 8.9365C20.0772 7.45865 20.3106 5.06155 18.9812 3.44935C17.4539 1.59673 14.7174 1.50481 13.0627 3.15944L4.38653 11.8356C2.35713 13.865 2.02479 17.1672 3.8562 19.3805C5.97045 21.919 9.72519 22.0533 12.0021 19.7764L19.6035 12.175C19.8934 11.8851 19.8934 11.4043 19.6035 11.1144C19.3136 10.8245 18.8327 10.8245 18.5428 11.1144Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M20.4115 13.8351C21.562 13.2956 21.562 11.658 20.4108 11.1191L6.34859 4.52679C5.19389 3.98585 3.93453 5.04015 4.26263 6.27193L5.65068 11.4769L11.538 11.4769C11.8002 11.4815 12.0501 11.5888 12.2339 11.7759C12.4177 11.9629 12.5207 12.2146 12.5207 12.4768C12.5207 12.739 12.4177 12.9907 12.2339 13.1777C12.0501 13.3647 11.8002 13.4721 11.538 13.4766H5.65068L4.26334 18.6824C3.93453 19.9134 5.19459 20.967 6.34859 20.4268L20.4115 13.8351Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <Third name={tab === 'general' ? 'Name' : 'GroupName'}>
                    {tab === 'general' ? <RightGeneral /> : <RightGroup />}
                </Third>

                {/* right side of Bigchat */}
                {/* <GeneralBigChat></GeneralBigChat> */}
            </div>
        </div>
    )
}

export default Page
