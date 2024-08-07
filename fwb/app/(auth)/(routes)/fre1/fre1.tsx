'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import IllustrationOne from '@/components/ui/fre/IllustrationOne'
import IllustrationTwo from '@/components/ui/fre/IllustrationTwo'
import { NextButton } from '@/components/ui/fre/fre1/NextButton'
import { ProfilePictureSelector } from '@/components/ui/fre/fre1/ProfilePictureSelector'
import { UsernameForm } from '@/components/ui/fre/fre1/UsernameForm'
import {
  generateRandomUsername,
  updateProfilePicture,
  chooseProfilePicture,
  updateClerkUsername,
  handleSubmitUser,
} from './utils'

export default function UserFlowPage1() {
  const [username, setUsername] = useState<string>('')
  const [optimisticImageUrl, setOptimisticImageUrl] = useState<string | null>(
    null
  )

  const router = useRouter()
  const { isSignedIn, user } = useUser()

  const generateAndSetUsername = useCallback(() => {
    const newUsername = generateRandomUsername()
    setUsername(newUsername)
    return newUsername
  }, [])

  const handleUpdateClerkUsername = useCallback(() => {
    if (user && username && username.trim() !== '') {
      updateClerkUsername(user, username)
    }
  }, [user, username])

  const handleUpdateProfilePicture = useCallback(() => {
    updateProfilePicture(user)
  }, [user])

  const handleChooseProfilePicture = useCallback(
    (image: string) => {
      chooseProfilePicture(image, user, setOptimisticImageUrl)
    },
    [user]
  )

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      handleSubmitUser(router)
    },
    [router]
  )

  useEffect(() => {
    if (!username) {
      generateAndSetUsername()
    }
  }, [username, generateAndSetUsername])

  useEffect(() => {
    if (user && username) {
      handleUpdateClerkUsername()
    }
  }, [username])

  if (isSignedIn) {
    return (
      <div className="flex h-screen justify-center md:justify-between">
        <div className="hidden md:block">
          <IllustrationOne />
        </div>
        <div className="md:flex-shrink-0 md:pl-[142px] md:pr-[143px]">
          <div className="mt-8 flex justify-center md:mt-[103px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="8"
              viewBox="0 0 56 8"
              fill="none"
            >
              <circle cx="4" cy="4" r="4" fill="#F6FF82" />
              <circle cx="28" cy="4" r="4" fill="#ADB4D2" />
              <circle cx="52" cy="4" r="4" fill="#ADB4D2" />
            </svg>
          </div>
          <h2 className="mt-8 text-center font-urbanist text-2xl font-medium leading-[110%] tracking-[0.1rem] text-white md:mt-[61px] md:text-[40px]">
            Welcome to Friends with Benefits!
          </h2>
          <h5 className="mb-[28px] mt-[8px] text-center text-xs font-medium leading-[125%] text-white md:text-[18px]">
            Let&apos;s create your profile.
          </h5>

          <ProfilePictureSelector
            user={user}
            optimisticImageUrl={optimisticImageUrl}
            chooseProfilePicture={handleChooseProfilePicture}
            updateProfilePicture={handleUpdateProfilePicture}
          />

          <UsernameForm
            username={username}
            setUsername={setUsername}
            updateClerkUsername={handleUpdateClerkUsername}
            updateClerkWithRandomUsername={generateAndSetUsername}
          />

          <NextButton handleSubmitUser={handleSubmit} />
        </div>
        <div className="hidden md:block">
          <IllustrationTwo />
        </div>
      </div>
    )
  }
}
