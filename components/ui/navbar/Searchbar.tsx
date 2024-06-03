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
      className="flex items-end rounded-[100px] bg-white flex-grow border-none"
    >
      <TextField
        fullWidth
        placeholder="Search for companies with benefits"
        className='flex-[1] h-[48px] justify-center rounded-tr-[25px] rounded-bl-[25px] items-start border-none focus:outline-none'
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
        className='bg-[#000] p-[10px] border-none m-[4px] hover:bg-[#8e94e9] transition duration-100 ease-in-out'
        onClick={() => handleSearch(searchQuery)}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  )
}

export default SearchBar
