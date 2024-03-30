'use client'

import { User } from '@/app/types/types'
import SmallCustomSwitch from '@/components/ui/chat/SmallCustomSwitch'
import MuteIcon from '@/components/ui/chat/icons/MuteIcon'
import ShareIcon from '@/components/ui/chat/icons/ShareIcon'
import Image from 'next/image'
import CustomOption from './CustomOption'
import BlockIcon from '@/components/ui/chat/icons/BlockIcon'
import ReportRedIcon from '@/components/ui/chat/icons/ReportRedIcon'
import DeleteRedIcon from '@/components/ui/chat/icons/DeleteRedIcon'
import { useUser } from '@clerk/nextjs'

const ChatDetailsPage = ({ user }: { user: User }) => {
  return (
    <section className="flex h-dvh w-full flex-col items-center justify-between px-5">
      <div className="w-full">
        <div className="profile__details flex flex-col items-center pb-6">
          <Image
            src={user.profile_picture_url}
            alt={`profile picture for ${user.username}`}
            width={88}
            height={88}
            className=" rounded-full"
            priority
          />
          <h1 className="pt-2 font-semibold">{user.username}</h1>
          {user.company ? (
            <p className="text-center text-xs">Works at {user.company}</p>
          ) : null}
        </div>
        <div className="w-full pb-6">
          <button className="h-9 w-full rounded-3xl bg-[#8E94E9] font-bold">
            Open Profile
          </button>
        </div>

        <div className="flex w-full flex-col text-xs">
          <article className="flex justify-between">
            <CustomOption icon={<MuteIcon />}>Mute Messages</CustomOption>
            <SmallCustomSwitch />
          </article>

          <CustomOption icon={<ShareIcon />}> Share Profile</CustomOption>
        </div>
      </div>

      <div className="flex-col gap-1 self-start pb-11">
        <CustomOption
          icon={<BlockIcon />}
          handleClick={() => console.log('blocking')}
        >
          Block
        </CustomOption>
        <CustomOption
          icon={<ReportRedIcon />}
          handleClick={() => console.log('Reporting')}
        >
          Report
        </CustomOption>
        <CustomOption
          icon={<DeleteRedIcon />}
          handleClick={() => console.log('Delete')}
        >
          Delete Messages
        </CustomOption>
      </div>
    </section>
  )
}

export default ChatDetailsPage
