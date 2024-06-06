'use client'
import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSignUp, useUser } from '@clerk/nextjs'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import GooglePic from '@/public/google.png'

export const SmallScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [inputError, setinputError] = useState(false)

  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    setCode(code)
  }, [code])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded) {
      return
    }

    try {
      setError(null)
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // change the UI to our pending section.
      setPendingVerification(true)

      /*const magicLinkFlow = signUp.createEmailLinkFlow()
      await magicLinkFlow.startEmailLinkFlow({
        redirectUrl: 'https://staging.app.makefwb.com/success',
      }) // local development: http://localhost:3000/success*/
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError(err)
    }
  }

  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  //This allows User to sign in with Google
  const signUpWithGoogle = async () => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${process.env.SIGNIN_REDIRECT_LINK}`,
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
  const [error, setError] = useState<any>(null)
  if (user) {
    // Redirect authenticated user to the profile page
    router.replace('/profile')
    return null // You can also render a loading state or redirect message here
  }

  //Verify code
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
    <div className="flex h-screen w-screen flex-row">
      {!pendingVerification && (
        <div className="flex h-screen w-full flex-row">
          <div className="z-10 mx-auto inline-flex border-0 bg-none p-0 shadow-none sm-max:mt-[160px] xs-max:mt-[80px] xxs-max:mt-[64px]">
            <div className="signInContent">
              <div className="mb-[80px] overflow-hidden whitespace-nowrap text-center font-urbanist text-[40px] font-normal leading-[110%] text-white xxs-max:text-[24px] small-max:mb-[40px]">
                Create Account
              </div>
              <div className="mb-4 flex items-center justify-center">
                <button
                  className="mr-[22.6px] h-[45.216px] w-[45.216px] items-center justify-center rounded-[28.26px] border-[1.413px] border-white pb-[1px] pl-[8px] xxs-max:h-[30px] xxs-max:w-[30px] xxs-max:p-[5px]"
                  onClick={signUpWithGoogle}
                >
                  <Image src={GooglePic} alt="Google Icon" />
                </button>
                <button
                  className="h-[45.216px] w-[45.216px] items-center justify-center rounded-full border-[1.413px] border-white sm-max:p-[7px] xs-max:p-[7px] xxs-max:h-[30px] xxs-max:w-[30px] xxs-max:p-[5px]"
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
              <div className="mb-4 flex items-center justify-center font-urbanist text-[16px] font-medium leading-[150%] text-white">
                Or
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="mb-[16px] flex w-[367px] items-center gap-[8px] rounded-full bg-white p-[8px_8px_8px_24px] sm-max:w-[387px] xs-max:w-[341px] xxs-max:w-[272px]"
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
                          className="-mt-[5px] mb-[5px] flex text-left font-urbanist text-[16px] font-normal text-white"
                          key={passwordError.meta.paramName}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="rounded-full bg-red-600"
                          >
                            <path
                              d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                              fill="white"
                            />
                          </svg>{' '}
                          <div className="-mt-[5px] ml-[5px] break-words text-left font-urbanist text-[16px] font-normal">
                            {passwordError.message}
                          </div>
                        </div>
                      ))}
                </div>
                <div>
                  <input
                    className="mb-[16px] flex w-[367px] items-center gap-[8px] rounded-full bg-white p-[8px_8px_8px_24px] sm-max:w-[387px] xs-max:w-[341px] xxs-max:w-[272px]"
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
                        className="-mt-[5px] mb-[5px] flex text-left font-urbanist text-[16px] font-normal text-white"
                        key={passwordError.meta.paramName}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 17"
                          fill="none"
                          className="rounded-full bg-red-600"
                        >
                          <path
                            d="M12.1997 4.49463C12.0752 4.36979 11.9061 4.29964 11.7297 4.29964C11.5534 4.29964 11.3843 4.36979 11.2597 4.49463L7.99974 7.74796L4.73974 4.48796C4.61518 4.36312 4.44608 4.29297 4.26974 4.29297C4.09339 4.29297 3.92429 4.36312 3.79974 4.48796C3.53974 4.74796 3.53974 5.16796 3.79974 5.42796L7.05974 8.68796L3.79974 11.948C3.53974 12.208 3.53974 12.628 3.79974 12.888C4.05974 13.148 4.47974 13.148 4.73974 12.888L7.99974 9.62796L11.2597 12.888C11.5197 13.148 11.9397 13.148 12.1997 12.888C12.4597 12.628 12.4597 12.208 12.1997 11.948L8.93974 8.68796L12.1997 5.42796C12.4531 5.17463 12.4531 4.74796 12.1997 4.49463Z"
                            fill="white"
                          />
                        </svg>{' '}
                        <div className="-mt-[5px] ml-[5px] break-words text-left font-urbanist text-[16px] font-normal">
                          {passwordError.message}
                        </div>
                      </div>
                    ))}
                <div className="mb-[64px] flex xs-max:mb-[80px] xxs-max:mb-[42px]">
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
                  className="flex h-[48px] w-[366px] items-center justify-center gap-2 rounded-[30px] bg-[#f6ff82] px-[24px] py-[10px] text-center font-urbanist text-[24px] font-normal leading-[125%] tracking-[0.48px] text-[#8e94e9] sm-max:w-[387px] xs-max:w-[341px] xxs-max:h-[36px] xxs-max:w-[272px] xxs-max:text-[16px]"
                  type="submit"
                >
                  Submit
                </button>
                <div className="flex items-center justify-center">
                  <div className="pr-[5px] font-urbanist text-[16px] font-normal leading-[150%] text-white xxs-max:text-[12px]">
                    Already have an account?
                  </div>
                  <Link
                    href="/sign-in"
                    className="flex h-[36px] items-center justify-center gap-1 py-2 font-urbanist text-[16px] font-bold leading-[125%] tracking-[0.32px] text-white xxs-max:text-[12px]"
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
            <div className="error absolute z-10 flex h-[5vh] w-full items-center justify-center bg-[#ED455D] py-[15px] text-[2vh] text-white">
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
                  className={`mt-[150px] flex h-[48px] w-[80%] items-center justify-center gap-2 rounded-[30px] bg-[#f6ff82] px-[24px] py-[10px] text-center font-urbanist text-[24px] font-normal leading-[125%] tracking-[0.48px] text-[#8e94e9] ${code.search(' ') !== -1 || code.length !== 6 ? 'bg-[#ADB4D2] text-[#CED2E4]' : ''}`}
                  disabled={
                    code.search(' ') === -1 && code.length === 6 ? false : true
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
  )
}
