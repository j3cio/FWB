'use client'

import { useState, useEffect, useCallback, FC } from 'react'
import Button from '@mui/material/Button'
import OTPField from '@/components/ui/fre/otp'

import IllustrationOne from '@/components/ui/fre/IllustrationOne'
import IllustrationTwo from '@/components/ui/fre/IllustrationTwo'

export default function Page() {
  const [isInvalid, setisInvalid] = useState(false)

  return (
    <div className="flex w-full h-screen overflow-hidden justify-between px-[100px]">
      <IllustrationOne />
      <div className="mt-[43px]">
        {isInvalid && (
          <div className="bg-[#ED455D] text-center mb-[15px]">
            <div className="font-[#FFF] font-[16px] mx-[90px] my-[3px]">
              Invalid verification code, Please try again.
            </div>
          </div>
        )}

        <div className="w-[690px] rounded-[60px] border-2 border-white bg-opacity-15 backdrop-blur-md shadow-md pb-[105px] pt-[123px] relative">
          <div className="text-white text-center font-semibold text-4xl mx-auto mb-[16px]">
            Email Verification
          </div>
          <div className="text-white text-center font-[16px] mb-[91px]">
            Please enter verification code that we sent you <br></br> through
            email
          </div>
          <div>
            <OTPField />
          </div>
          <div className="w-full flex">
            <Button
              variant="contained"
              style={{
                margin: 'auto',
                width: '336px',
                background: '#ADB4D2',
                borderRadius: '30px',
                textDecoration: 'none',
              }}
              disabled
            >
              Submit
            </Button>
          </div>
          <div className="w-full flex flex-row justify-center mt-[10px]">
            <div className="text-white text-[16px]">
              Didn’t get a verification code?
            </div>
            <div className="text-white text-[16px] font-semibold ml-[4px] cursor-pointer">
              Resend code
            </div>
          </div>
        </div>
      </div>
      <IllustrationTwo />
    </div>
  )
}
