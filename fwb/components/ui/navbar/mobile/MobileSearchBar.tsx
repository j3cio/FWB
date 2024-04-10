import { SearchContext } from '@/contexts/SearchContext'
import { SyntheticEvent, useContext } from 'react'
import MobileSmallSearchIcon from '../icons/MobileSmallSearchIcon'
import { MobileSearchProps } from '../types'

const MobileSearchBar = ({ handleSearch, handleClose }: MobileSearchProps) => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)

  const handleQuery = (
    event: SyntheticEvent<HTMLInputElement | MouseEvent | HTMLDivElement>
  ) => {
    handleSearch()
    setSearchQuery('')
    handleClose && handleClose()
  }

  return (
    <div className="relative flex h-[24px] rounded-[100px]">
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        value={searchQuery}
        placeholder="Search..."
        className="w-full rounded-[100px] bg-white pl-4 text-xs text-black"
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            handleQuery(event)
          }
        }}
      />

      <div className="absolute right-0">
        <div
          className="pr-[2px] pt-[2px]"
          onClick={(event) => handleQuery(event)}
        >
          <MobileSmallSearchIcon />
        </div>
      </div>
    </div>
  )
}

export default MobileSearchBar
