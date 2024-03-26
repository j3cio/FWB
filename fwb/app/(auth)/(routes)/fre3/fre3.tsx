'use client'

import { FormEvent, useState, KeyboardEvent, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import {
  FacebookMessengerShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from 'react-share'

import IllustrationFive from '@/components/ui/fre/IllustrationFive'
import IllustrationSix from '@/components/ui/fre/IllustrationSix'
import UpdateUser from '@/components/hooks/updateUser'
import FacebookMessengerIcon from '@/components/ui/icons/FacebookMessengerIcon'
import WhatsappIcon from '@/components/ui/icons/WhatsappIcon'
import TwitterIcon from '@/components/ui/icons/TwitterIcon'

import { UserData } from '../../../types/types'

import './page.css'

export default function UserFlowPage3({ userData }: { userData: UserData }) {
  //Error handling for if user tries to access page not signed in or Clerk isn't ready
  const { isSignedIn, user, isLoaded } = useUser()
  const [emailInput, setEmailInput] = useState<string>('')
  const [emailAddresses, setEmailAddresses] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  //Error handling for if user tries to access page not signed in or Clerk isn't ready
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userData.users[0]) {
      router.replace('/fre1')
      return
    }
    if (!userData || !userData.users[0].hasCompletedFRE[0]) {
      router.replace('/fre1')
    } else if (
      !userData.users[0].hasCompletedFRE[2] &&
      !userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      router.replace('/fre2')
    } else if (
      userData.users[0].hasCompletedFRE[2] &&
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      router.replace('profile')
    }
  }, [isLoaded, isSignedIn, userData, router])

  //adding emails
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (emailInput.trim() !== '') {
        setEmailAddresses((prevEmails) => [...prevEmails, emailInput])
        setEmailInput('')
      }
    }
  }

  //error message if input is empty
  const handleShare = async () => {
    if (emailAddresses.length === 0) {
      setErrorMessage('Please enter at least one email before sharing.')
      return
    }

    try {
      // Send emails
      const response = await axios.post('/api/invitations', {
        emails: emailAddresses,
      })

      // Reset state after sending emails
      setEmailAddresses([])
      setEmailInput('')

      // edirecting to the profile page
      window.location.href = '/profile'
    } catch (error) {
      console.error('Error sending email:', error)
    }
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
    changeFRE()

    event.preventDefault()

    try {
      const response = await axios.post('/api/invitations', {
        emails: emailAddresses,
      })

      // 이메일 전송 후 상태 초기화 또는 다른 작업 수행
      setEmailAddresses([])
      setEmailInput('')
      router.push('/profile')
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const changeFRE = async () => {
    try {
      const formData = new FormData()
      formData.append('hasCompletedFRE', '{true, true, true}')
      const response = await UpdateUser(formData)

      if (response) {
        router.push('/profile')
      } else {
        console.error('Error in updateUser')
      }
    } catch (error) {
      console.error('Error in updateUser:', error)
    }
  }

  return (
    <div className="pageContent">
      <IllustrationFive />
      <div className="middleSpacing">
        <div className="flex-col justify-center">
          <div className="progresscircles">
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
          <h2 className="mainHeader">Share with Your Friends!</h2>
          <h5 className="subtext">
            Spread the love and be the wingman to someone else&apos;s wallet!
          </h5>

          {/* This is the form that will handle email sharing  */}

          {/* These are the social media redirect buttons that will handle email sharing  */}
          {/* <div className="flex justify-center items-center space-x-4"> */}
          <div className="icons">
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
          <h5 className="or">Or</h5>

          <form id="invitations" className="emailForm" onSubmit={handleSubmit}>
            <div className="email-list">
              {emailAddresses.map((email, index) => (
                <span key={index} className="email-item">
                  <div className="emailInput">
                    <div className="emailItem">
                      {email}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        style={{
                          marginTop: '4px',
                          marginLeft: '5px',
                        }}
                        onClick={() => handleRemoveEmail(index)}
                      >
                        <path
                          d="M12.2005 4.02258C12.0759 3.89774 11.9068 3.82759 11.7305 3.82759C11.5541 3.82759 11.385 3.89774 11.2605 4.02258L8.00047 7.27591L4.74047 4.01591C4.61591 3.89108 4.44681 3.82092 4.27047 3.82092C4.09412 3.82092 3.92502 3.89108 3.80047 4.01591C3.54047 4.27591 3.54047 4.69591 3.80047 4.95591L7.06047 8.21591L3.80047 11.4759C3.54047 11.7359 3.54047 12.1559 3.80047 12.4159C4.06047 12.6759 4.48047 12.6759 4.74047 12.4159L8.00047 9.15591L11.2605 12.4159C11.5205 12.6759 11.9405 12.6759 12.2005 12.4159C12.4605 12.1559 12.4605 11.7359 12.2005 11.4759L8.94047 8.21591L12.2005 4.95591C12.4538 4.70258 12.4538 4.27591 12.2005 4.02258Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </span>
              ))}
            </div>

            <input
              type="text"
              className={`inputfriends ${errorMessage ? 'error' : ''}`}
              placeholder="Invite your friends..."
              id="emailInput"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* <button type="submit">Send inviations</button> */}
          </form>
          {errorMessage && (
            <div className="error-message" style={{ color: 'white' }}>
              {errorMessage}
            </div>
          )}
          {/* Redirects user back to landing page, Probably should be changed to explore later  */}
          <div className="shareButtons">
            {/* <Link href="/profile" className="next"> */}

            {/* <button className="next" type="submit" form="invitations"> */}
            <button className="next" type="button" onClick={handleShare}>
              Share with My Friends
            </button>
            {/* </Link> */}
            <div className="skip" onClick={changeFRE}>
              <div className="skipButton">Skip for now</div>
            </div>
          </div>
        </div>
      </div>
      <IllustrationSix />
    </div>
  )
}
