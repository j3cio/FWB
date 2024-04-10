import { Theme } from '@mui/material'
import SearchBar from './Searchbar'
import MobileChatIcon from './icons/MobileLargeChatIcon'
import MobileHamburgerIcon from './icons/MobileHamburgerIcon'
import MobileLogoIcon from './icons/MobileLogoIcon'
import MobileSearchIcon from './icons/MobileSearchIcon'
import { useState } from 'react'
import MobileSideBarButton from './mobile/MobileSideBarButton'
import MobileSearchButton from './mobile/MobileSearchButton'

interface MobileNavbarProps {
  handleSearch: () => void
}
const MobileNavbar = ({ handleSearch }: MobileNavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-4 py-8">
      {/* This composition pattern should help give us a minor performance boost since this prevents the entire navBar from re-rendering on modal click. */}
      <MobileSideBarButton />
      {/* However, this approach comes at the cost of minor prop-drilling for our searchBar in particular. This can be solved by some context, but since it's entirely localized to our navbar in mobile form, and handleSearch MAY be custom in the future, it's a worthy tradeoff imo. */}
      <MobileSearchButton handleSearch={handleSearch} />
    </nav>
  )
}

export default MobileNavbar
