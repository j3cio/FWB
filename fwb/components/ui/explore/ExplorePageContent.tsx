'use client'
//import Navbar from '@/components/ui/explore/explore_navbar'
import { FilterContext } from '@/components/ui/explore/filter_context'
import Productfilters from '@/components/ui/explore/productfilters'
import ResponsiveGrid from '@/components/ui/explore/products_grid'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import { useAuth } from '@clerk/nextjs'
import { Box, Container, Skeleton } from '@mui/material'
import Button from '@mui/material/Button'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '@/contexts/SearchContext'
import { fuzzySearch, getSearchIndex } from '@/lib/utils'
import { createClient } from '@supabase/supabase-js'
import Navbar from '../navbar/Navbar'

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ExplorePageContent = () => {
  const { getToken } = useAuth()
  const pathname = usePathname()
  const { sortby, category, privateGroup } = useContext(FilterContext)
  const [page, setPage] = useState(0)
  const [companies, setCompanies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAtBottom, setIsAtBottom] = React.useState(false)
  const [infiniteScroll, setInfiniteScroll] = React.useState(false)
  const [searchedCompany, setSearchedCompany] = useState(null)
  const searchParams = useSearchParams()
  const companyRedirect = searchParams.get('company')

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
            console.log(data)
            if (concat) {
              setCompanies([...companies].concat(data.result))
            } else {
              setCompanies((await res.json()).result) // This line is giving an error
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
    setSearchQuery('')
    setSearchResults([])
  }

  // Fetch Data and concatenate when page is changed or infinite scroll is enabled

  useEffect(() => {
    if (pathname == '/explore') {
      fetchCompanies(true)
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
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        {isLoading ? generateSkeletons({ type: 'NavBar' }) : <Navbar />}
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

export default ExplorePageContent