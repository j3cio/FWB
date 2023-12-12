"use client";

import './page.css';
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import IllustrationFive from '@/components/ui/fre/IllustrationFive';
import IllustrationSix from '@/components/ui/fre/IllustrationSix';

export default function UserFlowPage3() {

  //TODO: Create Sharing Functionality to Send Emails with input field
  //TODO: Create Message Feature to open up personal chats when clicking on social icons

  //Error handeling for if user tries to access page not signed in or Clerk isn't ready
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  //OnClick Buttons to handle user redirect to respective socials to share with friends
  const handlewhatsapp = () => {
    window.open('https://www.whatsapp.com/')
  }

  const handleinstagram = () => {
    window.open('https://www.instagram.com/')
  }

  const handlediscord = () => {
    window.open('https://discord.com/')
  }


  return (
    <div className="pageContent">
      <IllustrationFive />
      <div className="middleSpacing">
        <div className="flex-col justify-center">
          <div className="progresscircles">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="8" viewBox="0 0 56 8" fill="none">
              <circle cx="4" cy="4" r="4" fill="#ADB4D2"/>
              <circle cx="28" cy="4" r="4" fill="#ADB4D2"/>
              <circle cx="52" cy="4" r="4" fill="#F6FF82"/>
            </svg>
          </div>
          <h2 className="mainHeader">Share with Your Friends!</h2>
          <h5 className="subtext">Spread the love and be the wingman to someone else&apos;s wallet!</h5>

          {/* This is the form that will handle email sharing  */}
          <form className="flex justify-center">
            <input
              type="email"
              className="inputfriends"
              placeholder="Tag Friends!"
            />
          </form>

          <h5 className='or'>Or</h5>

          {/* These are the social media redirect buttons that will handle email sharing  */}
          <div className='flex justify-center items-center space-x-4'>
            <button onClick={handlewhatsapp}>
              <img src='/socialicons/whatsapp.SVG' />
            </button>
            <button onClick={handleinstagram}>
              <img src='/socialicons/instagram.SVG' />
            </button>
            <button onClick={handlediscord}>
              <img src='/socialicons/discord.SVG' />
            </button>
          </div>

          {/* Redirects user back to landing page, Probably should be changed to explore later  */}
          <div>
            <div className='flex justify-center'>
              <Link href='/profile' className="next">
                Share with My Friends
              </Link>
            </div>
            <div className='flex justify-center'>
              <Link href='/profile' className="skip">Skip for now</Link>
            </div>
          </div>
        </div>
      </div>
      <IllustrationSix />
    </div>
  )
};