import FilterIcon from './atoms/FilterIcon'

interface MobileFilterButtonProps {
  icon?: boolean
  text: string
}

const MobileFilterButton = ({ icon, text }: MobileFilterButtonProps) => {
  return (
    <div
      className={`flex h-4 shrink-0 items-center  gap-2  rounded-xl border px-3 py-3 text-xs font-bold ${icon ? 'border-[#F6FF82] text-[#F6FF82]' : 'text-white'} `}
    >
      {text}
      {icon ? <FilterIcon /> : null}
    </div>
  )
}

export default MobileFilterButton
