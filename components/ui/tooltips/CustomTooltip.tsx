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
        className={`absolute bottom-[-110%] left-[50%] -translate-x-1/2 transform rounded bg-black px-4 py-2 text-lg text-white transition duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
      >
        {title}
      </div>
    </div>
  )
}

export default CustomTooltip
