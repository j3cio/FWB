import { useState } from 'react'

import MobileSearchIcon from '../icons/MobileSearchIcon'

import { MobileSearchProps } from '../types'

import MobileHamburgerIcon from '../icons/MobileHamburgerIcon'
import SearchModal from './modals/SearchModal'
import SideBarModal from './modals/SideBarModal'

const MobileNavButtons = ({ handleSearch }: MobileSearchProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const openSideBar = () => setShowSideBar(true)
  const openSearchModal = () => setShowSearchModal(true)

  return (
    <>
      <article className="flex items-center gap-4 justify-self-end">
        <div onClick={() => openSearchModal()}>
          <MobileSearchIcon />
        </div>
        <div onClick={() => openSideBar()}>
          <MobileHamburgerIcon />
        </div>
      </article>

      {/* Adding some minor prop drilling with our handleSearch */}
      <SearchModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        handleSearch={handleSearch}
      />

      <SideBarModal showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </>
  )
}
export default MobileNavButtons
