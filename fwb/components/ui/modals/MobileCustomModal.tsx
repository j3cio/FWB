'use client'

import { Dispatch, ReactNode, SetStateAction, useMemo } from 'react'
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

  const opacity0 = useMemo(() => {
    return {
      opacity: 0,
    }
  }, [])

  const opacity50 = useMemo(() => {
    return {
      opacity: '50%',
    }
  }, [])

  const delay = useMemo(() => {
    return {
      delay: 0.1,
    }
  }, [])

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
              initial={opacity0}
              animate={opacity50}
              exit={opacity0}
              transition={delay}
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
