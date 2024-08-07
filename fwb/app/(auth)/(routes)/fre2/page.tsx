import { auth } from '@clerk/nextjs'
import UserFlowPage2 from './fre2'
import { redirect } from 'next/navigation'
import { TestUser } from '@/app/types/types'
import { getUser } from '@/app/api/users/utils/user_utils'

const page = async () => {
  const userId = await auth().userId

  if (!userId) {
    throw new Error("Couldn't retrieve user")
  }
  const userData: TestUser = await getUser(userId)

  if (userData) {
    if (!userData || !userData.hasCompletedFRE[0]) {
      redirect('/fre1')
    } else if (
      userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0] &&
      !userData.hasCompletedFRE[2]
    ) {
      redirect('/fre3')
    } else if (
      userData.hasCompletedFRE[2] &&
      userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0]
    ) {
      redirect('/profile')
    }
  } else {
    redirect('/fre1')
  }

  return (
    <div>
      <UserFlowPage2 userData={userData} />
    </div>
  )
}

export default page
