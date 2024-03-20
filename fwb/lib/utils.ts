import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Fuse from 'fuse.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface fuzzySearchParams {
  searchQuery: string
  searchIndex: any[]
  keys?: string[]
}

export const fuzzySearch = async ({
  searchQuery,
  searchIndex,
  keys = ['name'],
}: fuzzySearchParams) => {
  const fuseOptions = {
    keys,
  }
  const fuse = new Fuse(searchIndex, fuseOptions)

  const searchResults = await fuse.search(searchQuery)
  return searchResults
}
