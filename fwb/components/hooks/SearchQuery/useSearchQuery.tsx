import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

export const useSearchQuery = () => {
  const searchQuery = useContextSelector(
    SearchContext,
    (context) => context.searchQuery
  )

  return searchQuery
}
