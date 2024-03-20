import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Fuse from 'fuse.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface fuzzySearchParams {
  queryString: string
  searchIndex: any[]
  keys?: string[]
}

export const fuzzySearch = async ({
  queryString,
  searchIndex,
  keys = ['name'],
}: fuzzySearchParams) => {
  const fuseOptions = {
    keys,
  }
  const fuse = new Fuse(searchIndex, fuseOptions)

  const searchResults = await fuse.search(queryString)
  console.log({ searchIndex })
  console.log({ queryString, searchResults })
  return searchResults
}
