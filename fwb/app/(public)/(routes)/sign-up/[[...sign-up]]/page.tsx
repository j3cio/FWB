'use client'
import { useEffect, useState, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSignUp, useUser } from '@clerk/nextjs'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import { VerifyPhoto1 } from './VerifyPhoto1'
import { VerifyPhoto2 } from './VerifyPhoto2'
import { VerifyPhoto3 } from './VerifyPhoto3'
import { VerifyPhoto4 } from './VerifyPhoto4'
import { VerifyPhoto5 } from './VerifyPhoto5'

import useWindowDimensions from '@/components/hooks/useWindowDimensions'
import GooglePic from '@/public/google.png'
import TwitterPic from '@/public/twitter.png'

import { LargeScreen } from './screenLarge'
import { SmallScreen } from './screenSmall'

import './page.css'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [inputError, setinputError] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const width = useWindowDimensions()

  const [error, setError] = useState<any>(null)

  // Track local storage to determine if user being redirect to sign in comes from sign up page
  const searchParams = useSearchParams()

  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  useEffect(() => {
    const currentUrl = window.location.href
    const userAction = currentUrl.includes('/sign-up') ? 'signup' : 'signin'
    localStorage.setItem('userAction', userAction)
  }, [searchParams])

  useEffect(() => {
    if (user) {
      // Redirect authenticated user to the profile page
      router.replace('/fre1')
      return // You can also render a loading state or redirect message here
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // This verifies the user using email code that is delivered.
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2))
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        console.log('pushing to fre1')
        router.push('/fre1')
      }
    } catch (err: any) {
      setinputError(true)
      resetCode()
      console.error(JSON.stringify(err, null, 2))
    }
  }

  //This allows User to sign in with Google
  const signUpWithGoogle = async () => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback', // 'https://musical-collie-80.clerk.accounts.dev/v1/oauth_callback',
        redirectUrlComplete: '/success',
      })
    } catch (error) {
      console.error('Error signing in with Google', error)
    }
  }

  //This allows User to sign in with Discord
  const signUpWithDiscord = async () => {
    try {
      const response = await signUp?.authenticateWithRedirect({
        strategy: 'oauth_discord',
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
        redirectUrlComplete: '/success',
      })

      console.log(response)
    } catch (error) {
      console.error('Error signing in with Discord', error)
    }
  }

  //This handles user's input
  const handleInput = (input: string, index: number) => {
    setinputError(false)
    const previousInput = inputRefs[index - 1]
    const nextInput = inputRefs[index + 1]

    const newCode = Array.from(code)

    newCode[index] = input
    setCode(newCode.join(''))

    if (input === '') {
      // If the value is deleted, select previous input, if exists
      if (previousInput && previousInput.current) {
        previousInput.current.focus()
      }
    } else if (nextInput && nextInput.current) {
      // Select next input on entry, if exists
      nextInput.current.select()
    }
  }

  //This selects input when user clicks an input box
  const handleFocus = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    if (target.select) {
      target.select()
    }
  }

  //This handles keyboard events (e.g. Backspace, Enter)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target as HTMLInputElement
    let previousInput = inputRefs[index - 1]

    if (e.key === 'Enter') {
      if (code.search(' ') !== -1 || code.length !== 6) {
      } else if (input.form) {
        // If there is no next input, submit the form
        handleVerify(e)
      }
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()

      // If there is a value in the current input, delete it
      if (input.value !== '') {
        input.value = ''
        setCode(
          (prevCode) =>
            prevCode.slice(0, index) + ' ' + prevCode.slice(index + 1)
        )

        e.preventDefault()
      } else if (previousInput && previousInput.current) {
        previousInput.current.value = ''

        setCode(
          (prevCode) =>
            prevCode.slice(0, index - 1) + ' ' + prevCode.slice(index)
        )

        //focus on previous box
        previousInput.current.focus()
      }
    }
  }

  //This handles paste action
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setinputError(false)
    const pastedCode = e.clipboardData.getData('text')
    if (pastedCode.length === 6) {
      setCode(pastedCode)
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) {
          inputRef.current.value = pastedCode.charAt(index)
        }
      })
    }
  }

  //This resets the code
  const resetCode = () => {
    inputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.value = ''
      }
    })
    if (inputRefs[0].current) {
      inputRefs[0].current.focus()
    }

    setCode('')
  }

  return (
    <div className="pageHeight">
      {width > 1201 && (
        <div>
          {!pendingVerification && (
            <div className="big">
              <div className="leftSigninContainer xl-max:w-[350px]">
                <div className="circle1 xl-max:h-[136px] xl-max:w-[134px]"></div>
                <div className="h-[150px] w-[293px] bg-[url('/fre0/BubbleFriend.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[134px] xl-max:w-[268px]"></div>
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="h-[150px] w-[150px] bg-[url('/fre0/BubbleHi.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[136px] xl-max:w-[136px]"></div>
                    <div className="h-[452px] w-[150px] bg-[url('/fre0/BubbleGirl.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[405px] xl-max:w-[136px]"></div>
                    <div className="circle6 xl-max:h-[136px] xl-max:w-[134px]"></div>
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

              <div className="rightSigninContainer">
                <div className="signin xl-max:border-0 xl-max:bg-transparent xl-max:shadow-none">
                  <div className="name">Create Account</div>
                  <div className="buttons">
                    <button className="googleButton" onClick={signUpWithGoogle}>
                      <Image src={GooglePic} alt="Google Icon" />
                    </button>
                    <button
                      className="discordButton"
                      onClick={signUpWithDiscord}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 27 21"
                        fill="none"
                      >
                        <path
                          d="M22.5638 2.45395C20.9174 1.68365 19.157 1.12382 17.3166 0.805054C17.0905 1.2137 16.8265 1.76335 16.6444 2.20059C14.688 1.90636 12.7495 1.90636 10.8291 2.20059C10.647 1.76335 10.377 1.2137 10.1489 0.805054C8.30648 1.12382 6.54406 1.6857 4.89768 2.45803C1.57691 7.47615 0.6767 12.3696 1.1268 17.1936C3.32932 18.8384 5.46381 19.8376 7.56229 20.4914C8.08042 19.7783 8.54251 19.0203 8.9406 18.2214C8.18243 17.9333 7.45627 17.5778 6.77013 17.165C6.95216 17.0302 7.13021 16.8892 7.30223 16.7441C11.4872 18.7015 16.0343 18.7015 20.1692 16.7441C20.3433 16.8892 20.5213 17.0302 20.7013 17.165C20.0132 17.5798 19.285 17.9353 18.5268 18.2234C18.9249 19.0203 19.385 19.7804 19.9052 20.4934C22.0057 19.8396 24.1421 18.8405 26.3446 17.1936C26.8728 11.6014 25.4424 6.75285 22.5638 2.45395ZM9.51074 14.2269C8.25446 14.2269 7.22421 13.0541 7.22421 11.6259C7.22421 10.1977 8.23246 9.02286 9.51074 9.02286C10.7891 9.02286 11.8193 10.1956 11.7973 11.6259C11.7993 13.0541 10.7891 14.2269 9.51074 14.2269ZM17.9607 14.2269C16.7044 14.2269 15.6742 13.0541 15.6742 11.6259C15.6742 10.1977 16.6824 9.02286 17.9607 9.02286C19.239 9.02286 20.2692 10.1956 20.2472 11.6259C20.2472 13.0541 19.239 14.2269 17.9607 14.2269Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="or">Or</div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        className="input"
                        placeholder="Email@address.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                      />
                    </div>
                    <div>
                      {error &&
                        error.errors
                          .filter(
                            (err: any) => err.meta.paramName === 'email_address'
                          )
                          .map((passwordError: any) => (
                            <div
                              className="errorMessage"
                              key={passwordError.meta.paramName}
                            >
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
                              <div className="message">
                                {passwordError.message}
                              </div>
                            </div>
                          ))}
                    </div>
                    <div>
                      <input
                        className="input"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                      />
                    </div>
                    {error &&
                      error.errors
                        .filter((err: any) => err.meta.paramName === 'password')
                        .map((passwordError: any) => (
                          <div
                            className="errorMessage"
                            key={passwordError.meta.paramName}
                          >
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
                            <div className="message">
                              {passwordError.message.length > 50 ? (
                                <>
                                  {passwordError.message.substring(0, 50)}
                                  <br />
                                  {passwordError.message.substring(50)}
                                </>
                              ) : (
                                passwordError.message
                              )}
                              {/* {passwordError.message} */}
                            </div>
                          </div>
                        ))}
                    <div className="remember">
                      <FormControlLabel
                        sx={{ height: '24px' }}
                        label={
                          <Typography
                            style={{
                              color: '#fff',
                              fontFamily: 'Urbanist',
                            }}
                          >
                            Remember me
                          </Typography>
                        }
                        control={
                          <Checkbox
                            value="remember"
                            sx={{
                              color: '#fff',
                            }}
                          ></Checkbox>
                        }
                      ></FormControlLabel>
                    </div>
                    <ul></ul>
                    <button className="submit" type="submit">
                      Submit
                    </button>
                    <div className="signup">
                      <div className="detail">Already have an account? </div>
                      <Link href="/sign-in" className="signupButton">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {pendingVerification && (
            <div className="relative block h-screen w-full overflow-hidden">
              <div className="container overflow-hidden">
                <div className="leftContainer translate-y-[-30px]">
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
                  <div className="h-[150px] w-[150px] bg-[url('/fre0/BubbleHi.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[136px] xl-max:w-[136px]"></div>
                  <div className="h-[452px] w-[150px] bg-[url('/fre0/BubbleGirl.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[405px] xl-max:w-[136px]"></div>
                  <div className="yellowBox xl-max:h-[134px] xl-max:w-[134px]"></div>
                </div>
                <div className="middleContainer h-screen w-[50%]">
                  <div
                    className={`border-box errorContainer mb-[30px] flex w-full justify-center`}
                  >
                    <div
                      className={`error flex h-[4vh] items-center justify-center bg-[#ED455D] py-[15px] text-[2vh] text-white ${inputError ? 'flex' : 'hidden'} absolute top-[50px] w-[35%] rounded-md`}
                    >
                      <p>Invalid verification code, Please try again.</p>
                    </div>
                  </div>

                  <div className="signin h-[80%]">
                    <div className="verification flex flex-col items-center justify-center text-white">
                      <h1 className="text-center text-[5vh] font-medium">
                        Email Verification
                      </h1>
                      <p className="w-[80%] text-center text-[2vh] font-light">
                        Please enter verification code that we sent you through
                        email
                      </p>
                    </div>
                    <div className="verificationForm">
                      <form
                        onSubmit={handleVerify}
                        className="flex flex-col items-center"
                      >
                        <div className="inputBox mt-[100px] flex w-screen justify-center gap-[8px] px-[15px]">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                              className={`flex h-[4vw] w-[4vw] rounded-md border-[1px] bg-white p-2 text-center text-[22px] focus:bg-opacity-0 focus:text-white focus:opacity-100 focus:outline-none ${Array.from(code)[index] && Array.from(code)[index] !== '' && Array.from(code)[index] !== ' ' ? 'bg-opacity-100 text-[#8E94E9] opacity-100' : 'bg-opacity-40 opacity-40'} ${inputError ? 'border-red-500 !opacity-100' : 'border-white'}`}
                              key={index}
                              onChange={(e) =>
                                handleInput(e.target.value, index)
                              }
                              ref={inputRefs[index]}
                              autoFocus={index === 0}
                              onFocus={handleFocus}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              onPaste={handlePaste}
                              maxLength={1}
                            />
                          ))}
                        </div>
                        {/*<label id="code">Code</label>
                        <input
                          value={code}
                          id="code"
                          name="code"
                          onChange={(e) => setCode(e.target.value)}
                        />*/}
                        {
                          <button
                            type="submit"
                            className={`submit mt-[150px] w-[20%] ${code.search(' ') !== -1 || code.length !== 6 ? 'bg-[#ADB4D2] text-[#CED2E4]' : ''}`}
                            disabled={
                              code.search(' ') === -1 && code.length === 6
                                ? false
                                : true
                            }
                          >
                            Submit
                          </button>
                        }
                      </form>
                      <div className="resend mt-[20px] flex w-full justify-center text-lg text-white">
                        <p className="pr-[7px] text-[2vh] font-light">
                          Didn’t get a verification code?{' '}
                        </p>
                        <form onSubmit={handleSubmit}>
                          <button className="text-[2vh] font-semibold">
                            Resend code
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightContainer translate-y-[-50px]">
                  <div className="rightHalfCircle xl-max:w-[134px]"></div>
                  <div className="bagIcon xl-max:h-[134px] xl-max:w-[134px]">
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
                  <div className="h-[474px] w-[150px] bg-[url('/fre0/BubbleBoy.svg')] bg-contain bg-center bg-no-repeat xl-max:h-[425px] xl-max:w-[136px]"></div>

                  <div className="circle7">
                    <div className="circle7second"></div>
                    <div className="circle7third"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {width > 901 && width < 1200 && <LargeScreen />}
      {width < 901 && (
        <div>
          {!pendingVerification && (
            <div className="flex h-screen w-full flex-row">
              <div className="z-10 mx-auto inline-flex border-0 bg-none p-0 shadow-none sm-max:mt-[160px] xs-max:mt-[80px] xxs-max:mt-[64px]">
                <div className="signInContent">
                  <div className="name xxs-max:text-[24px] small-max:mb-[40px]">
                    Create Account
                  </div>
                  <div className="buttons">
                    <button
                      className="googleButton xxs-max:h-[30px] xxs-max:w-[30px] xxs-max:p-[5px]"
                      onClick={signUpWithGoogle}
                    >
                      <Image src={GooglePic} alt="Google Icon" />
                    </button>
                    <button
                      className="discordButton sm-max:p-[7px] xs-max:p-[7px] xxs-max:h-[30px] xxs-max:w-[30px] xxs-max:p-[5px]"
                      onClick={signUpWithDiscord}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 27 21"
                        fill="none"
                      >
                        <path
                          d="M22.5638 2.45395C20.9174 1.68365 19.157 1.12382 17.3166 0.805054C17.0905 1.2137 16.8265 1.76335 16.6444 2.20059C14.688 1.90636 12.7495 1.90636 10.8291 2.20059C10.647 1.76335 10.377 1.2137 10.1489 0.805054C8.30648 1.12382 6.54406 1.6857 4.89768 2.45803C1.57691 7.47615 0.6767 12.3696 1.1268 17.1936C3.32932 18.8384 5.46381 19.8376 7.56229 20.4914C8.08042 19.7783 8.54251 19.0203 8.9406 18.2214C8.18243 17.9333 7.45627 17.5778 6.77013 17.165C6.95216 17.0302 7.13021 16.8892 7.30223 16.7441C11.4872 18.7015 16.0343 18.7015 20.1692 16.7441C20.3433 16.8892 20.5213 17.0302 20.7013 17.165C20.0132 17.5798 19.285 17.9353 18.5268 18.2234C18.9249 19.0203 19.385 19.7804 19.9052 20.4934C22.0057 19.8396 24.1421 18.8405 26.3446 17.1936C26.8728 11.6014 25.4424 6.75285 22.5638 2.45395ZM9.51074 14.2269C8.25446 14.2269 7.22421 13.0541 7.22421 11.6259C7.22421 10.1977 8.23246 9.02286 9.51074 9.02286C10.7891 9.02286 11.8193 10.1956 11.7973 11.6259C11.7993 13.0541 10.7891 14.2269 9.51074 14.2269ZM17.9607 14.2269C16.7044 14.2269 15.6742 13.0541 15.6742 11.6259C15.6742 10.1977 16.6824 9.02286 17.9607 9.02286C19.239 9.02286 20.2692 10.1956 20.2472 11.6259C20.2472 13.0541 19.239 14.2269 17.9607 14.2269Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="or">Or</div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        className="input sm-max:w-[387px] xs-max:w-[341px] xxs-max:w-[272px]"
                        placeholder="Email@address.com"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                      />
                    </div>
                    <div>
                      {error &&
                        error.errors
                          .filter(
                            (err: any) => err.meta.paramName === 'email_address'
                          )
                          .map((passwordError: any) => (
                            <div
                              className="errorMessage"
                              key={passwordError.meta.paramName}
                            >
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
                              <div className="message">
                                {passwordError.message}
                              </div>
                            </div>
                          ))}
                    </div>
                    <div>
                      <input
                        className="input sm-max:w-[387px] xs-max:w-[341px] xxs-max:w-[272px]"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                      />
                    </div>
                    {error &&
                      error.errors
                        .filter((err: any) => err.meta.paramName === 'password')
                        .map((passwordError: any) => (
                          <div
                            className="errorMessage"
                            key={passwordError.meta.paramName}
                          >
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
                            <div className="message">
                              {passwordError.message}
                            </div>
                          </div>
                        ))}
                    <div className="remember mb-[64px] xs-max:mb-[80px] xxs-max:mb-[42px]">
                      <FormControlLabel
                        sx={{ height: '24px' }}
                        label={
                          <Typography
                            style={{
                              color: '#fff',
                              fontFamily: 'Urbanist',
                            }}
                          >
                            Remember me
                          </Typography>
                        }
                        control={
                          <Checkbox
                            value="remember"
                            sx={{ color: '#fff' }}
                          ></Checkbox>
                        }
                      ></FormControlLabel>
                    </div>
                    <ul></ul>
                    <button
                      className="submit sm-max:w-[387px] xs-max:w-[341px] xxs-max:h-[36px] xxs-max:w-[272px] xxs-max:text-[16px]"
                      type="submit"
                    >
                      Submit
                    </button>
                    <div className="signup">
                      <div className="detail xxs-max:text-[12px]">
                        Already have an account?{' '}
                      </div>
                      <Link
                        href="/sign-in"
                        className="signupButton xxs-max:text-[12px]"
                      >
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className=" absolute left-0 top-[30%] z-0 w-full xxs-max:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="30%"
                  viewBox="0 0 600 554"
                  fill="none"
                >
                  <path
                    opacity="0.1"
                    d="M2419 270.808C2055.64 432.28 1977.33 22.903 1742.24 239.744C1628.22 344.903 1793.32 501.159 1878.97 302.189C1964.05 104.525 1607.83 14.999 1430.54 218.721C1257.78 417.247 1151.34 397.121 1057.68 249.322C964.022 101.523 1187.33 37.162 1144.67 234.998C1132.9 289.593 1102.84 356.512 1077.74 384.795C994.817 478.219 752.143 615.404 443.763 416.756C154.046 230.13 -227.152 298.53 -300.874 384.795C-474 587.376 234.241 540.174 177.766 272.111C164.183 207.638 56.1332 142.758 4.55475 117.8C4.55475 117.8 -191.254 20.2077 -397 36.9266"
                    stroke="white"
                    strokeWidth="70"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          )}

          {pendingVerification && (
            <div className="w-full">
              {inputError && (
                <div className="error z-10 flex h-[5vh] w-full items-center justify-center bg-[#ED455D] py-[15px] text-[2vh] text-white">
                  Invalid verification code, Please try again.
                </div>
              )}
              <div className="verification mt-[100px] flex flex-col items-center justify-center text-white">
                <h1 className="text-center text-[5vh] font-medium">
                  Email Verification
                </h1>
                <p className="w-[80%] text-center text-[2vh] font-light">
                  Please enter verification code that we sent you through email
                </p>
              </div>
              <div className="verificationForm">
                <form
                  onSubmit={handleVerify}
                  className="flex flex-col items-center"
                >
                  <div className="inputBox mt-[150px] flex w-screen justify-center gap-[8px] px-[15px]">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        className={`flex h-[13vw] w-[13vw] rounded-md border-[1px] bg-white p-2 text-center text-[22px] focus:bg-opacity-0 focus:text-white focus:opacity-100 focus:outline-none ${Array.from(code)[index] && Array.from(code)[index] !== '' && Array.from(code)[index] !== ' ' ? 'bg-opacity-100 text-[#8E94E9] opacity-100' : 'bg-opacity-40 opacity-40'} ${inputError ? 'border-red-500 !opacity-100' : 'border-white'}`}
                        key={index}
                        onChange={(e) => handleInput(e.target.value, index)}
                        ref={inputRefs[index]}
                        autoFocus={index === 0}
                        onFocus={handleFocus}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        maxLength={1}
                      />
                    ))}
                  </div>
                  {/*<label id="code">Code</label>
              <input
                value={code}
                id="code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
              />*/}
                  {
                    <button
                      type="submit"
                      className={`submit mt-[150px] w-[80%] ${code.search(' ') !== -1 || code.length !== 6 ? 'bg-[#ADB4D2] text-[#CED2E4]' : ''}`}
                      disabled={
                        code.search(' ') === -1 && code.length === 6
                          ? false
                          : true
                      }
                    >
                      Submit
                    </button>
                  }
                </form>
                <div className="resend mt-[20px] flex w-full justify-center text-lg text-white">
                  <p className="pr-[7px] text-[2vh] font-light">
                    Didn’t get a verification code?{' '}
                  </p>
                  <form onSubmit={handleSubmit}>
                    <button className="text-[2vh] font-semibold">
                      Resend code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
