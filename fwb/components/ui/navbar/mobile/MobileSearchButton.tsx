import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from 'react'

import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { Modal } from '@mui/material'

import MobileSearchBar from './MobileSearchBar'
import MobileSearchHistory from './MobileSearchHistory'

import MobileSearchIcon from '../icons/MobileSearchIcon'
import MobileLargeChatIcon from '../icons/MobileLargeChatIcon'

import { MobileSearchProps } from '../types'
import { SearchContext } from '@/contexts/SearchContext'
import CustomModal from './CustomModal'

const MobileSearchButton = ({ handleSearch }: MobileSearchProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { searchHistory } = useContext(SearchContext)
  const handleOpen = () => setShowSearchModal(true)
  const handleClose = () => setShowSearchModal(false)

  return (
    <>
      <article className="flex items-center gap-4 justify-self-end">
        <div onClick={() => handleOpen()}>
          <MobileSearchIcon />
        </div>
        <Link href={'/chat'}>
          <MobileLargeChatIcon />
        </Link>
      </article>

      <CustomModal
        initial={{
          maxHeight: searchHistory.length ? '' : '100%',
          y: '-30%',
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
      </CustomModal>
    </>
  )
}
export default MobileSearchButton
