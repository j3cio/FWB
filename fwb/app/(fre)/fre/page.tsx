"use client";

import { useState, useEffect } from 'react';
import './page.css';
import IllustrationOne from "@/components/ui/fre/IllustrationOne";
import IllustrationTwo from "@/components/ui/fre/IllustrationTwo";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'

export default function UserFlowPage() {
  // TODO: User Profile Picture upload + choice option
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  // Function to allow User to upload thier own profile picture
  const updateProfilePicture = () => {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!.setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource);
          // You may want to update the UI to reflect the new profile picture
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error);
        });
    } else {
      console.warn('No file selected.');
    }
  }

  // Function to allow User to choose amongst our default options
  const convertFilePathToBlob = async (image: any) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error converting file path to Blob:', error);
      return null;
    }
  };

  const chooseProfilePicture = async (image: string) => {
    const file = await convertFilePathToBlob(image)

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!.setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource);
          // You may want to update the UI to reflect the new profile picture
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error);
        });
    } else {
      console.warn('No file selected.');
    }
  }

  // TODO: User Username random generation 
  const [randomName, setrandomName] = useState<any | null>(null)

  useEffect(() => {
    // Initialize randomName on the first render
    setrandomName(generateRandomUsername());
  }, []);

  function generateRandomUsername() {
    function getRandomElement(arr: any) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      return arr[randomIndex]
    }

    const adj = ['amazing', 'excellent', 'fabulous', 'gorgeous', 'incredible', 'outstanding', 'spectacular', 'stunning', 'upbeat', 'wondrous']
    const animal = ['bird', 'dog', 'cat', 'goat', 'lizard', 'penguin', 'seal', 'lion', 'shark', 'gecko']

    const randomAdj = getRandomElement(adj)
    const randomAnimal = getRandomElement(animal)
    const randomNumber = Math.floor(Math.random() * 1000)

    const username = `${randomAdj}${randomAnimal}${randomNumber}`

    return username
  }

  function updateRandomUsername() {
    const newRandomUsername = generateRandomUsername()
    setrandomName(newRandomUsername)
  }

  function updateUsername() {
    const newUsernameInput = document.getElementById('newUsername') as HTMLInputElement;
    const newUsername = newUsernameInput?.value;

    if (newUsername) {
      // Use Clerk's update method to update the username
      user!.update({ username: newUsername })
        .then((updatedUser) => {
          console.log('Username updated:', updatedUser);
          // You may want to update the UI to reflect the new username
        })
        .catch((error) => {
          console.error('Error updating username:', error);
        });
    } else {
      console.warn('Please enter a new username.');
    }

    if (!newUsername) {
      user!.update({ username: randomName })
      .then((updatedUser) => {
        console.log('Username updated:', updatedUser);
        // You may want to update the UI to reflect the new username
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      })
    }
  }

  if (isSignedIn) {
  return (
    <div className="big">
      <IllustrationOne />
      <div className="spacing">
          <div className="progresscircles">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="8" viewBox="0 0 56 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#F6FF82"/>
              <circle cx="28" cy="4" r="4" fill="#ADB4D2"/>
              <circle cx="52" cy="4" r="4" fill="#ADB4D2"/>
            </svg>
          </div>
          <h2 className="welcometitle">Welcome to Friends with Benefits!</h2>
          <h5 className="letscreate">Let's create your profile.</h5>
          <div className="profilepics">

            <div>
              <div className='flex justify-center'>
                <div //👈 wrap your Image tag
                className="flex h-[153px] w-[153px]"
                style={{
                  position: "relative",
                  width: "153px",
                  height: "153px",
                }}>
                  <Image
                    src={user.imageUrl}
                    alt= ''
                    fill
                    className='image'
                  />
                </div>
              </div>

              <div>
                <div className='addPhoto'>
                  <div className='mx-4 my-4 flex justify-center pl-32'>
                    <input type="file" id="profilePicture" accept="image/*"/>
                  </div>
                  <div className='flex justify-center'>
                    <button type="button" className="updatePhoto" onClick={updateProfilePicture}>Add profile photo</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center mt-4 space-x-4'>
                <button type="button" id="chooseProfilePicture" 
                onClick={() => chooseProfilePicture('/profilepics/PNG/WomanOne.png')}>
                  <img src='/profilepics/SVG/FemaleOne.svg' />
                </button>
                <button type="button" id="chooseProfilePicture" 
                onClick={() => chooseProfilePicture('/profilepics/PNG/WomanTwo.png')}>
                  <img src='/profilepics/SVG/FemaleTwo.svg' />
                </button>
                <button type="button" id="chooseProfilePicture" 
                onClick={() => chooseProfilePicture('/profilepics/PNG/WomanThree.png')}>
                  <img src='/profilepics/SVG/FemaleThree.svg' />
                </button>
                <button type="button" id="chooseProfilePicture" 
                onClick={() => chooseProfilePicture('/profilepics/PNG/WomanFour.png')}>
                  <img src='/profilepics/SVG/FemaleFour.svg' />
                </button>
              </div>
              <div className='flex justify-center mt-4 space-x-4'>
                <button type="button" id="chooseProfilePicture" 
                  onClick={() => chooseProfilePicture('/profilepics/PNG/ManOne.png')}>
                    <img src='/profilepics/SVG/MaleOne.svg' />
                  </button>
                  <button type="button" id="chooseProfilePicture" 
                  onClick={() => chooseProfilePicture('/profilepics/PNG/ManTwo.png')}>
                    <img src='/profilepics/SVG/MaleTwo.svg' />
                  </button>
                  <button type="button" id="chooseProfilePicture" 
                  onClick={() => chooseProfilePicture('/profilepics/PNG/ManThree.png')}>
                    <img src='/profilepics/SVG/MaleThree.svg' />
                  </button>
                  <button type="button" id="chooseProfilePicture" 
                  onClick={() => chooseProfilePicture('/profilepics/PNG/ManFour.png')}>
                    <img src='/profilepics/SVG/MaleFour.svg' />
                  </button>
              </div>
          



          </div>
            <form id="usernameForm" className="flex justify-center">
              <input
                type="text"
                id="newUsername"
                className="inputusername"
                placeholder= {randomName}
              />
              <button className="randomName" type="button" onClick={updateRandomUsername}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 40 40" fill="none">
                  <rect x="1.5" y="1.5" width="37" height="37" rx="18.5" fill="white"/>
                  <rect x="1.5" y="1.5" width="37" height="37" rx="18.5" stroke="#8E94E9" stroke-width="3"/>
                  <path d="M25.5965 11.9998C24.959 11.9998 24.3477 12.253 23.8969 12.7037L13.133 23.4676L12 27.9998L16.5322 26.8667L27.296 16.1029C27.7468 15.6521 28 15.0408 28 14.4033C28 13.7658 27.7468 13.1545 27.296 12.7037C26.8453 12.253 26.2339 11.9998 25.5965 11.9998Z" fill="#8E94E9" stroke="#8E94E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </form>

            <div className="flex justify-center">
              <Link href='/uf2' className="next" onClick={updateUsername}>Next !</Link>
            </div>
      </div>
      <IllustrationTwo />
    </div>
    //<UserButton afterSignOutUrl="/"/>
  )}
}
