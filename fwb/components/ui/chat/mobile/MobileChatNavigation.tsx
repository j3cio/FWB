'use client'
import Image from 'next/image'
import { useChatContext } from 'stream-chat-react'

import AddFriendsIcon from '../icons/AddFriendsIcon'
import BackArrowIcon from '../icons/BackArrowIcon'
import EditIcon from '../icons/EditIcon'

const MobileChatNavigation = () => {
  const { setActiveChannel, channel, channelsQueryState } = useChatContext()

  const recipient = channel?.state.members
  const membersArray = recipient && Object.values(recipient)
  const memberWithRoleMember =
    membersArray && membersArray.find((member) => member.role === 'member')

  const recipientName = memberWithRoleMember && memberWithRoleMember.user?.name

  return (
    <nav className="flex font-urbanist justify-between py-[28px]">
      <div
        className="flex items-center cursor-pointer gap-2"
        onClick={() => setActiveChannel(undefined, undefined, undefined)}
      >
        <BackArrowIcon />

        {channel && memberWithRoleMember ? (
          <Image
            src={memberWithRoleMember?.user?.image || ''}
            width={24}
            height={24}
            alt={`User ${recipientName} Profile Picture`}
          />
        ) : null}
        <p className="text-white font-semibold">
          {channel ? (recipientName ? recipientName : 'General') : 'Messages'}
        </p>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <div>
          <AddFriendsIcon />
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    </nav>
  )
}

export default MobileChatNavigation
