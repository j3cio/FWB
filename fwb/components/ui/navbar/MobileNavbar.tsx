import MobileNavButtons from './mobile/MobileNavButtons'
import MobileLogo from './mobile/MobileSideBarButton'

interface MobileNavbarProps {
  handleSearch: () => void
}
const MobileNavbar = ({ handleSearch }: MobileNavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-4 py-8">
      <MobileLogo />
      {/* This composition pattern should help give us a minor performance boost since this prevents the entire navBar from  re-rendering on modal click.
          However, this approach comes at the cost of minor prop-drilling for our searchBar in particular. This can be solved by some context, but since 
          it's entirely localized to our navbar in mobile form, and handleSearch MAY be custom in the future, it's a worthy tradeoff imo. 
      */}
      <MobileNavButtons handleSearch={handleSearch} />
    </nav>
  )
}

export default MobileNavbar
