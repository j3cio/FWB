import { useState } from 'react'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import { Modal } from '@mui/material'

import MobileNavLink from './MobileNavLink'

import MobileHamburgerIcon from '../icons/MobileHamburgerIcon'
import MobileLogoIcon from '../icons/MobileLogoIcon'
import MobileExploreIcon from '../icons/MobileExploreIcon'
import MobileGroupIcon from '../icons/MobileGroupIcon'
import MobileSmallChatIcon from '../icons/MobileSmallChatIcon'
import MobilePlusIcon from '../icons/MobilePlusIcon'
import MobileCustomModal from '../../modals/MobileCustomModal'

const MobileSideBarButton = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleOpen = () => setShowSidebar(true)
  const handleClose = () => setShowSidebar(false)

  return (
    <>
      <article className="flex items-center gap-4" onClick={() => handleOpen()}>
        <MobileHamburgerIcon />
        <Image priority src="/fwb_logo.png" alt="logo" width={110} height={0} />
      </article>

      <MobileCustomModal
        initial={{ x: '-30%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        showModal={showSidebar}
        setShowModal={setShowSidebar}
      >
        <div className="mobile__sidebar flex h-dvh w-[60vw] flex-col bg-[#1A1A23] px-4">
          <section className="my-6">
            <div
              className="border-bg-white flex items-center gap-4"
              onClick={() => handleClose()}
            >
              <MobileHamburgerIcon />
              <Image
                priority
                src="/fwb_logo.png"
                alt="logo"
                width={110}
                height={0}
              />
            </div>
            <div className="mt-[14px] h-[1.5px] bg-white opacity-25" />
          </section>

          <div className="flex h-full flex-col justify-between">
            <section className="flex flex-col gap-5">
              <MobileNavLink
                href={'/addbenefit'}
                icon={<MobilePlusIcon />}
                title="Share Benefits"
                handleClose={handleClose}
              />
              <MobileNavLink
                href={'/explore'}
                icon={<MobileExploreIcon />}
                title="Explore"
                handleClose={handleClose}
              />
              <MobileNavLink
                href={'/chat'}
                icon={<MobileSmallChatIcon />}
                title="Messages"
                handleClose={handleClose}
              />
              <MobileNavLink
                href={'/groups'}
                icon={<MobileGroupIcon />}
                title="Groups"
                handleClose={handleClose}
              />
            </section>

            <div className="mb-4 justify-self-end">
              <MobileNavLink
                href={'/profile'}
                title="Profile"
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </MobileCustomModal>
    </>
  )
}

export default MobileSideBarButton
