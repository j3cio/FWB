'use client'

import { Dispatch, ReactNode, SetStateAction } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimationCoordinates {
  x?: string | number
  y?: string | number
  maxHeight?: string
}

interface MobileCustomModalProps {
  initial: AnimationCoordinates
  animate: AnimationCoordinates // This can get changed to allow more animation types like opacity but for now x/y is all i need
  exit: AnimationCoordinates
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const MobileCustomModal = ({
  initial,
  animate,
  exit,
  showModal,
  setShowModal,
  children,
}: MobileCustomModalProps) => {
  const handleClose = () => setShowModal(false)

  return (
    <>
      <AnimatePresence>
        {showModal ? (
          <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            className="fixed left-0 top-0 z-20 h-dvh w-screen"
          >
            <div className="fixed left-0 top-0 z-10">{children}</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: '50%' }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              // Making dimensions of our overlay be larger than our display to this degree prevents it from visibly shifting on close
              className="fixed z-0 flex h-[250%] w-[250%] bg-black"
              onClick={handleClose}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default MobileCustomModal
