import { useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import avatar from '@/components/ui/form/icons/avatar.svg'
import groupIcon from '@/components/ui/explore/icons/group_24px.svg'
import discountIcon from '@/components/ui/explore/icons/discount.svg'
import messageIcon from '@/components/ui/explore/icons/message_24px.svg'
import { Image } from 'next/dist/client/image-component'

import { IconButton, Box, Tooltip, Menu, MenuItem, Theme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { useClerk } from '@clerk/clerk-react'
import { useUser } from '@clerk/nextjs'
import SearchBar from './Searchbar'

interface DesktopNavbarProps {
  handleSearch: (e: any) => void
  clearSearch: () => void
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  theme: Theme
}
const DesktopNavbar = ({
  handleSearch,
  clearSearch,
  searchQuery,
  setSearchQuery,
  theme,
}: DesktopNavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const pathname = usePathname()
  const open = Boolean(anchorEl)
  const router = useRouter()
  const { signOut } = useClerk()
  const { user } = useUser()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (href: string) => {
    clearSearch()
    router.push(href)
    setAnchorEl(null)
  }
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
          <button onClick={() => handleNavigation('/profile')}>
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
                onClick={() => handleNavigation('/explore')}
                sx={{
                  padding: '9.6px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  borderColor: pathname === '/explore' ? '#8e94e9' : '',
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
                  handleNavigation('/groups')
                }}
                sx={{
                  padding: '9.6px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  borderColor: pathname === '/groups' ? '#8e94e9' : '',

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
                  handleNavigation('/chat')
                }}
                sx={{
                  padding: '9.6px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  borderColor: pathname === '/chat' ? '#8e94e9' : '',

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
                borderColor: pathname === '/profile' ? '#8e94e9' : '',

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
                {user && <Image src={user.imageUrl} alt={avatar} fill />}
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
              <MenuItem onClick={() => handleNavigation('/profile')}>
                <PersonIcon style={{ marginRight: '8px' }} />
                View Profile
              </MenuItem>
              <MenuItem onClick={() => signOut(() => handleNavigation('/'))}>
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

export default DesktopNavbar
