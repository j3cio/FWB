import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'

// This should fail for now, just setting up testing framework itself
describe('ExplorePage', () => {
  it('renders a heading', () => {
    render(<ExplorePageContent />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
