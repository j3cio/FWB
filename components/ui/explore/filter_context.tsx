'use client'
import React, { createContext, useState } from 'react'
/**
 * Context for filtering options in the explore page.
 */
export const FilterContext = createContext({
  sortby: '',
  category: '',
  privateGroup: '',
  setSortBy: (sortby: string) => {},
  setCategory: (category: string) => {},
  setPrivateGroup: (privateGroup: string) => {},
})

/**
 * Provides filter context for the children components.
 * @param children - The child components to be wrapped by the FilterProvider.
 */
export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortby, setSortBy] = useState('Most Popular')
  const [category, setCategory] = useState('all')
  const [privateGroup, setPrivateGroup] = useState('')

  return (
    <FilterContext.Provider
      value={{
        sortby,
        category,
        privateGroup,
        setSortBy,
        setCategory,
        setPrivateGroup,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const DetailContext = createContext({
  sortby: '',
  privateGroup: '',
  setSortBy: (sortby: string) => {},
  setPrivateGroup: (privateGroup: string) => {},
})

export const DetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortby, setSortBy] = useState('Most Popular')
  const [privateGroup, setPrivateGroup] = useState('')

  return (
    <DetailContext.Provider
      value={{
        sortby,
        privateGroup,
        setSortBy,
        setPrivateGroup,
      }}
    >
      {children}
    </DetailContext.Provider>
  )
}
