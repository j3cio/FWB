'use client'
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  use,
} from 'react'
import ResponsiveGrid from '@/components/ui/explore/products_grid'
import { Container, Box, Typography, Skeleton } from '@mui/material'
import Navbar from '@/components/ui/explore/explore_navbar'
import MostPopular from '@/components/ui/explore/most_popular'
import Productfilters from '@/components/ui/explore/productfilters'
import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import {
  FilterContext,
  FilterProvider,
} from '@/components/ui/explore/filter_context'
import { useAuth } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'

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
  const router = useRouter()
  const { getToken } = useAuth()

  const { sortby, category, privateGroup } = useContext(FilterContext)
  const [page, setPage] = useState(0)
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [isAtBottom, setIsAtBottom] = React.useState(false)
  const [infinteScroll, setInfinteScroll] = React.useState(false)

  const [companyQuery, setCompanyQuery] = useState('')
  const [searchedCompany, setSearchedCompany] = useState(null)

  const searchParams = useSearchParams()
  const companyRedirect = searchParams.get('company')

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

    if (!companyQuery) {
      console.error('Invalid company name provided')
      setSearchedCompany(null)
      alert('The search bar is empty!')
      return
    }

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })

      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })

      // GET Fetch Request to Companies API
      const response = await fetch(
        `api/companies/search?companyQuery=${companyQuery}`,
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

    router.push('/explore')
  }

  const fetchData = async (concat: boolean) => {
    try {
      var myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${await getToken()}`)

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
          if (concat) {
            setCompanies([...companies].concat((await res.json()).result))
          } else {
            setCompanies((await res.json()).result)
          }
        })
        .catch((error) => console.log('error', error))
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error)
    }
  }

  // Fetch Data and concatinate when page is changed or infinite scroll is enabled
  useEffect(() => {
    fetchData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, infinteScroll])

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

      if (infinteScroll && isAtBottom) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [infinteScroll, page])

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <Container disableGutters maxWidth="lg">
        {isLoading ? (
          generateSkeletons({ type: 'NavBar' })
        ) : (
          <Navbar
            handleSearch={handleSearch}
            companyQuery={companyQuery}
            setCompanyQuery={setCompanyQuery}
          />
        )}
        <MostPopular />
        <Divider color="white" />
        {isLoading ? (
          generateSkeletons({ type: 'ProductFilters' })
        ) : (
          <Productfilters />
        )}
        <ResponsiveGrid
          items={searchedCompany ? [searchedCompany] : companies}
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
                setInfinteScroll(true)
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
