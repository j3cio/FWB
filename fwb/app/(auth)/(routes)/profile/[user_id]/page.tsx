import { Suspense } from 'react'

import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'

import Profile from '../Profile'
import { getDiscountIdsArray, getUser, getUserDiscountTable } from '../page'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import DiscountButtons from '@/components/ui/profile/DiscountButtons'
import Benefits from '@/components/ui/profile/Benefits'
import ProfileSkeleton from '@/components/ui/skeletons/variants/ProfileSkeleton'

import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'

import { TestUser, UserToDiscounts } from '@/app/types/types'

const AsyncProfile = async () => {
  const userData: TestUser = await getUser()

  if (!userData) {
    redirect('/explore')
  }

  return <Profile userData={userData} isPublic={false} />
}

const AsyncBenefits = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  if (!bearer_token || !supabase_jwt) {
    return null
  }
  const userToDiscountsTable: UserToDiscounts[] = await getUserDiscountTable(
    bearer_token,
    supabase_jwt
  )

  const discountIds = getDiscountIdsArray(userToDiscountsTable)

  const discountData = getAllDiscountsData(
    discountIds,
    bearer_token,
    supabase_jwt
  )

  return <Benefits discountData={discountData} />
}

const page = async ({ params }: { params: { user_id: string } }) => {
  return (
    <Box
      sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
      className="px-[18px] sm-max:items-start sm-max:px-8 xs-max:items-start xs-max:px-6 xxs-max:items-start xxs-max:px-4"
    >
      <Container disableGutters maxWidth="lg">
        <div>
          <Suspense fallback={<ProfileSkeleton />}>
            <AsyncProfile />
          </Suspense>{' '}
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
