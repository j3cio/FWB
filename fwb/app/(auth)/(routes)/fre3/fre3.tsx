'use client'

import { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  FacebookMessengerShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share'

import IllustrationFive from '@/components/ui/fre/IllustrationFive'
import IllustrationSix from '@/components/ui/fre/IllustrationSix'
import FacebookMessengerIcon from '@/components/ui/icons/FacebookMessengerIcon'
import WhatsappIcon from '@/components/ui/icons/WhatsappIcon'
import TwitterIcon from '@/components/ui/icons/TwitterIcon'

import useWindowDimensions from '@/components/hooks/useWindowDimensions'
import CloseIcon from '@/components/ui/fre/CloseIcon'
import { handleKeyDown, handleShare, changeFRE } from './utils'

export default function UserFlowPage3() {
  const [emailInput, setEmailInput] = useState<string>('')
  const [emailAddresses, setEmailAddresses] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(
      e,
      emailInput,
      setEmailInput,
      setEmailAddresses,
      setErrorMessage
    )
  }

  const onShare = () => {
    handleShare(emailAddresses, setErrorMessage)
  }

  //removing emails
  const handleRemoveEmail = (index: number) => {
    setEmailAddresses((prevEmails) => {
      const updatedEmails = [...prevEmails]
      updatedEmails.splice(index, 1)
      return updatedEmails
    })
  }

  //sending emails

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    changeFRE(router)

    event.preventDefault()

    try {
      setEmailAddresses([])
      setEmailInput('')
      router.push('/profile')
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const onChangeFRE = () => {
    changeFRE(router)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row lg:justify-between lg:overflow-hidden">
      <div className="hidden lg:block">
        <IllustrationFive />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 lg:px-36">
        <div className="mt-8 flex justify-center lg:mt-[103px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="8"
            viewBox="0 0 56 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#ADB4D2" />
            <circle cx="28" cy="4" r="4" fill="#ADB4D2" />
            <circle cx="52" cy="4" r="4" fill="#F6FF82" />
          </svg>
        </div>
        <h2 className="mb-[16px] mt-7 text-center font-urbanist text-2xl font-semibold leading-[110%] tracking-[0.1rem] text-white lg:mt-[135px] lg:text-[40px]">
          Share with Your Friends!
        </h2>
        <h5 className="mt-2 text-center font-urbanist text-xs font-normal leading-[125%] text-white lg:text-base">
          Spread the love and be the wingman to someone else&apos;s wallet!
        </h5>

        <div className="mt-5 flex items-center justify-center gap-4 lg:mt-16">
          <FacebookMessengerShareButton
            url="https://app.makefwb.com/sign-up"
            appId="1461933537691569"
          >
            <FacebookMessengerIcon />
          </FacebookMessengerShareButton>
          <WhatsappShareButton
            url="https://app.makefwb.com/sign-up"
            title="Swipe right on savings, left on full price. Join Friends with Benefits where people share access to their employee discounts!"
          >
            <WhatsappIcon />
          </WhatsappShareButton>
          <TwitterShareButton
            url="https://app.makefwb.com/sign-up"
            title="Swipe right on savings, left on full price. Join Friends with Benefits where people share access to their employee discounts!"
          >
            <TwitterIcon />
          </TwitterShareButton>
        </div>
        <h5 className="my-6 text-center font-urbanist text-sm font-medium leading-[125%] text-white lg:text-lg">
          Or
        </h5>

        <form
          id="invitations"
          className="mx-auto flex w-full flex-col items-center justify-center self-stretch rounded-[10px] bg-white p-3 lg:w-[544px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-wrap items-start">
            {emailAddresses.map((email, index) => (
              <span key={index} className="email-item">
                <div className="flex">
                  <div className="mb-[5px] mr-[5px] flex h-7 gap-1 rounded-full bg-[#adb4d2] px-[10px] py-[2px] font-urbanist text-sm leading-[150%] text-white lg:text-base">
                    {email}
                    <div onClick={() => handleRemoveEmail(index)}>
                      <CloseIcon />
                    </div>
                  </div>
                </div>
              </span>
            ))}
          </div>

          <input
            type="text"
            className={`flex h-6 w-full bg-white font-urbanist text-sm outline-none placeholder:text-[#090a10] placeholder:opacity-30 lg:text-base ${errorMessage ? 'error' : ''}`}
            placeholder="Invite your friends..."
            id="emailInput"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </form>
        {errorMessage && (
          <div className="error-message text-white">{errorMessage}</div>
        )}
        <div className="mt-8 flex flex-col items-center lg:mt-28">
          <button
            className="mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-[30px] bg-[#f6ff82] px-6 py-2.5 text-center font-urbanist text-base font-semibold leading-[125%] tracking-[0.2px] text-[#8e94e9] lg:w-[367px] lg:text-xl"
            type="button"
            onClick={onShare}
          >
            Share with My Friends
          </button>
          <div
            className="mt-1 cursor-pointer font-urbanist text-base font-semibold leading-[125%] tracking-[0.8px] text-white lg:text-xl"
            onClick={onChangeFRE}
          >
            Skip for now
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <IllustrationSix />
      </div>
    </div>
  )
}
