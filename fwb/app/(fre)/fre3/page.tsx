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
          <div className="flex justify-center">
            <Link href='/' className="next">
              <div>Start Saving</div>
              {/* SVG Icon for arrow from Figma Design */}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5.20874 13H16.3787L11.4987 17.88C11.1087 18.27 11.1087 18.91 11.4987 19.3C11.8887 19.69 12.5187 19.69 12.9087 19.3L19.4987 12.71C19.8887 12.32 19.8887 11.69 19.4987 11.3L12.9187 4.69996C12.7319 4.5127 12.4783 4.40747 12.2137 4.40747C11.9492 4.40747 11.6956 4.5127 11.5087 4.69996C11.1187 5.08996 11.1187 5.71996 11.5087 6.10996L16.3787 11H5.20874C4.65874 11 4.20874 11.45 4.20874 12C4.20874 12.55 4.65874 13 5.20874 13Z"
                    fill="#8E94E9"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <IllustrationSix />
    </div>
  )
};