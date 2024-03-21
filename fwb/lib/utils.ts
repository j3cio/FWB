import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Fuse from 'fuse.js'
import { useAuth } from '@clerk/nextjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface getSearchIndexParams {
  bearer_token: string
  fetchMethod?: string
}

export const getSearchIndex = async ({
  bearer_token,
  fetchMethod = 'GET', // defaults to GET, but allows for change if needed though that's unlikely
}: getSearchIndexParams) => {
  let myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${bearer_token}`)

  // Leave potential for adding params or something to the body if we need a different source for our
  // search index. Say, stuff like groups etc. For now we just use the companies call, but this would
  // be the entrypoint to change that. Maybe we add a default param to our `/searchindex` route that
  //  pulls companies unless otherwise instructed
  var requestOptions = {
    method: fetchMethod,
    headers: myHeaders,
  }

  const indexResponse = await fetch('/api/searchindex', requestOptions)
  const parsedIndexResponse = await indexResponse.json()

  return parsedIndexResponse
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
  const parsedSearchResults = searchResults.map(
    (searchResult) => searchResult.item
  )

  return parsedSearchResults
}
