/**
 * @jest-environment jsdom
 */
import React, { Dispatch, SetStateAction } from 'react'
import { act } from 'react-dom/test-utils'
import 'whatwg-fetch'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'

import {
  useSearchQuery,
  useSearchResults,
  useSetSearchResults,
  useSearchIndex,
  useSetSearchIndex,
} from '../components/hooks/SearchQuery'

const mockData = [
  { id: 1, name: 'Company A', description: 'Description for Company A' },
  { id: 2, name: 'Company B', description: 'Description for Company B' },
  // We'll make this more detailed once we update our db schema
]

// Mock any required dependencies or contexts
class MockResponse extends Response {
  constructor(body: any, init?: ResponseInit) {
    super(body, init)
  }

  json() {
    return Promise.resolve(mockData)
  }
}

global.fetch = jest.fn(() =>
  Promise.resolve(new MockResponse(JSON.stringify(mockData)))
)

jest.mock('../contexts/SearchContext')

jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(() => ({
    getToken: jest.fn(() => 'mock-token'),
  })),
}))

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => 'value'),
  })),
  usePathname: jest.fn(() => '/explore'),
}))

jest.mock('../components/ui/skeletons/generateSkeletons', () => ({
  generateSkeletons: jest.fn(() => [
    <div key="mock-skeleton">Mock Skeleton</div>,
  ]),
}))

jest.mock('../components/hooks/useFilteredCompanies', () => ({
  __esModule: true,
  default: jest.fn(() => []),
}))

jest.mock('../components/ui/explore/utils/fetchData', () => ({
  fetchData: jest.fn(() => Promise.resolve(mockData)),
}))

jest.mock('../components/hooks/SearchQuery', () => ({
  useSearchQuery: jest.fn(() => 'mock-search-query'),
  useSearchResults: jest.fn(() => [
    {
      id: 1,
      name: 'Mock Company A',
      description: 'Mock description for Company A',
    },
    {
      id: 2,
      name: 'Mock Company B',
      description: 'Mock description for Company B',
    },
  ]),
  useSetSearchResults: jest.fn((searchResults: any[]) => {}),
  useSearchIndex: jest.fn(() => [
    {
      id: 1,
      name: 'Mock Company A',
      description: 'Mock description for Company A',
    },
    {
      id: 2,
      name: 'Mock Company B',
      description: 'Mock description for Company B',
    },
  ]),
  useSetSearchIndex: jest.fn(() => (searchIndex: any[]) => {}),
}))

describe('ExplorePageContent', () => {
  it('renders without errors', async () => {
    await act(async () => {
      render(<ExplorePageContent />)
    })
    const explorePageContent = screen.getByTestId('explore-page-content')
    expect(explorePageContent).toBeInTheDocument()
  })
})
