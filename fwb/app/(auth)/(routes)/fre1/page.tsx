import { TestUser } from '@/app/types/types'
import UserFlowPage1 from './fre1'
import { auth } from '@clerk/nextjs' // Import the redirect function from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUser } from '../profile/profileUtils'

const page = async () => {
  const userId = await auth().userId

  if (!userId) {
    throw new Error("Couldn't retrieve user")
  }
  const userData: TestUser = await getUser(userId)

  //Error handling for if user tries to access page not signed in or Clerk isn't ready
  if (userData) {
    if (!userData.hasCompletedFRE[1] && userData.hasCompletedFRE[0]) {
      redirect('/fre2')
    } else if (
      !userData.hasCompletedFRE[2] &&
      userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0]
    ) {
      redirect('/fre3')
    } else if (
      userData.hasCompletedFRE[2] &&
      userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0]
    ) {
      redirect('/profile')
    }
  }

  return (
    <div>
      <UserFlowPage1 />
    </div>
  )
}

export default page
