import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

export const useSearchIndex = () => {
  const searchIndex = useContextSelector(
    SearchContext,
    (context) => context.searchIndex
  )

  return searchIndex
}
