'use client'

import React, { useEffect, useState, useContext } from 'react'

import { useSearchParams } from 'next/navigation'

import { useAuth } from '@clerk/nextjs'
import Button from '@mui/material/Button'
import { Container, Box, Divider, Skeleton } from '@mui/material'

import ResponsiveGrid from '@/components/ui/explore/products_grid'
import Navbar from '@/components/ui/explore/explore_navbar'
import MostPopular from '@/components/ui/explore/most_popular'
import Productfilters from '@/components/ui/explore/productfilters'
import {
  FilterContext,
  FilterProvider,
} from '@/components/ui/explore/filter_context'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'

import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { SearchContext } from '@/contexts/SearchContext'

/**
 * Renders the ExplorePage component. With the FilterProvider
 *
 * @returns The rendered ExplorePage component.
 */

export default function ExplorePage() {
  return (
    <FilterProvider>
      <ExplorePageContent />
    </FilterProvider>
  )
}

function ExplorePageContent() {
  const { getToken } = useAuth()

  const { sortby, category, privateGroup } = useContext(FilterContext)
  const [page, setPage] = useState(0)
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [isAtBottom, setIsAtBottom] = React.useState(false)
  const [infiniteScroll, setInfiniteScroll] = React.useState(false)

  const [searchedCompany, setSearchedCompany] = useState(null)

  const searchParams = useSearchParams()
  const companyRedirect = searchParams.get('company')

  const {
    searchQuery,
    setSearchQuery,
    searchIndex,
    setSearchIndex,
    searchResults,
    setSearchResults,
  } = useContext(SearchContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bearerToken = await window.Clerk.session.getToken({
          template: 'testing_template',
        })
        const supabaseToken = await window.Clerk.session.getToken({
          template: 'supabase',
        })

        const response = await fetch(
          `api/companies/search?companyQuery=${companyRedirect}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              supabase_jwt: supabaseToken,
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          console.log('Searching for Discount was Successful', data)
          setSearchedCompany(data)
        } else {
          const errorData = await response.json()
          console.error('Error Finding a Discount', errorData)
          alert('There are no discounts for that company!')
          setSearchedCompany(null)
        }
      } catch (error) {
        console.error('GET Company Discount API Failed', error)
        setSearchedCompany(null)
      }
    }

    if (companyRedirect) {
      fetchData()
    }
  }, [companyRedirect])

  const handleSearch = async (e: any) => {
    e.preventDefault()

    try {
      const results = await fuzzySearch({
        searchQuery,
        searchIndex,
      })

      setSearchResults(results)
    } catch (error) {
      console.error('GET Company Discount API Failed', error)
      setSearchedCompany(null)
    }
  }

  const fetchData = async (concat: boolean) => {
    try {
      var myHeaders = new Headers()
      const bearerToken = await getToken()

      if (bearerToken) {
        myHeaders.append('Authorization', `Bearer ${bearerToken}`)

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow' as RequestRedirect,
        }

        const protocol = window.location.protocol
        fetch(
          `${protocol}//${window.location.host}/api/companies?sort_by=${encodeURIComponent(
            sortby
          )}&category=${encodeURIComponent(
            category.toLowerCase()
          )}&private_group=${encodeURIComponent(
            privateGroup.toLowerCase()
          )}&page=${encodeURIComponent(page)}`,
          requestOptions
        )
          .then(async (res) => {
            const data = await res.json()
            if (concat) {
              setCompanies([...companies].concat(data.result))
            } else {
              setCompanies((await res.json()).result)
            }
          })
          .catch((error) => console.error('error', error))
          .finally(async () => {
            const companiesIndex = await getSearchIndex({
              bearer_token: bearerToken,
            })

            setSearchIndex(companiesIndex)
          })
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error)
    }
  }

  const clearSearch = () => {
    setSearchedCompany(null)
    setCompanyQuery('')
  }

  // Fetch Data and concatenate when page is changed or infinite scroll is enabled

  useEffect(() => {
    fetchData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infiniteScroll])

  useEffect(() => {
    if (companies && companies.length > 0) {
      setIsLoading(false)
    }
  }, [companies])
  // Fetch Data on Filter Change
  useEffect(() => {
    setPage(0)
    fetchData(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortby, category, privateGroup])

  React.useEffect(() => {
    const checkScroll = () => {
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      setIsAtBottom(isAtBottom)

      if (infiniteScroll && isAtBottom) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [infiniteScroll, page])

  useEffect(() => {
    searchIndex &&
      searchIndex.length > 0 &&
      fuzzySearch({
        searchQuery,
        searchIndex,
      })
  }, [searchQuery, searchIndex])

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        {isLoading ? (
          generateSkeletons({ type: 'NavBar' })
        ) : (
          <Navbar
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            companyQuery={companyQuery}
            setCompanyQuery={setCompanyQuery}

          />
        )}
        {isLoading ? (
          generateSkeletons({ type: 'ProductFilters' })
        ) : (
          <Productfilters />
        )}
        <ResponsiveGrid
          items={searchResults.length > 0 ? searchResults : companies}
          isLoading={isLoading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={87}
              height={20}
              sx={{ bgcolor: '#CED2E4', borderRadius: '5px' }}
            />
          ) : (
            <Button
              onClick={() => {
                setPage(page + 1)
                setInfiniteScroll(true)
              }}
              sx={{ color: 'white' }}
            >
              Load More...
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}
