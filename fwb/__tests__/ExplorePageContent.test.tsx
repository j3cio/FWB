/**
 * @jest-environment jsdom
 */
import { act } from 'react-dom/test-utils'
import 'whatwg-fetch'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'
import { mockData } from '@/lib/tests/mockData'

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
  useSearchResults: jest.fn(() => mockData),
  useSetSearchResults: jest.fn((searchResults: any[]) => {}),
  useSearchIndex: jest.fn(() => mockData),
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
