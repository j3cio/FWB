import React, { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { SearchContext } from '@/contexts/SearchContext'
import { getSearchIndex } from '@/lib/utils'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { createTheme } from '@mui/material'

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1a1a23',
          fontSize: '16px',
          fontFamily: 'Urbanist, Arial, sans-serif',
        },
      },
    },
  },
})

interface NavbarProps {
  customHandleSearch?: () => void
  customFetchSearchIndex?: () => void
}

const Navbar = ({
  customHandleSearch,
  customFetchSearchIndex,
}: NavbarProps) => {
  const setSearchIndex = useContextSelector(
    SearchContext,
    (context) => context.setSearchIndex
  )
  const { getToken } = useAuth()

  const fetchSearchIndex = customFetchSearchIndex
    ? customFetchSearchIndex
    : async () => {
        try {
          const bearerToken = await getToken()

          if (bearerToken) {
            const companiesIndex = await getSearchIndex({
              bearer_token: bearerToken,
            })
            setSearchIndex(companiesIndex)
          }
        } catch (error) {
          console.error(error)
        }
      }

  useEffect(() => {
    fetchSearchIndex()
  }, [])

  return (
    <>
      <div className="block sm:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden sm:block">
        <DesktopNavbar theme={theme} />
      </div>
    </>
  )
}

export default Navbar
