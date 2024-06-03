import Image from 'next/image'

import { TextField, IconButton, Box } from '@mui/material'

import searchIcon from '@/components/ui/explore/icons/search_24px.svg'
import { useContext } from 'react'
import { SearchContext } from '@/contexts/SearchContext'

const SearchBar = () => {
  const { handleSearch, searchQuery, setSearchQuery } =
    useContext(SearchContext)
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
            handleSearch(searchQuery)
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
        onClick={() => handleSearch(searchQuery)}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  )
}

export default SearchBar
