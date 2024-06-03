// useWindowDimensions.tsx
'use client'

import { useEffect, useState } from 'react'

const useWindowDimensions = () => {
  const getWindowWidth = () => window.innerWidth

  const [windowWidth, setWindowWidth] = useState(getWindowWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth())
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // No dependencies

  return windowWidth
}

export default useWindowDimensions
