import React, { FC, useState, useRef, useEffect } from 'react'

interface Props {}
let currentOTPIndex: number = 0

const OTPField: FC<Props> = (props): JSX.Element => {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [activeOTPIndex, setActiveOTPIndex] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    const newOTP: string[] = [...otp]
    newOTP[currentOTPIndex] = value.substring(value.length - 1)

    if (!value) setActiveOTPIndex(currentOTPIndex - 1)
    else setActiveOTPIndex(currentOTPIndex + 1)

    setOtp(newOTP)
  }

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index
    if (e.key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1)
  }

  useEffect(() => {
    inputRef.current?.focus()
    console.log(otp)
  }, [activeOTPIndex])

  const empty = {
    opacity: '30%',
    color: 'white',
    background: 'rgba(255, 255, 255, 0.50)',
  }

  const full = {
    opacity: '100%',
    background: 'white',
    color: '#8E94E9',
  }

  return (
    <div className="flex justify-center items-center space-x-4 mb-[131px]">
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={activeOTPIndex === index ? inputRef : null}
              type="number"
              className={
                'w-[80px] h-[80px] border-2 rounded outline-none text-center font-semibold text-[40px] border-white focus:opacity-100  focus:bg-transparent focus:text-white transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              }
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
              style={
                otp[index] == '' || activeOTPIndex === index ? empty : full
              }
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default OTPField
