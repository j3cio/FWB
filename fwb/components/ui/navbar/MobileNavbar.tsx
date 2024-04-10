import { Theme } from '@mui/material'
import SearchBar from './Searchbar'
import MobileChatIcon from './icons/MobileChatIcon'
import MobileHamburgerIcon from './icons/MobileHamburgerIcon'
import MobileLogoIcon from './icons/MobileLogoIcon'
import MobileSearchIcon from './icons/MobileSearchIcon'

interface MobileNavbarProps {
  handleSearch: (e: any) => void
  clearSearch: () => void
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  theme: Theme
}
const MobileNavbar = ({
  handleSearch,
  clearSearch,
  searchQuery,
  setSearchQuery,
}: MobileNavbarProps) => {
  return (
    // Fix our actual layout once our interactions are fixed up
    <nav className="flex items-center justify-between px-4 py-8">
      <article className="flex items-center gap-4">
        <MobileHamburgerIcon />
        <MobileLogoIcon />
      </article>
      <article className="flex items-center gap-4">
        <MobileSearchIcon />
        <MobileChatIcon />
      </article>
      {/* Work on visibility composition for performance though minor */}
      {/* <SearchBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      /> */}
    </nav>
  )
}

export default MobileNavbar
