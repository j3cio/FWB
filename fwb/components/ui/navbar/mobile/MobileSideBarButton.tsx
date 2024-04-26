import Image from 'next/image'
import Link from 'next/link'

const MobileLogo = () => {
  return (
    <Link href="/profile">
      <Image priority src="/fwb_logo.png" alt="logo" width={110} height={0} />
    </Link>
  )
}

export default MobileLogo
