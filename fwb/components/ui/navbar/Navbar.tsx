import React, { useContext, useCallback, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import avatar from '@/components/ui/form/icons/avatar.svg'
import groupIcon from '@/components/ui/explore/icons/group_24px.svg'
import discountIcon from '@/components/ui/explore/icons/discount.svg'
import messageIcon from '@/components/ui/explore/icons/message_24px.svg'
import { Image } from 'next/dist/client/image-component'
import {
  TextField,
  IconButton,
  Box,
  Tooltip,
  createTheme,
  Menu,
  MenuItem,
} from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { useRouter } from 'next/navigation'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { useClerk } from '@clerk/clerk-react'
import { useAuth, useUser } from '@clerk/nextjs'
import SearchBar from './Searchbar'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import DesktopNavbar from './DesktopNavbar'

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

const Navbar = () => {
  const { isSignedIn } = useUser()

  const router = useRouter()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    setSearchResults,
  } = useContext(SearchContext)
  const { getToken } = useAuth()

  const handleSearch = async () => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })
      setSearchResults(results)
      router.push('/explore')
    } catch (error) {
      console.error(error)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const fetchSearchIndex = useCallback(async () => {
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
  }, [getToken, setSearchIndex])

  useEffect(() => {
    fetchSearchIndex()
  }, [fetchSearchIndex])

  if (isSignedIn) {
    return (
      <DesktopNavbar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        clearSearch={clearSearch}
        setSearchQuery={setSearchQuery}
        theme={theme}
      />
    )
  }
}

export default Navbar
