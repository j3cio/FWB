'use client'

import { Box, Container } from '@mui/material'
import Navbar from '@/components/ui/navbar/Navbar'
import GroupDetailsSection from '@/components/ui/privategroups/groupdetailspage/GroupDetailsSection'
import { DiscountData, GroupData, UserData } from '@/app/types/types'
import Tabs from '@/components/ui/privategroups/groupdetailspage/Tabs'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useContext } from 'react'
import { SearchContext } from '@/contexts/SearchContext'

interface GroupContentProps {
  userData: UserData[]
  groupData: GroupData
  discountData: DiscountData[]
}

const GroupContent = ({
  userData,
  groupData,
  discountData,
}: GroupContentProps) => {
  const router = useRouter()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    searchResults,
    setSearchResults,
  } = useContext(SearchContext)
  const { getToken } = useAuth()

  const handleSearch = async () => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })
      console.log({ results })
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
    <Container disableGutters maxWidth="lg">
      <div className="bg-[#1A1A23' min-h-[112px]">
        <Navbar
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <Box
        sx={{
          paddingX: '18px',
          position: 'relative',
          marginTop: '56px',
          zIndex: 0,
        }}
      >
        <GroupDetailsSection
          userData={userData}
          groupData={groupData.data[0]}
        />
        <Tabs userData={userData} discountData={discountData} />
      </Box>
    </Container>
  )
}

export default GroupContent
