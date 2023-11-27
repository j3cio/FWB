"use client";

import React from 'react'
import './page.css';
import { useUser } from "@clerk/nextjs"
import { useSignIn } from '@clerk/nextjs';
import { useSignUp } from '@clerk/nextjs';

export default function Testing() {
  const { isLoaded } = useUser()
  const { signUp } = useSignUp()
  const { signIn } = useSignIn()

  if (!isLoaded ) {
    return null
  }

  const signUpWithDiscord = async () => {
    try {
      const response = await signUp?.authenticateWithRedirect({
        strategy: 'oauth_discord',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/success'
      });

      console.log(response)
    } catch (error) {
      console.error('Error signing in with Discord', error)
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={signUpWithDiscord}>Sign up with Discord</button>
    </div>
  )
}