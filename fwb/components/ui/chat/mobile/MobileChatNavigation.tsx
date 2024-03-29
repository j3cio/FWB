'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useChatContext } from 'stream-chat-react'

import AddFriendsIcon from '../icons/AddFriendsIcon'
import BackArrowIcon from '../icons/BackArrowIcon'
import EditIcon from '../icons/EditIcon'
import InfoIcon from '../icons/InfoIcon'

const MobileChatNavigation = () => {
  const { setActiveChannel, channel } = useChatContext()
  const router = useRouter()

  const recipient = channel?.state.members
  const membersArray = recipient && Object.values(recipient)
  const memberWithRoleMember =
    membersArray && membersArray.find((member) => member.role === 'member')
  const recipientName = memberWithRoleMember && memberWithRoleMember.user?.name

  return (
    <nav className="flex justify-between py-[28px] font-urbanist">
      <div
        className="flex cursor-pointer items-center gap-2"
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
        <p className="font-semibold text-white">
          {channel ? (recipientName ? recipientName : 'General') : 'Messages'}
        </p>
      </div>
      <div className="flex cursor-pointer items-center gap-3">
        {channel ? (
          <div
            onClick={() => {
              router.push(`/chat/details/${memberWithRoleMember?.user_id}`)
            }}
          >
            <InfoIcon />
          </div>
        ) : (
          <>
            <div>
              <AddFriendsIcon />
            </div>
            <div>
              <EditIcon />
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default MobileChatNavigation
