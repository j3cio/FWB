'use client'

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
})

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchIndex, setSearchIndex] = useState<any[]>([])
  const [keys, setKeys] = useState<string[]>(['name'])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

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
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
