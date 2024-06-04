import React, { Dispatch, SetStateAction } from 'react'

import MobileCustomModal from '@/components/ui/modals/MobileCustomModal'
import MobileSearchBar from '../MobileSearchBar'
import MobileSearchHistory from '../MobileSearchHistory'

import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

interface SideBarModalProps {
  showSearchModal: boolean
  setShowSearchModal: Dispatch<SetStateAction<boolean>>
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
  handleSearch: () => void
}
const SearchModal = ({
  showSearchModal,
  setShowSearchModal,
  isCollapsed,
  setIsCollapsed,
  handleSearch,
}: SideBarModalProps) => {
  const searchHistory = useContextSelector(
    SearchContext,
    (context) => context.searchHistory
  )

  const handleClose = () => {
    setShowSearchModal(false)
  }
  const handleOpen = () => {
    setShowSearchModal(true)
  }

  return (
    <MobileCustomModal
      initial={{
        maxHeight: searchHistory.length ? '' : '100%',
        y: '-10%',
      }}
      animate={{
        maxHeight: isCollapsed
          ? searchHistory.length
            ? '33vh'
            : '100%'
          : '60vh',
        y: '0%',
      }}
      exit={{ y: '-100%' }}
      showModal={showSearchModal}
      setShowModal={setShowSearchModal}
    >
      <article
        className={
          'flex w-screen flex-col gap-3 bg-[#1A1A23] px-4 pt-6 text-white'
        }
      >
        <MobileSearchBar
          handleSearch={handleSearch}
          handleClose={handleClose}
        />

        <MobileSearchHistory
          handleSearch={handleSearch}
          handleClose={handleClose}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
      </article>
    </MobileCustomModal>
  )
}

export default SearchModal
