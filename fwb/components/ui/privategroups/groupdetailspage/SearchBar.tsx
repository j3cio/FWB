import searchIcon from '@/components/ui/explore/icons/search_24px.svg'
import { Box, IconButton, TextField } from '@mui/material'
import { Image } from 'next/dist/client/image-component'

const SearchBar = () => {
  return (
    <div className="mr-4 sm-max:mr-0 xs-max:mr-0 xxs-max:mr-0">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'right',
          borderRadius: '100px',
          backgroundColor: 'white',
          flexGrow: 1,
          border: 'none',
        }}
        className='xs-max:h-[40px] xxs-max:h-[40px]'
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          style={{
            flex: 1,
            height: '48px',
            borderRadius: '25px 0 0 25px',
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiInputBase-input': {
              paddingTop: '10px',
              fontFamily: "__Urbanist_4806ca"
            },
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
          }}
          className='xs-max:w-[32px] xxs-max:w-[32px]'
        >
          <Image src={searchIcon} alt="Search Icon" className='xs-max:h-[16px] xxs-max:h-[16px]'/>
        </IconButton>
      </Box>
    </div>
  )
}

export default SearchBar
