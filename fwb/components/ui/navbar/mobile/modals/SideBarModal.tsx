import MobileCustomModal from '@/components/ui/modals/MobileCustomModal'
import Link from 'next/link'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import MobileExploreIcon from '../../icons/MobileExploreIcon'
import MobileGroupIcon from '../../icons/MobileGroupIcon'
import MobileHamburgerIcon from '../../icons/MobileHamburgerIcon'
import MobilePlusIcon from '../../icons/MobilePlusIcon'
import MobileSmallChatIcon from '../../icons/MobileSmallChatIcon'
import MobileNavLink from '../MobileNavLink'

interface SideBarModalProps {
  showSideBar: boolean
  setShowSideBar: Dispatch<SetStateAction<boolean>>
}
const SideBarModal = ({ showSideBar, setShowSideBar }: SideBarModalProps) => {
  const handleClose = () => {
    setShowSideBar(false)
  }

  return (
    <MobileCustomModal
      initial={{ x: '-30%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      showModal={showSideBar}
      setShowModal={setShowSideBar}
    >
      <div className="mobile__sidebar flex h-dvh w-[60vw] flex-col bg-[#1A1A23] px-4">
        <section className="my-6">
          <article className=" flex items-center gap-4">
            <div className="border-bg-white" onClick={() => handleClose()}>
              <MobileHamburgerIcon />
            </div>
            <Link href="/profile" onClick={() => handleClose()}>
              <Image
                priority
                src="/fwb_logo.png"
                alt="logo"
                width={110}
                height={0}
              />
            </Link>
          </article>
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
  )
}

export default SideBarModal
