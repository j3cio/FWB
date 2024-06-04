import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'

import MobileSearchIcon from '../icons/MobileSearchIcon'
import MobileHamburgerIcon from '../icons/MobileHamburgerIcon'

import SearchModal from './modals/SearchModal'
import SideBarModal from './modals/SideBarModal'

import { SearchContext } from '@/contexts/SearchContext'

const MobileNavButtons = () => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleSearch = useContextSelector(
    SearchContext,
    (context) => context.handleSearch
  )
  const searchQuery = useContextSelector(
    SearchContext,
    (context) => context.searchQuery
  )

  const openSideBar = () => setShowSideBar(true)
  const openSearchModal = () => setShowSearchModal(true)

  return (
    <>
      <article className="flex items-center gap-4 justify-self-end">
        <div onClick={openSearchModal}>
          <MobileSearchIcon />
        </div>
        <div onClick={openSideBar}>
          <MobileHamburgerIcon />
        </div>
      </article>

      <SearchModal
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        handleSearch={() => handleSearch(searchQuery)}
      />

      <SideBarModal showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </>
  )
}
export default MobileNavButtons
