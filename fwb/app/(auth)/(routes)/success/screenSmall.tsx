'use client'
import { useSignIn, useUser } from '@clerk/nextjs'
import 'dotenv/config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SmallScreen = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [error, setError] = useState<any>(null)
  const { user } = useUser()

  return (
    <div className="h-screen w-full flex flex-row">
      <div className="inline-flex h-auto w-auto mx-auto sm:mt-[160px] xs:mt-[80px] xxs:mt-[64px] z-10">
        <div className="w-auto h-auto flex relative flex-col">
          <div className="flex w-[60px] h-[60px] rounded-[75px] border-[2.25px] border-white mx-auto xxs:w-[20px] xxs:h-[20px] xs:w-[30px] xs:h-[30px] sm:w-[40px] sm:h-[40px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M21.9859 39.6875L13.3109 31.0125C12.8439 30.5443 12.2097 30.2812 11.5484 30.2812C10.8871 30.2812 10.253 30.5443 9.78594 31.0125C8.81094 31.9875 8.81094 33.5625 9.78594 34.5375L20.2359 44.9875C21.2109 45.9625 22.7859 45.9625 23.7609 44.9875L50.2109 18.5375C51.1859 17.5625 51.1859 15.9875 50.2109 15.0125C49.7439 14.5443 49.1097 14.2812 48.4484 14.2812C47.7871 14.2812 47.153 14.5443 46.6859 15.0125L21.9859 39.6875Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-white text-center font-urbanist text-[120px] self-stretch font-normal leading-tight tracking-tight xxs:text-[48px] xs:text-[80px]">
            Success!!
          </div>
          <div className="self-stretch text-white text-center mb-[72px] font-urbanist text-[18px] font-normal leading-[22.5px] xxs:text-[12px]">
            You have successfully verified your account
          </div>
          {/* <Link
            href="/fre1"
            className="w-[380px] h-[48px] sm:pt-[10px] pt-[8px] justify-center items-center gap-2 rounded-3xl border bg-[#f6ff82] text-center text-[#8e94e9] font-urbanist text-[20px] font-medium leading-tight mx-auto tracking-wide xxs:text-[16px] xxs:h-[36px] xxs:w-[272px] xs:text-[16px] xs:h-[40px] xs:w-[342px]"
          >
            Lets Get Started!
          </Link> */}
        </div>
      </div>
      <div className="absolute top-[30%] left-0 w-full z-0 xxs:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 390 361"
          fill="none"
        >
          <path
            opacity="0.1"
            d="M395.85 176.273C159.667 281.23 108.766 15.135 -44.0464 156.082C-118.155 224.435 -10.8441 326.001 44.828 196.671C100.135 68.1891 -131.413 9.99738 -246.647 142.417C-358.942 271.459 -428.132 258.377 -489.009 162.308C-549.886 66.238 -404.734 24.4034 -432.465 152.997C-440.118 188.484 -459.654 231.981 -475.971 250.365C-529.869 311.09 -687.607 400.26 -888.054 271.139C-1076.37 149.833 -1324.15 194.292 -1372.07 250.365C-1484.6 382.043 -1024.24 351.361 -1060.95 177.12C-1069.78 135.213 -1140.01 93.0411 -1173.54 76.818C-1173.54 76.818 -1300.82 13.3831 -1434.55 24.2503"
            stroke="white"
            stroke-width="45.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
