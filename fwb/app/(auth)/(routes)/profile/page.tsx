import { DiscountData, UserData } from '@/app/types/types'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Profile from './Profile'
import { Box, Container } from '@mui/material'
import { Suspense } from 'react'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import DiscountButtons from '@/components/ui/profile/DiscountButtons'
import Benefits from '@/components/ui/profile/Benefits'
import ProfileSkeleton from '@/components/ui/skeletons/variants/ProfileSkeleton'
import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import AddBenefitCTA from '@/components/ui/profile/AddBenefitCTA'
import CustomerBenefitList from '@/components/ui/profile/CustomerBenefitList'
import BenefitsClient from '@/components/ui/profile/BenefitsClient'

export async function getUser(bearer_token: string, supabase_jwt: string) {
  const userId = await auth().userId
  if (!supabase_jwt) {
    console.log('Not signed in')
    return
  }

  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabase_jwt)
  myHeaders.append('Authorization', `Bearer ${bearer_token}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

const page = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const userData: UserData =
    bearer_token && supabase_jwt
      ? await getUser(bearer_token, supabase_jwt)
      : undefined
  const discountIdArray = userData ? userData.users[0].user_discounts : ['']
  const discountData: DiscountData[] =
    userData && bearer_token && supabase_jwt
      ? await getAllDiscountsData(discountIdArray, bearer_token, supabase_jwt)
      : []

  const filteredDiscountData = discountData.filter(
    (company) => company !== undefined
  )
  const AsyncProfile = async () => {
    const bearer_token = await auth().getToken({ template: 'testing_template' })
    const supabase_jwt = await auth().getToken({ template: 'supabase' })
    const userData: UserData =
      bearer_token && supabase_jwt
        ? await getUser(bearer_token, supabase_jwt)
        : undefined
    if (
      userData.users[0].hasCompletedFRE[0] &&
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[2]
    ) {
    } else {
      if (!userData || !userData.users[0].hasCompletedFRE[0]) {
        redirect('/fre1')
      } else if (
        !userData.users[0].hasCompletedFRE[2] &&
        !userData.users[0].hasCompletedFRE[1] &&
        userData.users[0].hasCompletedFRE[0]
      ) {
        redirect('/fre2')
      } else if (
        !userData.users[0].hasCompletedFRE[2] &&
        userData.users[0].hasCompletedFRE[1] &&
        userData.users[0].hasCompletedFRE[0]
      ) {
        redirect('/fre3')
      }
    }

    return <Profile userData={userData} isPublic={false} />
  }

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
            {filteredDiscountData.length ? (
              <CustomerBenefitList
                filteredDiscountData={filteredDiscountData}
              />
            ) : (
              <AddBenefitCTA />
            )}
          </Suspense>
        </div>
      </Container>
    </Box>
  )
}

export default page
