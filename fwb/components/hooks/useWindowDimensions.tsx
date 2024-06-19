import { useEffect, useState } from 'react'

const useWindowDimensions = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
      // Set the initial window width
      setWindowWidth(window.innerWidth)

      // Add an event listener to update the window width on resize
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)

      // Clean up the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}

export default useWindowDimensions
