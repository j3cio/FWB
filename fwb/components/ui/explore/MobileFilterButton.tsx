import { FilterOptions } from './constants'
import FilterIconYellow from './icons/FilterIconYellow'

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
      className={`flex h-4 shrink-0 items-center  gap-2  rounded-xl border p-3 text-xs font-bold
       ${icon ? 'border-[#F6FF82] text-[#F6FF82]' : ''}
       ${type && activeOptions && activeOptions[type] && activeOptions[type]?.includes(text) ? 'bg-white text-[#1A1A23]' : ''} xs-max:h-[35px] xs-max:w-[110px] xs-max:justify-center xxs-max:h-[35px] xxs-max:w-[110px] xxs-max:justify-center ${text.length > 12 && 'xs-max:w-[205px] xxs-max:w-[205px]'} xs-max:rounded-full xs-max:text-[0.85rem] xxs-max:rounded-full xxs-max:text-[0.85rem]`}
      onClick={() => handleClick()}
    >
      {text}
      {icon ? <FilterIconYellow /> : null}
    </div>
  )
}

export default MobileFilterButton
