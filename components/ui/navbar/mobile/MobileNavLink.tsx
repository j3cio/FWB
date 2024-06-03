import Link from 'next/link'
import { ReactNode } from 'react'

interface MobileNavLinkProps {
  href: string
  icon?: ReactNode
  title: string
  handleClose: () => void
}

const MobileNavLink = ({
  href,
  icon,
  title,
  handleClose,
}: MobileNavLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white"
      onClick={() => handleClose()}
    >
      {icon ? icon : null}
      <span>{title}</span>
    </Link>
  )
}

export default MobileNavLink
