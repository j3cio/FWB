'use client'

import { fuzzySearch } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface SearchContextInterface {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  searchIndex: any[]
  setSearchIndex: Dispatch<SetStateAction<any[]>>
  keys: string[]
  setKeys: Dispatch<SetStateAction<string[]>>
  searchResults: any[]
  setSearchResults: Dispatch<SetStateAction<any[]>>
  searchHistory: string[]
  setSearchHistory: Dispatch<SetStateAction<string[]>>
  handleSearch: (searchQuery: string) => void
  clearSearch: () => void
}

export const SearchContext = createContext<SearchContextInterface>({
  searchQuery: '',
  setSearchQuery: () => {},
  searchIndex: [],
  setSearchIndex: () => {},
  keys: ['name'],
  setKeys: () => {},
  searchResults: [],
  setSearchResults: () => {},
  searchHistory: [''],
  setSearchHistory: () => {},
  handleSearch: () => {},
  clearSearch: () => {},
})

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchIndex, setSearchIndex] = useState<any[]>([])
  const [keys, setKeys] = useState<string[]>(['name'])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const router = useRouter()

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  const addToSearchHistory = (searchQuery: string) => {
    const currentHistory = [...searchHistory]
    const existingIndex = currentHistory.findIndex(
      (query) => query === searchQuery
    ) // look for dupes

    // If the search query exists in the history, remove it from its position and place it at the beginning of the array
    if (existingIndex !== -1) {
      currentHistory.splice(existingIndex, 1)
    }

    currentHistory.unshift(searchQuery)
    setSearchHistory(currentHistory)
    // TODO: decide if we want our search history to persist
  }

  const handleSearch = async (searchQuery: string) => {
    try {
      const results = await fuzzySearch({ searchIndex, searchQuery })

      if (results.length) {
        addToSearchHistory(searchQuery)
      }
      setSearchResults(results)
      router.push('/explore')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchIndex,
        setSearchIndex,
        keys,
        setKeys,
        searchResults,
        setSearchResults,
        searchHistory,
        setSearchHistory,
        handleSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
