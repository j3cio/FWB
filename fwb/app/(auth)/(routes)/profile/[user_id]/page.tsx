import { Suspense } from 'react'

import { Box, Container } from '@mui/material'

import Profile from '../Profile'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import DiscountButtons from '@/components/ui/profile/DiscountButtons'
import Benefits from '@/components/ui/profile/Benefits'
import ProfileSkeleton from '@/components/ui/skeletons/variants/ProfileSkeleton'

import { TestUser } from '@/app/types/types'

import { getUser, getUserDiscounts } from '@/app/api/users/utils/user_utils'

const AsyncProfile = async ({ userId }: { userId: string }) => {
  const userData: TestUser = await getUser(userId)

  return <Profile userData={userData} isPublic={false} />
}

const AsyncBenefits = async ({ userId }: { userId: string }) => {
  const discountData = await getUserDiscounts(userId)

  if (!discountData) {
    throw new Error('Could not return discounts')
  }

  return <Benefits discountData={discountData} />
}

const page = async ({ params }: { params: { user_id: string } }) => {
  const { user_id } = params
  return (
    <Box
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
      className="px-[18px] sm-max:items-start sm-max:px-8 xs-max:items-start xs-max:px-6 xxs-max:items-start xxs-max:px-4"
    >
      <Container disableGutters maxWidth="lg">
        <div>
          <Suspense fallback={<ProfileSkeleton />}>
            <AsyncProfile userId={user_id} />
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
            <AsyncBenefits userId={user_id} />
          </Suspense>
        </div>
      </Container>
    </Box>
  )
}

export default page
