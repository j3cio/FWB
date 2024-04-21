import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { MobileSearchProps } from '../types'
import { SearchContext } from '@/contexts/SearchContext'

interface MobileSearchHistoryProps {
  handleSearch: () => void
  handleClose: () => void
  isCollapsed: boolean
  setIsCollapsed: Dispatch<SetStateAction<boolean>>
}
const MobileSearchHistory = ({
  handleSearch,
  handleClose,
  isCollapsed,
  setIsCollapsed,
}: MobileSearchHistoryProps) => {
  const [beginSearch, setBeginSearch] = useState(false)
  const { searchHistory, setSearchQuery, searchQuery } =
    useContext(SearchContext)

  const handleQuery = async (query: string) => {
    setSearchQuery(query)
    setBeginSearch(true)
  }

  useEffect(() => {
    if (beginSearch && searchQuery) {
      handleSearch()
      setSearchQuery('')
      handleClose()
    }
  }, [beginSearch, searchQuery])

  return (
    <section
      className={`flex flex-col justify-between  pl-2 text-xs ${searchHistory.length ? 'py-4' : 'pb-3'}`}
      style={{
        maxHeight: 'calc(100% - 28px)',
      }}
    >
      <div>
        {searchHistory
          // shows either 4 or 10 items
          .filter((item, index) => (isCollapsed ? index < 4 : index < 11))
          .map((search) => (
            <div
              className="py-1"
              key={search}
              onClick={() => {
                handleQuery(search)
              }}
            >
              {search}
            </div>
          ))}
      </div>
      {searchHistory.length > 4 ? (
        <div
          className="w-full pb-3"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <p className="text-center font-bold text-[#F6FF82]">
            {isCollapsed ? 'Show more' : 'Show less'}
          </p>
        </div>
      ) : null}
    </section>
  )
}

export default MobileSearchHistory
