import AddFriendsIcon from '../icons/AddFriendsIcon'
import EditIcon from '../icons/EditIcon'

const DesktopChannelListTopBar = () => {
  return (
    <article className="flex justify-between py-8">
      <span className="text-2xl">Messages</span>
      <div className="flex cursor-pointer flex-row items-center gap-3">
        <AddFriendsIcon />
        <EditIcon />
      </div>
    </article>
  )
}

export default DesktopChannelListTopBar
