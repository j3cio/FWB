import React from 'react'
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
import { useUser } from '@clerk/nextjs'
import SearchBar from './Searchbar'

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
  handleSearch: (e: any) => void
  clearSearch: () => void
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const Navbar: React.FC<NavbarProps> = ({
  handleSearch,
  clearSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const router = useRouter()
  const { signOut } = useClerk()
  const { user, isSignedIn } = useUser()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExploreClick = () => {
    clearSearch()
    router.push('/explore')
    setAnchorEl(null)
  }
  const handleProfileClick = () => {
    clearSearch()
    router.push('/profile')
    setAnchorEl(null)
  }

  if (isSignedIn) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#1A1A23',
            boxShadow: 'none',
            paddingY: '32px',
            paddingX: '18px',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            height: '112px',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <button onClick={() => router.push('/profile')}>
              <Image
                priority
                className="mr-[4.6vw] w-44 h-full"
                src="/fwb_logo.png"
                alt="logo"
                width={900}
                height={0}
              />
            </button>
            <Toolbar
              disableGutters
              variant="dense"
              sx={{
                display: 'flex',
                gap: '24px',
                height: '9.6px',
                flexGrow: 1,
              }}
            >
              <SearchBar
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <Tooltip
                title="Explore"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={handleExploreClick}
                  sx={{
                    padding: '9.6px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    borderColor: '#8e94e9',
                    backgroundColor: '#1a1a23',
                    '&:hover': {
                      backgroundColor: '#8e94e9',
                      borderColor: '#8e94e9',
                    },
                  }}
                >
                  <Image
                    src={discountIcon}
                    alt="Explore"
                    style={{
                      width: '28.8px',
                      height: '28.8px',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Groups"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    clearSearch()
                    router.push('/groups')
                  }}
                  sx={{
                    padding: '9.6px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    '&:hover': {
                      backgroundColor: '#8e94e9',
                      borderColor: '#8e94e9',
                    },
                  }}
                >
                  <Image
                    src={groupIcon}
                    alt="Groups"
                    style={{
                      width: '28.8px',
                      height: '28.8px',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Messages"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    clearSearch()
                    router.push('/chat')
                  }}
                  sx={{
                    padding: '9.6px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    '&:hover': {
                      backgroundColor: '#8e94e9',
                      borderColor: '#8e94e9',
                    },
                  }}
                >
                  <Image
                    src={messageIcon}
                    alt="Messages"
                    style={{
                      width: '28.8px',
                      height: '28.8px',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <IconButton
                id="user-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  backgroundColor: '#DAE3EA',
                  padding: '9.6px',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  border: '2px solid white',
                  '&:hover': {
                    backgroundColor: '#8e94e9',
                    borderColor: '#8e94e9',
                  },
                }}
              >
                <div
                  style={{
                    width: '28.8px',
                    height: '28.8px',
                  }}
                >
                  <Image src={user.imageUrl} alt={avatar} fill />
                </div>
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                }}
                sx={{
                  width: '500px',
                  marginTop: '10px',
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <PersonIcon style={{ marginRight: '8px' }} />
                  View Profile
                </MenuItem>
                <MenuItem onClick={() => signOut(() => router.push('/'))}>
                  <LogoutIcon style={{ marginRight: '8px' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </Box>
        </AppBar>
      </ThemeProvider>
    )
  }
}

export default Navbar
