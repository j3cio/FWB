'use client'

import { useChatContext } from 'stream-chat-react'

import AddFriendsIcon from '../icons/AddFriendsIcon'
import BackArrowIcon from '../icons/BackArrowIcon'
import EditIcon from '../icons/EditIcon'

const MobileChatNavigation = () => {
  const { setActiveChannel } = useChatContext()

  return (
    <nav className="flex font-urbanist justify-between py-[28px]">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setActiveChannel(undefined, undefined, undefined)}
      >
        <BackArrowIcon />
        <p className="text-white font-semibold">Messages</p>
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
