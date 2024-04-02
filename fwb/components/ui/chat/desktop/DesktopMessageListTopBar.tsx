'use client'

import Image from 'next/image'

import { useChatContext } from 'stream-chat-react'
import InfoIcon from '../icons/InfoIcon'
import { useContext } from 'react'
import { FWBChatContext } from '@/contexts/ChatContext'

interface DesktopMessageListTopBarProps {
  isDetails?: boolean
}
const DesktopMessageListTopBar = ({
  isDetails,
}: DesktopMessageListTopBarProps) => {
  const { channel } = useChatContext()
  const { showChatDetails, setShowChatDetails } = useContext(FWBChatContext)

  const recipient = channel?.state.members
  const membersArray = recipient && Object.values(recipient)
  const memberWithRoleMember =
    membersArray && membersArray.find((member) => member.role === 'member')
  const recipientName = memberWithRoleMember && memberWithRoleMember.user?.name

  return (
    <article className="mb-6 flex justify-between border-b border-b-[white] border-opacity-20 py-8">
      {isDetails ? (
        <div className="flex h-[40px] items-center">
          <span className="text-2xl">Details</span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {channel && memberWithRoleMember ? (
              <Image
                src={memberWithRoleMember?.user?.image || ''}
                width={40}
                height={40}
                alt={`User ${recipientName} Profile Picture`}
              />
            ) : null}
            <span className="text-2xl">General</span>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center gap-3"
            onClick={() => setShowChatDetails(!showChatDetails)}
          >
            <InfoIcon />
          </div>
        </>
      )}
    </article>
  )
}

export default DesktopMessageListTopBar
