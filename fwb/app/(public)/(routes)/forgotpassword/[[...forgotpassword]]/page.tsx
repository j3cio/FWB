'use client'
import React, { SyntheticEvent, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import Link from 'next/link'
//For responsiveness
import useWindowDimensions from '@/components/hooks/useWindowDimensions'

import { LargeScreen } from './screenLarge'
import { SmallScreen } from './screenSmall'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [complete, setComplete] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState<any>(null)

  const { isLoaded, signIn, setActive } = useSignIn()

  const width = useWindowDimensions()

  if (!isLoaded) {
    return null
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault()

    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true)
      })
      .catch((err: any) => {
        console.error(JSON.stringify(err, null, 2))
        setError(err.errors[0].longMessage)
      })
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault()
    setError(null)

    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          setComplete(true)
        } else {
          console.log(result)
        }
      })
      .catch((err: any) => {
        console.error(JSON.stringify(err, null, 2))
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <div className="pageHeight h-screen overflow-hidden w-full grid relative">
      {width > 1201 && (
        <div className="big flex items-center justify-center h-screen">
          <div className="leftSigninContainer w-[549px] bg-[#8e94e9] flex flex-col justify-center xl-max:!w-[400px]">
            <div className="circle1 w-[150px] h-[150px] flex-shrink-0 rounded-[156.25px] border-[5px] border-white ml-[150px] xl-max:!h-[136px] xl-max:!w-[134px]"></div>
            <div className="h-[150px] w-[293px] bg-[url('/fre0/BubbleFriend.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[134px] xl-max:w-[268px]"></div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="h-[150px] w-[150px] bg-[url('/fre0/BubbleHi.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[136px] xl-max:w-[136px]"></div>
                <div className="h-[452px] w-[150px] bg-[url('/fre0/BubbleGirl.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[405px] xl-max:w-[136px]"></div>
                <div className="circle6 w-[150px] h-[150px] shrink-0 rounded-[156.25px] bg-[#f6ff82] xl-max:!h-[136px] xl-max:!w-[134px]"></div>
              </div>
              <div className="flex w-[150px] flex-col xl-max:w-[136px]">
                <div className="h-[474px] w-[150px] bg-[url('/fre0/BubbleBoy.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[425px] xl-max:w-[136px]"></div>
                <div className="h-[180px] w-[150px] xl-max:w-[140px]">
                  <svg
                    viewBox="0 0 140 226"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M137 224.339H138.34V222.999V70C138.34 32.2566 107.743 1.65951 70.0001 1.65951C32.2567 1.65951 1.65963 32.2566 1.65963 70V222.999V224.339H3.00012H137Z"
                      stroke="white"
                      strokeWidth="2.68099"
                    />
                    <g opacity="0.5">
                      <path
                        d="M137 224.341H138.34V223V107.562C138.34 69.8191 107.743 39.222 69.9999 39.222C32.2565 39.222 1.65951 69.819 1.65951 107.562V223V224.341H3H137Z"
                        stroke="white"
                        strokeWidth="2.68099"
                      />
                    </g>
                    <g opacity="0.25">
                      <path
                        d="M137 224.34H138.34V223V150.488C138.34 112.745 107.743 82.1478 70.0001 82.1478C32.2567 82.1478 1.65963 112.745 1.65963 150.488V223V224.34H3.00012H137Z"
                        stroke="white"
                        strokeWidth="2.68099"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="h-screen relative flex">
            <form onSubmit={!successfulCreation ? create : reset}>
              {!successfulCreation && !complete && (
                <>
                  <div className="relative flex h-screen">
                    <div className="passwordContainer inline-flex h-[728px] w-[698px] p-[110px_161px_109.48px_162px] flex flex-col justify-center items-center flex-shrink-0 rounded-[60px] border-[2px] border-white bg-[rgba(255,255,255,0.15)] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] backdrop-blur-[12.5px] m-auto xl-max:!border-0 xl-max:!bg-transparent xl-max:!shadow-none">
                      <svg
                        className="mail mb-[24px] mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.16659 6.93066H33.8333C35.6666 6.93066 37.1666 8.43066 37.1666 10.264V30.264C37.1666 32.0973 35.6666 33.5973 33.8333 33.5973H7.16659C5.33325 33.5973 3.83325 32.0973 3.83325 30.264L3.84992 10.264C3.84992 8.43066 5.33325 6.93066 7.16659 6.93066ZM21.3831 21.3807L33.1664 14.014C33.5831 13.7473 33.8331 13.2973 33.8331 12.814C33.8331 11.6973 32.6164 11.0307 31.6664 11.614L20.4998 18.5973L9.33309 11.614C8.38309 11.0307 7.16642 11.6973 7.16642 12.814C7.16642 13.2973 7.41642 13.7473 7.83309 14.014L19.6164 21.3807C20.1498 21.714 20.8498 21.714 21.3831 21.3807Z"
                          fill="white"
                        />
                      </svg>

                      <div className="title text-white text-center font-urbanist text-[40px] font-normal font-semibold leading-[110%] mx-auto mb-[16px]">Forgot Password?</div>
                      <div className="explanation text-white text-center font-urbanist text-[18px] font-medium leading-[1.25]">
                        Dont worry! Enter your email address and we
                      </div>
                      <div className="explanation2 text-white text-center font-urbanist text-[18px] font-medium leading-[1.25] mb-[48px]">
                        will send a link to reset your password
                      </div>
                      {/* <label htmlFor='email'>Please provide identifier</label> */}
                      <input
                        type="email"
                        className="inputEmail rounded-[100px] bg-white flex w-[367px] h-[47.472px] p-[8px_8px_8px_24px] items-center gap-[8px] mx-auto mb-[12px] placeholder:color-#090a10 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[150%] placeholder:opacity-30"
                        placeholder="takeadvantage@address.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div>
                        {error && (
                          <div className="errorMessage text-white flex text-left font-urbanist text-[16px] font-normal mx-auto mt-[-5px] mb-[5px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 17"
                              fill="none"
                              className="errorImage bg-red-600 rounded-[50%]"
                            >
                              <path
                                d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                                fill="white"
                              />
                            </svg>{' '}
                            <div className="message ml-[5px] mt-[-5px] text-left font-urbanist text-[16px] font-normal break-words">{error}</div>
                          </div>
                        )}
                      </div>

                      <button className="sendEmail rounded-[30px] bg-[#f6ff82] flex w-[367px] p-[10px_24px] justify-center items-center gap-[8px] text-[#8e94e9] text-center font-urbanist text-[20px] font-bold leading-[1.25] tracking-[0.4px] mx-auto mb-[12px]">Send Email</button>
                      <div className="help text-white font-urbanist text-[16px] font-medium leading-[150%] mx-auto">
                        Having problems? Email us at{' '}
                        <a className="helpEmail text-white font-urbanist text-[16px] font-bold leading-[125%] tracking-[0.32px]" href="mailto:help@makefwb.com">
                          help@makefwb.com
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {successfulCreation && !complete && (
                <>
                  <div className="passwordContainer inline-flex h-[728px] w-[698px] p-[110px_161px_109.48px_162px] flex flex-col justify-center items-center flex-shrink-0 rounded-[60px] border-[2px] border-white bg-[rgba(255,255,255,0.15)] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] backdrop-blur-[12.5px] m-auto  xl-max:!border-0 xl-max:!bg-transparent xl-max:!shadow-none">
                    <div className="title text-white text-center font-urbanist text-[40px] font-normal font-semibold leading-[110%] mx-auto mb-[16px]">Reset Password</div>
                    <div className="explanation text-white text-center font-urbanist text-[18px] font-medium leading-[1.25]">
                      Enter new password with at least 8 charaters, contain at
                      least 1 number and 1 uppercase
                    </div>
                    <div className="explanation2 text-white text-center font-urbanist text-[18px] font-medium leading-[1.25] mb-[48px]">
                      will send a link to reset your password
                    </div>
                    {/* <label htmlFor="password" className="newPassword">New password</label> */}
                    <input
                      className="inputPassword rounded-[100px] bg-white flex w-[367px] h-[47.472px] p-[8px_8px_8px_24px] items-center gap-[8px] mx-auto mb-[12px] placeholder:color-#090a10 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[150%] placeholder:opacity-30"
                      placeholder="New password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* <label className="passwordCode"htmlFor="password">Reset password code</label> */}
                    <input
                      className="inputPasswordCode mb-[60px] rounded-[100px] bg-white flex w-[367px] h-[47.472px] p-[8px_8px_8px_24px] items-center gap-[8px] placeholder:color-#090a10 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[150%] placeholder:opacity-30"
                      placeholder="Reset Password code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />

                    <div>
                      {error && (
                        <div className="errorMessage text-white flex text-left font-urbanist text-[16px] font-normal mx-auto mt-[-5px] mb-[5px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="errorImage bg-red-600 rounded-[50%]"
                          >
                            <path
                              d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                              fill="white"
                            />
                          </svg>{' '}
                          <div className="message ml-[5px] mt-[-5px] text-left font-urbanist text-[16px] font-normal break-words">{error}</div>
                        </div>
                      )}
                    </div>

                    <button className="reset rounded-[30px] bg-[#f6ff82] flex w-[367px] p-[10px_24px] justify-center items-center gap-[8px] text-[#8e94e9] text-center font-urbanist text-[20px] font-bold leading-[1.25] tracking-[0.4px] mx-auto mb-[12px]">Reset</button>
                    <div className="help text-white font-urbanist text-[16px] font-medium leading-[150%] mx-auto">
                      Having problems? Email us at{' '}
                      <a className="helpEmail text-white font-urbanist text-[16px] font-bold leading-[125%] tracking-[0.32px]" href="mailto:help@makefwb.com">
                        help@makefwb.com
                      </a>
                    </div>
                  </div>
                </>
              )}

              {complete && (
                <div className="passwordContainer inline-flex h-[728px] w-[698px] p-[110px_161px_109.48px_162px] flex flex-col justify-center items-center flex-shrink-0 rounded-[60px] border-[2px] border-white bg-[rgba(255,255,255,0.15)] shadow-[0px_4px_4px_rgba(255,255,255,0.25)] backdrop-blur-[12.5px] m-auto xl-max:!border-0 xl-max:!bg-transparent xl-max:!shadow-none">
                  <div className="successImage rounded-[50%]  border border-white border-[1px] mb-[20px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="32"
                      viewBox="0 0 33 32"
                      fill="none"
                    >
                      <path
                        d="M12.283 21.0985L7.71718 16.5327C7.47135 16.2863 7.1376 16.1479 6.78955 16.1479C6.4415 16.1479 6.10775 16.2863 5.86192 16.5327C5.34876 17.0459 5.34876 17.8748 5.86192 18.388L11.3619 23.888C11.8751 24.4011 12.704 24.4011 13.2172 23.888L27.1382 9.96692C27.6514 9.45376 27.6514 8.62481 27.1382 8.11166C26.8924 7.86527 26.5587 7.72681 26.2106 7.72681C25.8626 7.72681 25.5288 7.86527 25.283 8.11166L12.283 21.0985Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="success text-white text-center font-urbanist text-[40px] font-medium leading-[110%] mb-[4px]">Success!!</div>
                  <div className="successMessage text-white text-center font-urbanist text-[18px] font-medium leading-[125%] mb-[64px]">
                    Yeyyy... You have successfully change your password
                  </div>
                  <Link href="/sign-in" className="reset rounded-[30px] bg-[#f6ff82] flex w-[367px] p-[10px_24px] justify-center items-center gap-[8px] text-[#8e94e9] text-center font-urbanist text-[20px] font-bold leading-[1.25] tracking-[0.4px] mx-auto mb-[12px]">
                    Go to Sign In Page
                  </Link>
                </div>
              )}

              {/* <button className="reset">Go to Sign In Page</button> */}
              {secondFactor && '2FA is required, this UI does not handle that'}
            </form>
          </div>
        </div>
      )}
      {width > 901 && width < 1200 && <LargeScreen />}
      {width < 901 && <SmallScreen />}
    </div>
  )
}
