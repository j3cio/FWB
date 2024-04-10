import Image from 'next/image'

import { TextField, IconButton, Box } from '@mui/material'

import searchIcon from '@/components/ui/explore/icons/search_24px.svg'

interface SearchBarProps {
  handleSearch: (e: any) => void
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'right',
        borderRadius: '100px',
        backgroundColor: 'white',
        flexGrow: 1,
        border: 'none',
      }}
    >
      <TextField
        fullWidth
        placeholder="Search for companies with benefits"
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e)
          }
        }}
      />
      <IconButton
        color="primary"
        aria-label="search"
        sx={{
          backgroundColor: 'black',
          padding: '10px',
          border: 'none',
          margin: '4px',
          transition: 'backgroundColor 1s ease',
          '&:hover': {
            backgroundColor: '#8e94e9',
          },
        }}
        onClick={handleSearch}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  )
}

export default SearchBar
