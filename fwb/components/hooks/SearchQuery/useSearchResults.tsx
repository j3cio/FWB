import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

export const useSearchResults = () => {
  const searchResults = useContextSelector(
    SearchContext,
    (context) => context.searchResults
  )

  return searchResults
}
