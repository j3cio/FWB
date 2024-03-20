import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import groupIcon from '@/components/ui/profile/icons/group_24px.svg'
import messsageIcon from '@/components/ui/profile/icons/message_24px.svg'
import chat from '@/components/ui/message/icons/chat.svg'
import { Image } from 'next/dist/client/image-component'
import { IconButton, Box, TextField } from '@mui/material'
import searchIcon from '@/components/ui/explore/icons/search_24px.svg'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/clerk-react'
import { useUser } from '@clerk/nextjs'

interface SearchBarProps {
  handleSearch: (e: any) => void
  companyQuery: string
  setCompanyQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  companyQuery,
  setCompanyQuery,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'right',
        borderRadius: '100px',
        backgroundColor: 'white',
        border: 'none',
        flexGrow: 1,
      }}
    >
      <TextField
        placeholder="Search more benefits"
        style={{
          flex: 1,
          height: '48px',
          borderRadius: '25px 0 0 25px',
          justifyContent: 'center',
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.MuiFormControl-root': { alignItems: 'flex-start' },
        }}
        value={companyQuery}
        onChange={(e) => setCompanyQuery(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(companyQuery)
          }
        }}
      />
      <IconButton
        aria-label="search"
        sx={{
          backgroundColor: 'black',
          padding: '10px',
          border: 'none',
          margin: '4px',
          '&:hover': {
            backgroundColor: '#8e94e9',
          },
        }}
        onClick={() => handleSearch(companyQuery)}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  )
}

interface NavbarProps {
  handleSearch: (e: any) => void
  companyQuery: string
  setCompanyQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function Navbar({
  handleSearch,
  companyQuery,
  setCompanyQuery,
}: NavbarProps) {
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
  const handleProfileClick = () => {
    router.push('/profile')
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1A1A23',
        boxShadow: 'none',
        padding: '32px',
        height: '112px',
      }}
    >
      <Toolbar sx={{ display: 'flex', gap: '24px' }}>
        <Typography
          sx={{
            marginRight: '69px',
            height: '48px',
            width: '114px',
            fontSize: '38px',
            color: '#ffffff',
          }}
        >
          LOGO.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'right',
            borderRadius: '100px',
            justifyContent: 'flex-end',
            flexGrow: 1,
            border: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'right',
              borderRadius: '100px',
              flexGrow: 1,
              border: 'none',
              // maxWidth: '900px',
              marginRight: '24px',
            }}
          >
            <SearchBar
              handleSearch={handleSearch}
              companyQuery={companyQuery}
              setCompanyQuery={setCompanyQuery}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'flex-end',
              borderRadius: '100px',
              // backgroundColor: 'white',
              border: 'none',
              gap: '24px',
            }}
          >
            <IconButton
              sx={{
                padding: '9.6px',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            >
              <Image
                src={messsageIcon}
                alt="message"
                style={{
                  width: '28.8px',
                  height: '28.8px',
                }}
              />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                padding: '9.6px',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            >
              <Image
                src={groupIcon}
                alt="Group Icon"
                style={{ width: '28.8px', height: '28.8px' }}
              />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                padding: '9.6px',
                borderRadius: '50%',
                border: '2px solid #8E94E9',
                background: '#8E94E9',
              }}
            >
              <Image
                src={chat}
                alt="chat Icon"
                style={{ width: '28.8px', height: '28.8px' }}
              />
            </IconButton>
            <Avatar alt="User" sx={{ width: '48px', height: '48px' }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
