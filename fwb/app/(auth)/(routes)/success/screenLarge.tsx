'use client'
import React, { SyntheticEvent, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import Link from 'next/link'

export const LargeScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [complete, setComplete] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState<any>(null)

  return (
    <div className="h-screen w-full flex flex-row overflow-hidden">
      <div className="flex w-auto h-auto flex-col mt-auto ml-auto translate-y-[60px]">
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleHi.svg')] w-[133px] h-[133px]"></div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleGirl.svg')] w-[134px] h-[400px]"></div>
        <div className="inline-flex flex-col justify-center items-center shrink-0 rounded-xl relative lg:!w-[133px] lg:!h-[133px]"></div>
      </div>
      <div className="inline-flex flex-col justify-center items-center shrink-0 rounded-xl relative p-0 max-w-[556px] h-[728px] mx-0 my-auto w-2/3">
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
        <Link
          href="/fre1"
          className="w-[380px] h-[48px] pt-[10px] justify-center items-center gap-2 rounded-3xl border bg-[#f6ff82] text-center text-[#8e94e9] font-urbanist text-[20px] font-medium leading-tight mx-auto tracking-wide"
        >
          Lets Get Started!
        </Link>
      </div>
      <div className="flex flex-col h-auto w-[133px] mb-auto mr-auto">
        <div className="w-[133px] mt-[-50px]">
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
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleFriend.svg')] w-[260px] h-[133px] translate-x-[-50%]"></div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleBoy.svg')] w-[133px] h-[420px]"></div>
        <div className="lg:!w-[133px] lg:!h-[133px] lg:!ml-0 w-[150px] h-[150px] shrink-0 rounded-[156.25px] border-t-[5px] ml-[150px]"></div>
      </div>
    </div>
  )
}
