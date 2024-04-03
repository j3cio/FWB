import { UserData } from '@/app/types/types'
import {
  FemaleFourSVG,
  FemaleOneSVG,
  FemaleThreeSVG,
  FemaleTwoSVG,
  MaleFourSVG,
  MaleOneSVG,
  MaleThreeSVG,
  MaleTwoSVG,
} from '@/public/profilepics/SVG'
import { useAuth, useUser } from '@clerk/nextjs'
import { Avatar, Modal } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

//things to do
//edit photo
type EditProfileModalProps = {
  isOpen: boolean
  onClose(): void
  userData: UserData
}

//TODO:
//Edge Case: Currently if the username or company is null on supabase it causes and error in the patch request

const EditProfileModal = ({
  isOpen,
  onClose,
  userData,
}: EditProfileModalProps) => {
  const { userId } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [optimisticImageUrl, setOptimisticImageUrl] = useState<string | null>(
    null
  )
  const [refresh, setRefresh] = useState(true)

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

  //Functions to Allow user to choose amongst our default options for their Profile Picture
  const convertFilePathToBlob = async (image: any) => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      return blob //Image file needed to be converted to blob from string to be uploaded to Clerk
    } catch (error) {
      console.error('Error converting file path to Blob:', error)
      return null
    }
  }

  const handleXClick = () => {
    setInputValue('')
    setInputCompany('')
    onClose()
  }

  const [inputValue, setInputValue] = useState('')
  const [inputCompany, setInputCompany] = useState('')

  const handleClearClick = () => {
    //when click the button clear the input value
    setInputValue('')
    setInputCompany('')
  }

  const updateUser = async () => {
    const supabaseToken = await window.Clerk.session.getToken({
      template: 'supabase',
    })
    const bearerToken = await window.Clerk.session.getToken({
      template: 'testing_template',
    })

    const headers = new Headers({
      Authorization: `Bearer ${bearerToken}`,
      supabase_jwt: supabaseToken,
      apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    } as HeadersInit)

    const formData = new FormData()
    formData.append('username', inputValue)
    formData.append('company', inputCompany)
    formData.append('user_id', userId as string)

    try {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: 'PATCH',
          headers,
          body: formData,
        }
      )
      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`)
      }
      const result = await userResponse.json()
      return result // This returns the result object
    } catch (error) {
      console.error('Error updating data: ', error)
      throw error // This re-throws the error to be handled by the caller
    }
  }

  const handleFormSubmit = async () => {
    updateUser()
    onClose()
    router.refresh()
    setRefresh(!refresh)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="modal-content relative xxs-max:h-screen xs-max:w-full sm-max:w-[80%] xxs-max:rounded-none xxs-max:border-none xs-max:rounded-none xs-max:border-none"
        style={{
          borderRadius: '40px',
          border: '2px solid var(--Neutral-000, #FFF)',
          background: '#8E94E9',
          boxShadow: '0px 4px 4px 0px rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(100px)',
          padding: '20px',
          width: '788px',
          height: '722px',
        }}
      >
        <button onClick={handleXClick} className="hidden xxs-max:flex xs-max:flex gap-2">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.6594 9.17343H6.35107L10.4177 5.10676C10.7427 4.78176 10.7427 4.24843 10.4177 3.92343C10.262 3.76738 10.0507 3.67969 9.83024 3.67969C9.60981 3.67969 9.39843 3.76738 9.24274 3.92343L3.75107 9.41509C3.42607 9.74009 3.42607 10.2651 3.75107 10.5901L9.24274 16.0818C9.56774 16.4068 10.0927 16.4068 10.4177 16.0818C10.7427 15.7568 10.7427 15.2318 10.4177 14.9068L6.35107 10.8401H15.6594C16.1177 10.8401 16.4927 10.4651 16.4927 10.0068C16.4927 9.54843 16.1177 9.17343 15.6594 9.17343Z"
              fill="white"
            />
          </svg>
          <span className="font-urbanist text-white font-medium">Edit Profile</span>
        </button>
        {/* X Button*/}
        <svg
          xmlns="http://www.w3.org/2000/svg"

          className="xxs-max:hidden xs-max:hidden sm-max:ml-[85%]"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          style={{
            position: 'absolute',
            marginTop: '20px',
            marginLeft: '680px',
            cursor: 'pointer',
          }}
          onClick={handleXClick}
        >
          <path
            d="M30.5012 9.51659C30.1898 9.20451 29.767 9.02912 29.3262 9.02912C28.8853 9.02912 28.4626 9.20451 28.1512 9.51659L20.0012 17.6499L11.8512 9.49993C11.5398 9.18784 11.117 9.01245 10.6762 9.01245C10.2353 9.01245 9.81256 9.18784 9.50117 9.49993C8.85117 10.1499 8.85117 11.1999 9.50117 11.8499L17.6512 19.9999L9.50117 28.1499C8.85117 28.7999 8.85117 29.8499 9.50117 30.4999C10.1512 31.1499 11.2012 31.1499 11.8512 30.4999L20.0012 22.3499L28.1512 30.4999C28.8012 31.1499 29.8512 31.1499 30.5012 30.4999C31.1512 29.8499 31.1512 28.7999 30.5012 28.1499L22.3512 19.9999L30.5012 11.8499C31.1345 11.2166 31.1345 10.1499 30.5012 9.51659Z"
            fill="white"
          />
        </svg>
        <div className="flex items-center justify-center flex-col">
          <h2
            className="font-urbanist xxs-max:hidden xs-max:hidden"
            style={{
              color: 'var(--Neutral-000, #FFF)',
              textAlign: 'center',

              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '600',
              //lineHeight: "110%", // 35.2px
            }}
          >
            Edit Profile
          </h2>
          <div className="flex xxs-max:flex-col xs-max:flex-col items-center justify-center flex-row my-4">
            {/* Avatar */}
            <Avatar
              alt="123"
              src={`${user?.imageUrl}`}
              className="flex bg-slate-200 xxs-max:h-36 xxs-max:w-36 xs-max:h-40 xs-max:w-40 h-48 w-48 rounded-full justify-center items-center"
            />
            <div className="flex items-center justify-center flex-col m-4">

              <div className="hidden xs-max:flex xxs-max:flex font-urbanist font-semibold text-white text-sm">
                Edit photo
              </div>
              <div className="flex items-center justify-center flex-row m-4 gap-2">
                {/* First Row*/}
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/WomanOne.png')
                  }
                >
                  <FemaleOneSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/WomanTwo.png')
                  }
                >
                  <FemaleTwoSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/WomanThree.png')
                  }
                >
                  <FemaleThreeSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/WomanFour.png')
                  }
                >
                  <FemaleFourSVG width={50} height={50} />
                </button>
              </div>
              {/* Second Row */}
              <div className="flex items-center justify-center flex-row gap-2">
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/ManOne.png')
                  }
                >
                  <MaleOneSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/ManTwo.png')
                  }
                >
                  <MaleTwoSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/ManThree.png')
                  }
                >
                  <MaleThreeSVG width={50} height={50} />
                </button>
                <button
                  type="button"
                  id="chooseProfilePicture"
                  onClick={() =>
                    chooseProfilePicture('/profilepics/PNG/ManFour.png')
                  }
                >
                  <MaleFourSVG width={50} height={50} />
                </button>
              </div>
            </div>
          </div>
          <div
            className="font-urbanist xxs-max:hidden xs-max:hidden"
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '700',
              //lineHeight: "110%",
              letterSpacing: '0.4px',
              marginLeft: '-240px',
              marginTop: '18px',
            }}
          >
            Edit Photo
          </div>
          <div>
            <div
              className="font-urbanist"
              style={{
                marginTop: '34px',
                color: '#FFF',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                //lineHeight: "125%;",
              }}
            >
              User Name
            </div>
            <div
              style={{
                display: 'flex',
                height: '47.472px',
                padding: '4px 4px 4px 24px',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'stretch',
                borderRadius: '24px',
                background: 'var(--Neutral-000, #FFF)',
                width: '366px',

                marginTop: '8px',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  userData.users[0].username
                    ? `${userData.users[0].username}`
                    : `username`
                }
                style={{
                  //color: " var(--Neutral-900, #090A10);",
                  border: 'none',
                  background: 'transparent',
                  flex: 1,
                  outline: 'none',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  width: '39.472px',
                  height: '39.472px',
                  padding: '9.647px 10.005px 9.815px 9.456px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '123.35px',
                  background: 'var(--Purple-300, #8E94E9)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  onClick={handleClearClick}
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    d="M16.3689 4.76617C14.6704 3.06765 12.2633 2.08813 9.61652 2.35906C5.79223 2.74461 2.64527 5.84989 2.21803 9.67418C1.64491 14.7281 5.55256 18.99 10.4814 18.99C13.8055 18.99 16.6607 17.0414 17.9945 14.2383C18.328 13.5402 17.8278 12.7378 17.0567 12.7378C16.6711 12.7378 16.3064 12.9462 16.1397 13.2901C14.9622 15.8222 12.1383 17.427 9.05382 16.7392C6.74049 16.2286 4.87523 14.3425 4.38547 12.0292C3.51016 7.98608 6.58418 4.40146 10.4814 4.40146C12.2112 4.40146 13.7534 5.12047 14.8788 6.25629L13.3053 7.82977C12.6489 8.48626 13.1074 9.61166 14.0348 9.61166H17.7757C18.3488 9.61166 18.8177 9.14274 18.8177 8.56962V4.82869C18.8177 3.90128 17.6923 3.43236 17.0358 4.08885L16.3689 4.76617Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div
              className="font-urbanist"
              style={{
                marginTop: '8px',
                color: '#FFF',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                //lineHeight: "125%;",
              }}
            >
              Company Name
            </div>
            <div
              style={{
                display: 'flex',
                height: '47.472px',
                padding: '4px 4px 4px 24px',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'stretch',
                borderRadius: '24px',
                background: 'var(--Neutral-000, #FFF)',
                width: '366px',

                marginTop: '8px',
              }}
            >
              <input
                type="text"
                placeholder={
                  userData.users[0].company
                    ? `${userData.users[0].company}`
                    : `company name`
                }
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
                style={{
                  //color: " var(--Neutral-900, #090A10);",
                  border: 'none',
                  background: 'transparent',
                  flex: 1,
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            className="text-Purple-300 text-center font-Urbanist text-20 font-bold leading-125 tracking-0.4"
            onClick={handleFormSubmit}
            style={{
              display: 'flex',
              width: '366px',
              height: '48px',
              padding: '10px 24px',
              justifyContent: 'center',
              alignItems: 'center',
              letterSpacing: '0.4px',
              flexShrink: 0,
              borderRadius: '30px',
              background: 'var(--Yellow-300, #F6FF82)',
              color: 'var(--Purple-300, #8E94E9)',
              fontSize: '20px',
              fontStyle: 'normal',
              marginTop: '30px',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
