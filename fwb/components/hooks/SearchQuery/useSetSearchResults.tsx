import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

export const useSetSearchResults = () => {
  const setSearchResults = useContextSelector(
    SearchContext,
    (context) => context.setSearchResults
  )

  return setSearchResults
}
