import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from 'react'

import { Modal } from '@mui/material'

import MobileSearchIcon from '../icons/MobileSearchIcon'
import MobileLargeChatIcon from '../icons/MobileLargeChatIcon'
import MobileSearchBar from './MobileSearchBar'
import MobileSearchHistory from './MobileSearchHistory'
import { MobileSearchProps } from '../types'
import { SearchContext } from '@/contexts/SearchContext'
import Link from 'next/link'

const MobileSearchButton = ({ handleSearch }: MobileSearchProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleOpen = () => setShowSearchModal(true)
  const handleClose = () => setShowSearchModal(false)

  return (
    <>
      <article className="flex items-center gap-4">
        <div onClick={() => handleOpen()}>
          <MobileSearchIcon />
        </div>
        <Link href={'/chat'}>
          <MobileLargeChatIcon />
        </Link>
      </article>

      <Modal open={showSearchModal} onClose={handleClose}>
        <article
          className={`flex-flex-col gap-3 bg-[#1A1A23] px-4 pt-6 text-white ${isCollapsed ? 'h-[30vh]' : 'h-[60vh]'}`}
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
      </Modal>
    </>
  )
}
export default MobileSearchButton
