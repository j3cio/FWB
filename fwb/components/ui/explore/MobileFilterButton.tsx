import { Dispatch, SetStateAction } from 'react'
import FilterIcon from './atoms/FilterIcon'
import { FilterOptions } from './constants'

interface MobileFilterButtonProps {
  icon?: boolean
  text: string
  handleClick: () =>
    | void
    | ((type: 'sort' | 'privateGroups' | 'categories', option: string) => void)
  activeOptions?: FilterOptions

  type?: 'sort' | 'privateGroups' | 'categories'
}

const MobileFilterButton = ({
  icon,
  text,
  handleClick,
  activeOptions,
  type,
}: MobileFilterButtonProps) => {
  return (
    <div
      className={`flex h-4 shrink-0 items-center  gap-2  rounded-xl border px-3 py-3 text-xs font-bold
       ${icon ? 'border-[#F6FF82] text-[#F6FF82]' : ''}
       ${type && activeOptions?.[type] === text ? 'bg-white text-[#1A1A23]' : ''}`}
      onClick={() => handleClick()}
    >
      {text}
      {icon ? <FilterIcon /> : null}
    </div>
  )
}

export default MobileFilterButton
