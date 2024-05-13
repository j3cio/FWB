'use client'

import Image from 'next/image'

import { useChatContext } from 'stream-chat-react'
import InfoIcon from '../icons/InfoIcon'
import { useContext } from 'react'
import { FWBChatContext } from '@/contexts/ChatContext'
import CloseIcon from '../icons/CloseIcon'

interface DesktopMessageListTopBarProps {
  isDetails?: boolean
}
const DesktopMessageListTopBar = ({
  isDetails,
}: DesktopMessageListTopBarProps) => {
  const { channel, client } = useChatContext()
  const { showChatDetails, setShowChatDetails } = useContext(FWBChatContext)

  const currentChatUser = client._user?.id
  const recipient = channel?.state.members
  const membersArray = recipient && Object.values(recipient)

  const memberWithRoleMember =
    membersArray &&
    membersArray.find((member) => member.user_id !== currentChatUser)
  const recipientName = memberWithRoleMember && memberWithRoleMember.user?.name

  return (
    <article className="mb-6 flex justify-between border-b border-b-[white] border-opacity-20 py-8">
      {isDetails ? (
        <div className="flex h-[40px] w-full items-center justify-between">
          <span className="font-semibold">Details</span>
          <div
            className="flex cursor-pointer flex-row items-center gap-3"
            onClick={() => {
              setShowChatDetails(false)
            }}
          >
            <CloseIcon />
          </div>
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
            <span className="font-semibold">General</span>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center gap-3"
            onClick={() => setShowChatDetails(!showChatDetails)}
          >
            {/*<InfoIcon />*/}
          </div>
        </>
      )}
    </article>
  )
}

export default DesktopMessageListTopBar
