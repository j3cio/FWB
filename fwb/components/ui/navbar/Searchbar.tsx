import Image from 'next/image'

import { TextField, IconButton, Box } from '@mui/material'

import searchIcon from '@/components/ui/explore/icons/search_24px.svg'
import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

const SearchBar = () => {
  const handleSearch = useContextSelector(
    SearchContext,
    (context) => context.handleSearch
  )
  const searchQuery = useContextSelector(
    SearchContext,
    (context) => context.searchQuery
  )
  const setSearchQuery = useContextSelector(
    SearchContext,
    (context) => context.setSearchQuery
  )

  return (
    <Box className="flex flex-grow items-end rounded-[100px] border-none bg-white">
      <TextField
        fullWidth
        placeholder="Search for companies with benefits"
        className="h-[48px] flex-[1] items-start justify-center rounded-bl-[25px] rounded-tr-[25px] border-none focus:outline-none"
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
        className="m-[4px] border-none bg-[#000] p-[10px] transition duration-100 ease-in-out hover:bg-[#8e94e9]"
        onClick={() => handleSearch(searchQuery)}
      >
        <Image src={searchIcon} alt="Search Icon" />
      </IconButton>
    </Box>
  )
}

export default SearchBar
