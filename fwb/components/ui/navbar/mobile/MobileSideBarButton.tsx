import { useState } from 'react'

import MobileHamburgerIcon from '../icons/MobileHamburgerIcon'
import MobileLogoIcon from '../icons/MobileLogoIcon'
import { Modal } from '@mui/material'
import MobileNavLink from './MobileNavLink'
import MobileExploreIcon from '../icons/MobileExploreIcon'
import MobileGroupIcon from '../icons/MobileGroupIcon'
import MobileSmallChatIcon from '../icons/MobileSmallChatIcon'
import MobilePlusIcon from '../icons/MobilePlusIcon'

const MobileSideBarButton = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleOpen = () => setShowSidebar(true)
  const handleClose = () => setShowSidebar(false)

  return (
    <>
      <article className="flex items-center gap-4" onClick={() => handleOpen()}>
        <MobileHamburgerIcon />
        <MobileLogoIcon />
      </article>

      <Modal open={showSidebar} onClose={handleClose}>
        <article className="mobile__sidebar fixed left-0 top-0 z-10 flex h-dvh w-[180px] flex-col bg-[#1A1A23] px-4">
          <section className="my-6">
            <div
              className="border-bg-white flex items-center gap-4"
              onClick={() => handleClose()}
            >
              <MobileHamburgerIcon />
              <MobileLogoIcon />
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
        </article>
      </Modal>
    </>
  )
}

export default MobileSideBarButton
