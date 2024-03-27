'use client'

import AddFriendsIcon from '../icons/AddFriendsIcon'
import BackArrowIcon from '../icons/BackArrowIcon'
import EditIcon from '../icons/EditIcon'

const MobileChatNavigation = () => {
  return (
    <nav className="flex font-urbanist justify-between py-[28px]">
      <div className="flex items-center">
        <BackArrowIcon />
        <p className="text-white font-semibold">Messages</p>
      </div>
      <div className="flex items-center gap-3">
        <AddFriendsIcon />
        <EditIcon />
      </div>
    </nav>
  )
}

export default MobileChatNavigation
