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

const MobileSearchButton = ({ handleSearch }: MobileSearchProps) => {
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const { searchHistory } = useContext(SearchContext)
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
        <AnimatePresence>
          <motion.article
            initial={{ height: searchHistory.length ? '33vh' : '15vh' }}
            animate={{
              height: isCollapsed
                ? searchHistory.length
                  ? '33vh'
                  : '15vh'
                : '60vh',
            }}
            exit={{ height: '33vh' }}
            transition={{ duration: 0.3 }}
            className={'flex-flex-col gap-3 bg-[#1A1A23] px-4 pt-6 text-white'}
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
          </motion.article>
        </AnimatePresence>
      </Modal>
    </>
  )
}
export default MobileSearchButton
