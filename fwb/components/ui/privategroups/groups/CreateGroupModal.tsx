import { SearchContext } from '@/contexts/SearchContext'
import Navbar from '../../navbar/Navbar'
import { Box, Button, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'

const CreateGroupModal = () => {
  const router = useRouter()

  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchResults,
    setSearchIndex,
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

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        <Navbar
          clearSearch={clearSearch}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Box
          sx={{
            borderRadius: 28,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 2,
            bgcolor: 'white',
          }}
        >
          <Button> Create a group </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default CreateGroupModal
