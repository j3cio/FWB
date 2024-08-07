'use client'

import { FilterProvider } from '@/components/ui/explore/filter_context'

import ExplorePageContent from '@/components/ui/explore/ExplorePageContent'

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
