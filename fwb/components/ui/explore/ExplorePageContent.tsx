'use client'
//import Navbar from '@/components/ui/explore/explore_navbar'
import { CompanyAndDiscounts } from '@/app/types/types'
import {
  useSearchIndex,
  useSearchQuery,
  useSearchResults,
  useSetSearchIndex,
} from '@/components/hooks/SearchQuery'
import useFilteredCompanies from '@/components/hooks/useFilteredCompanies'
import { FilterContext } from '@/components/ui/explore/filter_context'
import ResponsiveGrid from '@/components/ui/explore/products_grid'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'
import { createClient } from '@supabase/supabase-js'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { FilterOptions } from './constants'
import { fetchData } from './utils/fetchData'

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ExplorePageContent = () => {
  const { getToken } = useAuth()
  const pathname = usePathname()
  const { sortby, category, privateGroup } = useContext(FilterContext)
  const [page, setPage] = useState(0)
  const [companies, setCompanies] = useState<CompanyAndDiscounts[]>([])
  const [testCompanies, setTestCompanies] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAtBottom, setIsAtBottom] = React.useState(false)
  const [infiniteScroll, setInfiniteScroll] = React.useState(false)
  const [searchedCompany, setSearchedCompany] = useState(null)
  const [activeOptions, setActiveOptions] = useState<FilterOptions>({
    sort: 'Most Recent',
    privateGroups: [],
    categories: [],
  })
  const searchQuery = useSearchQuery()
  const searchResults = useSearchResults()
  const searchIndex = useSearchIndex()
  const setSearchIndex = useSetSearchIndex()

  const searchParams = useSearchParams()
  const companyRedirect = searchParams.get('company')

  const filteredCompanies = useFilteredCompanies(activeOptions, companies)

  const fetchPublicCompanies = async () => {
    let { data, error } = await supabase.from('companies').select('*')

    if (error) {
      console.error('Error fetching companies:', error)
      return
    }

    // Filter the companies for public companies only
    if (data) {
      let publicCompanies = data.filter((company) => company.public === true)
      setCompanies(publicCompanies)
      setIsLoading(false)
    }
    return data
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      if (companyRedirect) {
        const companies = await fetchData(companyRedirect)
        setCompanies(companies)
      }
      return
    }
    fetchCompanies()
  }, [companyRedirect])

  const fetchCompanies = async (concat: boolean) => {
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
              setCompanies(data.result) // This line is giving an error
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

  const fetchTestCompanies = async () => {
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

        fetch(`${protocol}//${window.location.host}/api/test_companies`)
          .then(async (res) => {
            const data = await res.json()
            setTestCompanies(data.companies)
          })
          .catch((error) => console.error('error', error))
          .finally(async () => {
            // const companiesIndex = await getSearchIndex({
            //   bearer_token: bearerToken,
            // })
            // setSearchIndex(companiesIndex)
          })
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error)
    }
  }

  // Fetch Data and concatenate when page is changed or infinite scroll is enabled

  useEffect(() => {
    if (pathname == '/explore') {
      fetchCompanies(true)
      fetchTestCompanies()
    } else {
      fetchPublicCompanies()
    }
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
    fetchCompanies(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortby, category, privateGroup])

  useEffect(() => {
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
    <Box
      data-testid="explore-page-content"
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
    >
      <Container disableGutters maxWidth="lg">
        {/* <>
          <ProductFilters
            activeOptions={activeOptions}
            setActiveOptions={setActiveOptions}
          />
          <MobileProductFilters
            activeOptions={activeOptions}
            setActiveOptions={setActiveOptions}
          />
        </> */}

        {/* <ResponsiveGrid
          items={
            searchResults.length
              ? searchResults
              : filteredCompanies.length
                ? filteredCompanies
                : companies
          }
          isLoading={isLoading}
        /> */}
        <ResponsiveGrid items={testCompanies} isLoading={isLoading} />
        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
        </Box> */}
      </Container>
    </Box>
  )
}

export default ExplorePageContent
