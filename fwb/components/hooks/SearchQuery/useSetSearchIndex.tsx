import { SearchContext } from '@/contexts/SearchContext'
import { useContextSelector } from 'use-context-selector'

export const useSetSearchIndex = () => {
  const setSearchIndex = useContextSelector(
    SearchContext,
    (context) => context.setSearchIndex
  )
  return setSearchIndex
}
