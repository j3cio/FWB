'use client'

import { useRouter } from 'next/navigation'
import YellowVerifyIcon from './icons/YellowVerifyIcon'
import NavigationArrowIcon from './icons/NavigationArrowIcon'

const VerifyEmploymentCard = () => {
  // we can change this as needed ofc, something like this: const redirect_UI = process.env.NODE_ENV !== "production" ?  'http://localhost:3000/linkedin' : "https://app.makefwb.com/linkedin", im just leaving it to localhost for debugging

  const router = useRouter()

  const handleVerification = async () => {
    const response = await fetch('/api/linkedin')

    if (response.ok) {
      console.log(await response.json())
    } else {
      console.error('Something went wrong')
    }
  }
  return (
    // Not responsive for the moment, this is just to save someone time when we implement this properly. Should be easy to implement since the width is hardcoded at the parent level.
    <article
      className="flex h-[84px] w-[657px] cursor-pointer items-center justify-between rounded-[5px] bg-[#8E94E9] p-4 text-white"
      onClick={() => handleVerification()}
    >
      <section className="flex flex-col">
        <div className="text__container--with-icon flex items-center gap-1">
          <YellowVerifyIcon />
          <h1 className=" text-2xl font-semibold">Verify your employment</h1>
        </div>
        <p className="text__container--without-icon">
          Verified using linkedin and got verification badge
        </p>
      </section>

      <NavigationArrowIcon />
    </article>
  )
}

export default VerifyEmploymentCard
