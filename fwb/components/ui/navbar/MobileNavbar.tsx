import MobileNavButtons from './mobile/MobileNavButtons'
import MobileLogo from './mobile/MobileSideBarButton'

const MobileNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-8">
      <MobileLogo />
      <MobileNavButtons />
    </nav>
  )
}

export default MobileNavbar
