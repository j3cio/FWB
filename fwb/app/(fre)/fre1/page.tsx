"use client";

import './page.css';
import Link from "next/link";
import Image from 'next/image'
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import IllustrationOne from "@/components/ui/fre/IllustrationOne";
import IllustrationTwo from "@/components/ui/fre/IllustrationTwo";


export default function UserFlowPage1() {

  //TODO: Username verification feature, onChange run code to show user Username is available (possibly grey out Next Option)
  //TODO: Update UI To make Random Name Generation more clear (Icon)

  //Utilizing useUser from Clerk to update user's profile picture / username
  const { isSignedIn, user, isLoaded } = useUser()

  //Creating Random Name Generation Feature for User
  const [randomName, setrandomName] = useState<any | null>(null)

  //Initializes random username on the first render of webpage
  useEffect(() => {
    setrandomName(generateRandomUsername());
  }, []);

  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  if (!isLoaded || !isSignedIn) {
    return null
  }

  //Function to Allow user to Upload their own Profile Picture
  const updateProfilePicture = () => {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!.setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource);
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error);
        });
    } else {
      console.warn('No file selected.');
    };
  };

  //Functions to Allow user to choose amongst our default options for their Profile Picture
  const convertFilePathToBlob = async (image: any) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob; //Image file needed to be converted to blob from string to be uploaded to Clerk
    } catch (error) {
      console.error('Error converting file path to Blob:', error);
      return null;
    }
  };

  //Taking converted blob file and updating User's Profile Picture based on button click
  const chooseProfilePicture = async (image: string) => {
    const file = await convertFilePathToBlob(image);

    if (file) {
      // Use Clerk's setProfileImage method to update the profile picture
      user!.setProfileImage({ file })
        .then((imageResource) => {
          console.log('Profile picture updated:', imageResource);
        })
        .catch((error) => {
          console.error('Error updating profile picture:', error);
        });
    } else {
      console.warn('No file selected.');
    };
  };

  //Function to randomly choose option from an array and then combines options to return username
  function generateRandomUsername() {
    function getRandomElement(arr: any) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      return arr[randomIndex]
    }

    const adjList = ['amazing', 'excellent', 'fabulous', 'gorgeous', 'incredible', 'outstanding', 'spectacular', 'stunning', 'upbeat', 'wondrous']
    const animalList = ['bird', 'dog', 'cat', 'goat', 'lizard', 'penguin', 'seal', 'lion', 'shark', 'gecko']

    const randomAdj = getRandomElement(adjList)
    const randomAnimal = getRandomElement(animalList)
    const randomNumber = Math.floor(Math.random() * 1000)

    const username = `${randomAdj}${randomAnimal}${randomNumber}`
    return username
  }

  //Function updates the state of our random username to be displayed on the webpage
  function updateRandomUsername() {
    const newRandomUsername = generateRandomUsername()
    setrandomName(newRandomUsername)
  }

  //Function to update User's username on Clerk
  function updateUsername() {
    const newUsernameInput = document.getElementById('newUsername') as HTMLInputElement;
    const newUsername = newUsernameInput?.value;

    //If the user provides a username in the input, we will use that
    if (newUsername) {
      // Use Clerk's update method to update the username
      user!.update({ username: newUsername })
        .then((updatedUser) => {
          console.log('Username updated:', updatedUser);
        })
        .catch((error) => {
          console.error('Error updating username:', error);
        });
    } else {
      console.warn('Please enter a new username.');
    };

    //If the user doesn't provide a username, we will take current randomName state and use that
    if (!newUsername) {
      user!.update({ username: randomName })
      .then((updatedUser) => {
        console.log('Username updated:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating username:', error);
      })
    };
  };

  // Render the First Run Experience if the User has been verified
  if (isSignedIn) {
  return (
    <div className="pageContent">
      <IllustrationOne />
      <div className="middleSpacing">
        <div className="progresscircles">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="8" viewBox="0 0 56 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#F6FF82"/>
            <circle cx="28" cy="4" r="4" fill="#ADB4D2"/>
            <circle cx="52" cy="4" r="4" fill="#ADB4D2"/>
          </svg>
        </div>
        <h2 className="mainHeader">Welcome to Friends with Benefits!</h2>
        <h5 className="subtext">Let&apos;s create your profile.</h5>

        {/*Container for the entire Profile Picture Feature */}
        <div>
          <div>

            {/*Container to display current user profile picture */}
            <div className='flex justify-center'>
              <div 
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

            {/*Container to allow users to upload a personal profile picture*/}
            <div>
              <div className='addPhoto'>
                <div className='mx-4 my-4 flex justify-center pl-32'>
                  <input type="file" id="profilePicture" accept="image/*"/>
                </div>
                <div className='flex justify-center'>

                  {/*Button that when clicked runs function to update picture on Clerk*/}
                  <button type="button" className="updatePhoto" onClick={updateProfilePicture}>
                    Add profile photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*Containers to allow user to pick amongst 8 default options */}
          {/*SVG Icon is displayed on screen to maintain resolution but PNG is uploaded to Clerk */}
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

        {/* This is the form that will handle username input  */}
        <form id="usernameForm" className="flex justify-center">
          <input
            type="text"
            id="newUsername"
            className="inputusername"
            placeholder= {randomName}
          />

          {/* Random Usernmae Generation Button when Clicked  */}
          <button className="randomName" type="button" onClick={updateRandomUsername}>

            {/* Icon SVG that comes from Figma Design  */}
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 40 40" fill="none">
              <rect x="1.5" y="1.5" width="37" height="37" rx="18.5" fill="white"/>
              <rect x="1.5" y="1.5" width="37" height="37" rx="18.5" stroke="#8E94E9" stroke-width="3"/>
              <path d="M25.5965 11.9998C24.959 11.9998 24.3477 12.253 23.8969 12.7037L13.133 23.4676L12 27.9998L16.5322 26.8667L27.296 16.1029C27.7468 15.6521 28 15.0408 28 14.4033C28 13.7658 27.7468 13.1545 27.296 12.7037C26.8453 12.253 26.2339 11.9998 25.5965 11.9998Z" fill="#8E94E9" stroke="#8E94E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>

        {/* This is the link functionality to carry user to stage 2 & update username  */}
        <div className="flex justify-center">
          <Link href='/fre2' className="next" onClick={updateUsername}>
            Next !
          </Link>
        </div>
      </div>
      <IllustrationTwo />
    </div>
  )};
};