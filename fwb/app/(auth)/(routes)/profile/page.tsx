import { TestUser } from '@/app/types/types'
import Benefits from '@/components/ui/profile/Benefits'
import DiscountButtons from '@/components/ui/profile/DiscountButtons'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import ProfileSkeleton from '@/components/ui/skeletons/variants/ProfileSkeleton'
import { auth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Profile from './Profile'
import { getUser, getUserDiscounts } from './profileUtils'

const AsyncProfile = async () => {
  const userId = await auth().userId

  if (!userId) {
    throw new Error("Couldn't retrieve user")
  }
  const userData: TestUser = await getUser(userId)

  if (
    userData.hasCompletedFRE[0] &&
    userData.hasCompletedFRE[1] &&
    userData.hasCompletedFRE[2]
  ) {
  } else {
    if (!userData || !userData.hasCompletedFRE[0]) {
      redirect('/fre1')
    } else if (
      !userData.hasCompletedFRE[2] &&
      !userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0]
    ) {
      redirect('/fre2')
    } else if (
      !userData.hasCompletedFRE[2] &&
      userData.hasCompletedFRE[1] &&
      userData.hasCompletedFRE[0]
    ) {
      redirect('/fre3')
    }
  }

  return <Profile userData={userData} isPublic={false} />
}

const AsyncBenefits = async () => {
  const userId = await auth().userId

  if (!userId) {
    throw new Error("Couldn't retrieve user")
  }
  const discountData = await getUserDiscounts(userId)

  if (!discountData) {
    throw new Error('Could not return discounts')
  }

  return <Benefits discountData={discountData} />
}

const page = () => {
  return (
    <Box
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
      className="px-[18px] sm-max:items-start sm-max:px-8 xs-max:items-start xs-max:px-6 xxs-max:items-start xxs-max:px-4"
    >
      <Container disableGutters maxWidth="lg">
        <div>
          <Suspense fallback={<ProfileSkeleton />}>
            <AsyncProfile />
          </Suspense>
          <DiscountButtons />

          <div className="my-[80px] flex h-2/5 border-b-2 border-slate-200 text-3xl text-white sm-max:text-xl xs-max:text-xl xxs-max:text-xl">
            My Benefits!
          </div>

          <Suspense
            fallback={
              <div className="flex w-full justify-center">
                <div className="flex flex-wrap justify-start gap-4">
                  {generateSkeletons({ type: 'ProductCard', quantity: 8 })}
                </div>
              </div>
            }
          >
            <AsyncBenefits />
          </Suspense>
        </div>
      </Container>
    </Box>
  )
}

export default page
