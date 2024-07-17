'use client'

import { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useUser } from '@clerk/nextjs'

import IllustrationOne from '@/components/ui/fre/IllustrationOne'
import IllustrationTwo from '@/components/ui/fre/IllustrationTwo'

import { NextButton } from '@/components/ui/fre/fre1/NextButton'
import { ProfilePictureSelector } from '@/components/ui/fre/fre1/ProfilePictureSelector'
import { UsernameForm } from '@/components/ui/fre/fre1/UsernameForm'
import { convertFilePathToBlob, generateRandomUsername } from './utils'

export default function UserFlowPage1() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [randomName, setRandomName] = useState<any | null>(null)
  const [optimisticImageUrl, setOptimisticImageUrl] = useState<string | null>(
    null
  )

  const newUsernameInput = document.getElementById(
    'newUsername'
  ) as HTMLInputElement
  const newUsername = newUsernameInput?.value

  //Add router to push to fre2 after making User API POST Request
  const router = useRouter()

  //Function to Allow user to Upload their own Profile Picture
  const updateProfilePicture = () => {
    const fileInput = document.getElementById(
      'profilePicture'
    ) as HTMLInputElement
    const file = fileInput?.files?.[0]

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!
        .setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource)
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error)
        })
    } else {
      console.warn('No file selected.')
    }
  }

  //Functions to Allow user to choose amongst our default options for their Profile Picture

  //Taking converted blob file and updating User's Profile Picture based on button click
  const chooseProfilePicture = async (image: string) => {
    const file = await convertFilePathToBlob(image)

    if (file) {
      // implementing Optimistic Loading (Update UI before making backend request)
      const optimisticImage = URL.createObjectURL(file)
      setOptimisticImageUrl(optimisticImage)

      // Use Clerk's setProfileImage method to update the profile picture
      user!
        .setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource)
          setOptimisticImageUrl(null) // if optimistic upload fails, revert to previous picture
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error)
          setOptimisticImageUrl(null)
        })
    } else {
      console.warn('No file selected.')
    }
  }

  //Function updates the state of our random username to be displayed on the webpage
  function changeRandomUsername() {
    const newRandomUsername = generateRandomUsername()
    setRandomName(newRandomUsername)
  }

  //Function to update User's username on Clerk
  const updateClerkUsername = useCallback(() => {
    //If the user provides a username in the input, we will use that
    if (newUsername) {
      // Use Clerk's update method to update the username
      user!
        .update({ username: newUsername })
        .then((updatedUser) => {
          console.log('Username updated:', updatedUser)
        })
        .catch((error) => {
          console.error('Error updating username:', error)
        })
    } else {
      console.warn('Please enter a new username.')
    }

    //If the user doesn't provide a username, we will take current randomName state and use that
    if (!newUsername) {
      user!
        .update({ username: randomName })
        .then((updatedUser) => {
          console.log('Username updated:', updatedUser)
        })
        .catch((error) => {
          console.error('Error updating username:', error)
        })
    }
  }, [newUsername, randomName, user])

  //Function to update User's username on Clerk with random username
  function updateClerkWithRandomUsername() {
    changeRandomUsername()
    updateClerkUsername()
  }

  //Function to POST User's information to Supabase
  const handleSubmitUser = async (e: any) => {
    e.preventDefault()

    try {
      const bearerToken = await window.Clerk.session.getToken({
        template: 'testing_template',
      })

      const supabaseToken = await window.Clerk.session.getToken({
        template: 'supabase',
      })

      const formData = new FormData()
      formData.append('user_discounts', '')
      formData.append('user_groups', '')
      formData.append('user_messages', '')
      formData.append('company', '')
      formData.append('verified', 'false')
      formData.append('hasCompletedFRE', '{true, false, false}')
      formData.append('blocked_users', '')
      formData.append('reported_users', '')

      // POST Fetch Request to Discounts API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          supabase_jwt: supabaseToken,
        },
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log('User added successfully:', data)
        router.push('/fre2')
      } else {
        const errorData = await response.json()
        console.error('Error adding user:', errorData)
      }
    } catch (error) {
      console.error('Error add user:', error)
    }
  }

  //Initializes random username on the first render of webpage
  useEffect(() => {
    setRandomName(generateRandomUsername())
  }, [])

  useEffect(() => {
    // Once our user exists, we don't have a manual name chosen, and our random name is generated, we update our username in clerk
    if (!newUsername && randomName && user) {
      updateClerkUsername()
    }
  }, [randomName, newUsername, user, updateClerkUsername])

  // Render the First Run Experience if the User has been verified
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
          <h5 className=" mb-[28px] mt-[8px] text-center text-xs font-medium leading-[125%] text-white md:text-[18px]">
            Let&apos;s create your profile.
          </h5>

          <ProfilePictureSelector
            user={user}
            optimisticImageUrl={optimisticImageUrl}
            chooseProfilePicture={chooseProfilePicture}
            updateProfilePicture={updateProfilePicture}
          />

          <UsernameForm
            randomName={randomName}
            setRandomName={setRandomName}
            updateClerkUsername={updateClerkUsername}
            updateClerkWithRandomUsername={updateClerkWithRandomUsername}
          />

          <NextButton handleSubmitUser={handleSubmitUser} />
        </div>
        <div className="hidden md:block">
          <IllustrationTwo />
        </div>
      </div>
    )
  }
}
