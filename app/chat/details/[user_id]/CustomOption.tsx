import React, { PropsWithChildren, ReactNode } from 'react'

interface CustomOptionProps {
  icon: ReactNode
  handleClick?: () => void
}
const CustomOption = ({
  icon,
  handleClick,
  children,
}: PropsWithChildren<CustomOptionProps>) => {
  return (
    <article
      className="flex cursor-pointer items-center gap-2"
      onClick={handleClick}
    >
      {icon}
      {children}
    </article>
  )
}

export default CustomOption
