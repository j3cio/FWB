/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'

// Mock any required dependencies or contexts
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

describe('ExplorePageContent', () => {
  it('renders without errors', () => {
    render(<ExplorePageContent />)
    const explorePageContent = screen.getByTestId('explore-page-content')
    expect(explorePageContent).toBeInTheDocument()
  })
})
