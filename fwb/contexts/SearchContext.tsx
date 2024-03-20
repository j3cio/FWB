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
}

export const SearchContext = createContext<SearchContextInterface>({
  searchQuery: '',
  setSearchQuery: () => {},
  searchIndex: [],
  setSearchIndex: () => {},
  keys: ['name'],
  setKeys: () => {},
})

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchIndex, setSearchIndex] = useState<any[]>([])
  const [keys, setKeys] = useState<string[]>(['name'])

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchIndex,
        setSearchIndex,
        keys,
        setKeys,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
