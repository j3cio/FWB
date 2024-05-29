'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { SignUp, useSignUp } from '@clerk/nextjs'

//For responsiveness
import useWindowDimensions from '@/components/hooks/useWindowDimensions'

import { LargeScreen } from './screenLarge'
import { SmallScreen } from './screenSmall'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const router = useRouter()
  const [error, setError] = useState<any>(null)

  const width = useWindowDimensions()

  useEffect(() => {
    setTimeout(() => {
      router.push('/profile')
    }, 1000)
  })

  return (
    <div className="w-full h-screen block relative overflow-hidden">
      {width > 1201 && (
        <div className="flex justify-between bg-[#8e94e9] h-[931px] container overflow-hidden">
          <div className="flex flex-col translate-y-[-30px]">
            <div className="w-[133px]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 138 262"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 1.6842H1.6842V3L1.6842 193C1.6842 230.177 31.8225 260.316 69 260.316C106.177 260.316 136.316 230.177 136.316 193L136.316 3V1.6842H135H3Z"
                  stroke="white"
                  stroke-width="2.63158"
                />
                <g opacity="0.5">
                  <path
                    d="M3 1.6842H1.6842V3L1.6842 155C1.6842 192.177 31.8225 222.316 69 222.316C106.177 222.316 136.316 192.177 136.316 155L136.316 3V1.6842H135L3 1.6842Z"
                    stroke="white"
                    stroke-width="2.63158"
                  />
                </g>
                <g opacity="0.25">
                  <path
                    d="M3 1.6842H1.6842V3L1.6842 112C1.6842 149.177 31.8225 179.316 69 179.316C106.177 179.316 136.316 149.177 136.316 112L136.316 3V1.6842H135L3 1.6842Z"
                    stroke="white"
                    stroke-width="2.63158"
                  />
                </g>
              </svg>
            </div>
            <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleHi.svg')] w-[150px] h-[150px] xl:w-[136px] xl:h-[136px]"></div>
            <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleGirl.svg')] w-[150px] h-[452px] xl:w-[136px] xl:h-[405px]"></div>
            <div className="rounded-full bg-[#f6ff82] w-[150px] h-[150px] shrink-0 xl:w-[134px] xl:h-[134px]"></div>
          </div>
          <div className="flex flex-col text-center justify-center h-screen">
            <div className="flex w-[60px] h-[60px] rounded-[75px] border-[2.25px] border-white mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <path
                  d="M21.9859 39.6875L13.3109 31.0125C12.8439 30.5443 12.2097 30.2812 11.5484 30.2812C10.8871 30.2812 10.253 30.5443 9.78594 31.0125C8.81094 31.9875 8.81094 33.5625 9.78594 34.5375L20.2359 44.9875C21.2109 45.9625 22.7859 45.9625 23.7609 44.9875L50.2109 18.5375C51.1859 17.5625 51.1859 15.9875 50.2109 15.0125C49.7439 14.5443 49.1097 14.2812 48.4484 14.2812C47.7871 14.2812 47.153 14.5443 46.6859 15.0125L21.9859 39.6875Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-white text-center font-urbanist text-[120px] self-stretch font-normal leading-tight tracking-tight">
              Success!!
            </div>
            <div className="self-stretch text-white text-center mb-[72px] font-urbanist text-[18px] font-normal leading-[22.5px]">
              You have successfully verified your account
            </div>
            {/* <Link
              href="/fre1"
              className="w-[380px] h-[48px] pt-[10px] justify-center items-center gap-2 rounded-3xl border bg-[#f6ff82] text-center text-[#8e94e9] font-urbanist text-[20px] font-medium leading-tight mx-auto tracking-wide"
            >
              Lets Get Started!
            </Link> */}
          </div>
          <div className="translate-y-[-50px]">
            <div className="w-[150px] h-[166px] rounded-b-full border-[3px] border-white xl:w-[134px]"></div>
            <div className="flex w-[150px] h-[150px] p-7 pr-[27.25px] pl-[26.75px] justify-center items-center shrink-0 rounded-full bg-white xl:w-[134px] xl:h-[134px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="97"
                height="96"
                viewBox="0 0 97 96"
                fill="none"
              >
                <path
                  d="M77.1571 74.8428L73.0652 29.1023C72.9916 28.1971 72.2262 27.511 71.2989 27.511H62.6734C62.6587 19.9046 56.4177 13.7144 48.749 13.7144C41.0803 13.7144 34.8393 19.9046 34.8246 27.511H26.1991C25.2865 27.511 24.5211 28.1971 24.4328 29.1023L20.3408 74.8428C20.3408 74.9012 20.3408 74.945 20.3408 75.0034C20.3408 80.0986 25.0657 84.2449 30.8651 84.2449H66.6329C72.4323 84.2449 77.1571 80.0986 77.1571 75.0034C77.1571 74.945 77.1571 74.9012 77.1571 74.8428ZM48.749 17.2183C54.4748 17.2183 59.1261 21.8317 59.1408 27.511H38.3572C38.3719 21.8317 43.0232 17.2183 48.749 17.2183ZM66.6329 80.7264H30.8651C27.0381 80.7264 23.9176 78.2007 23.8734 75.0618L27.8182 31.0149H34.8246V37.1613C34.8246 38.1249 35.6194 38.9132 36.5909 38.9132C37.5623 38.9132 38.3572 38.1249 38.3572 37.1613V31.0149H59.1408V37.1613C59.1408 38.1249 59.9356 38.9132 60.9071 38.9132C61.8786 38.9132 62.6734 38.1249 62.6734 37.1613V31.0149H69.6798L73.6245 75.0764C73.5804 78.2007 70.4599 80.7264 66.6329 80.7264Z"
                  fill="#8E94E9"
                />
                <path
                  d="M70.3848 30.5H26.8848L22.8848 78.5L24.8848 81.5H70.3848C71.1848 81.5 74.0514 76.6667 74.3848 75L70.3848 30.5Z"
                  fill="#8E94E9"
                />
              </svg>
            </div>
            <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleBoy.svg')] w-[150px] h-[474px] xl:w-[136px] xl:h-[425px]"></div>

            <div className="w-[150px] shrink-0 rounded-t-[156.25px] rounded-b-none border-[3px] border-white">
              <div className="w-[149px] h-[100px] flex-shrink-0 rounded-tr-[165px] rounded-tl-[162px] rounded-b-none border-t-[3px] border-t-neutral-000 mt-[42px] opacity-50"></div>
              <div className="w-[150px] h-20 flex-shrink-0 rounded-t-[156.25px] rounded-b-none border-t-[3px] border-t-neutral-000 opacity-25 -mt-[60px]"></div>
            </div>
          </div>
        </div>
      )}
      {width > 901 && width < 1200 && <LargeScreen />}
      {width < 901 && <SmallScreen />}
    </div>
  )
}
