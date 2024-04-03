'use client'

import Navbar from '@/components/ui/privategroups/groupdetailspage/groups_navbar'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useEffect } from 'react'

function SingleGroupNavbar() {
  const router = useRouter()
  const { getToken } = useAuth()
  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    setSearchResults,
  } = useContext(SearchContext)

  const handleSearch = async () => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })

      setSearchResults(results)
      router.push('/explore')
    } catch (error) {
      console.error(error)
    }
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
    <div>
      <Navbar
        handleSearch={handleSearch}
        companyQuery={searchQuery}
        setCompanyQuery={setSearchQuery}
      />
    </div>
  )
}

export default SingleGroupNavbar
