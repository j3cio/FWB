'use client'
import React, { SyntheticEvent, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import './page.css'
import Link from 'next/link'

export const LargeScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [complete, setComplete] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState<any>(null)

  const { isLoaded, signIn, setActive } = useSignIn()

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
    <div className="h-screen w-full flex flex-row">
      <div className="flex w-auto h-auto flex-col mt-auto ml-auto translate-y-[70px]">
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleHi.svg')] w-[133px] h-[133px]"></div>
        <div className="bg-no-repeat bg-center bg-contain bg-[url('/fre0/BubbleGirl.svg')] w-[134px] h-[400px]"></div>
        <div className="circle6 lg:!w-[133px] lg:!h-[133px]"></div>
      </div>
      <div className="signin flex p-0 max-w-[556px] h-[728px] mx-0 my-auto w-2/3">
        <div className="absolute top-[50%] left-[50%] pn-[30px] translate-x-[-50%] translate-y-[-50%]">
          <form onSubmit={!successfulCreation ? create : reset}>
            {!successfulCreation && !complete && (
              <>
                <div className="h-screen flex relative">
                  <div className="passwordContainer border-0 bg-transparent shadow-none">
                    <svg
                      className="mail"
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

                    <div className="title">Forgot Password?</div>
                    <div className="explanation">
                      Dont worry! Enter your email address and we
                    </div>
                    <div className="explanation2">
                      will send a link to reset your password
                    </div>
                    {/* <label htmlFor='email'>Please provide identifier</label> */}
                    <input
                      type="email"
                      className="inputEmail"
                      placeholder="takeadvantage@address.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div>
                      {error && (
                        <div className="errorMessage">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="errorImage"
                          >
                            <path
                              d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                              fill="white"
                            />
                          </svg>{' '}
                          <div className="message">{error}</div>
                        </div>
                      )}
                    </div>

                    <button className="sendEmail">Send Email</button>
                    <div className="help">
                      Having problems? Email us at{' '}
                      <a className="helpEmail" href="mailto:help@makefwb.com">
                        help@makefwb.com
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            {successfulCreation && !complete && (
              <>
                <div className="passwordContainer xl:!border-0 xl:!bg-transparent xl:!shadow-none">
                  <div className="title">Reset Password</div>
                  <div className="explanation">
                    Enter new password with at least 8 charaters, contain at
                    least 1 number and 1 uppercase
                  </div>
                  <div className="explanation2">
                    will send a link to reset your password
                  </div>
                  {/* <label htmlFor="password" className="newPassword">New password</label> */}
                  <input
                    className="inputPassword"
                    placeholder="New password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* <label className="passwordCode"htmlFor="password">Reset password code</label> */}
                  <input
                    className="inputPasswordCode"
                    placeholder="Reset Password code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <div>
                    {error && (
                      <div className="errorMessage">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 17"
                          fill="none"
                          className="errorImage"
                        >
                          <path
                            d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                            fill="white"
                          />
                        </svg>{' '}
                        <div className="message">{error}</div>
                      </div>
                    )}
                  </div>

                  <button className="reset">Reset</button>
                  <div className="help">
                    Having problems? Email us at{' '}
                    <a className="helpEmail" href="mailto:help@makefwb.com">
                      help@makefwb.com
                    </a>
                  </div>
                </div>
              </>
            )}

            {complete && (
              <div className="passwordContainer xl:!border-0 xl:!bg-transparent xl:!shadow-none">
                <div className="successImage">
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
                <div className="success">Success!!</div>
                <div className="successMessage">
                  Yeyyy... You have successfully change your password
                </div>
                <Link href="/sign-in" className="reset">
                  Go to Sign In Page
                </Link>
              </div>
            )}

            {/* <button className="reset">Go to Sign In Page</button> */}
            {secondFactor && '2FA is required, this UI does not handle that'}
          </form>
        </div>
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
        <div className="lg:!w-[133px] lg:!h-[133px] lg:!ml-0 circle1"></div>
      </div>
    </div>
  )
}
