import { ReactNode } from 'react'

interface CustomTooltipProps {
  title: string
  showTooltip: boolean
  children: ReactNode
}

const CustomTooltip = ({
  title,
  showTooltip,
  children,
}: CustomTooltipProps) => {
  return (
    <div className="relative">
      {children}

      <div
        className={`absolute left-[50%] top-[-75%] -translate-x-1/2 transform rounded bg-black p-2 text-xs text-white transition duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
      >
        {title}
      </div>
    </div>
  )
}

export default CustomTooltip
