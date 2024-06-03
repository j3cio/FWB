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

// https://www.fusejs.io/api/options.html for more options
interface fuseOptionsParams {
  includeScore?: boolean // Whether the score should be included in the result set. A score of 0indicates a perfect match, while a score of 1 indicates a complete mismatch. good for testing
  minMatchCharLength?: number
  shouldSort?: boolean
  location?: number //default 0: Determines approximately where in the text is the pattern expected to be found.
  threshold?: number // Default 0.6: At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
  distance?: number //Default 100: Determines how close the match must be to the fuzzy location (specified by location). An exact letter match which is distance characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified. A distance of 1000 would require a perfect match to be within 800 characters of the location to be found using a threshold of 0.8.
  keys: string[]
}

export const fuzzySearch = async ({
  searchQuery,
  searchIndex,
  keys = ['name'],
}: fuzzySearchParams) => {
  const fuseOptions: fuseOptionsParams = {
    keys,
    distance: 100,
    threshold: 0.3,
  }
  const fuse = new Fuse(searchIndex, fuseOptions)

  const searchResults = await fuse.search(searchQuery)
  const parsedSearchResults = searchResults.map(
    (searchResult) => searchResult.item
  )

  return parsedSearchResults
}
