import { TestDiscountData, TestUser, UserToDiscounts } from '@/app/types/types'
import Benefits from '@/components/ui/profile/Benefits'
import DiscountButtons from '@/components/ui/profile/DiscountButtons'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import ProfileSkeleton from '@/components/ui/skeletons/variants/ProfileSkeleton'
import { auth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Profile from './Profile'
import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { createClient } from '@/supabase.server'

// Since this is a server component, we actually don't need to use a route handler here. Test performance to see if it's faster to directly contact supabase from this end
export async function getUser() {
  const userId = await auth().userId

  if (!userId) {
    throw new Error('UserId not found')
  }

  try {
    const supabase = await createClient()

    let { data: users, error } = await supabase
      .from('test_users')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw new Error(`HTTP error! ${error}`)
    }

    if (!users || users === null) {
      console.error('User not found')
    }

    if (users) {
      return users[0]
    }
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  } catch (error) {}
}

export async function getUserDiscounts() {
  const userId = await auth().userId
  const supabase = await createClient()

  if (!userId) {
    throw new Error('UserId not found')
  }

  let { data: discountIds, error } = await supabase
    .from('UserToDiscounts')
    .select('discount_id')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    throw new Error('Could not retrieve discountIds')
  }

  if (!discountIds || discountIds === null) {
    console.error('User not found')
  }

  if (discountIds) {
    const discountIdArray = discountIds.map((discount) => discount.discount_id)

    const { data: discounts, error: discountsError } = await supabase
      .from('test_discounts')
      .select('*')
      .in('id', discountIdArray)

    if (discountsError) {
      throw new Error('Failed to fetch discounts')
    }

    return discounts as TestDiscountData[]
  }

  try {
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}

export async function getUserDiscountTable(
  bearer_token: string,
  supabase_jwt: string
) {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/userToDiscount`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.discounts // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

export function getDiscountIdsArray(userToDiscountsTable: UserToDiscounts[]) {
  var discountIds: any = []
  userToDiscountsTable.map((item) => discountIds.push(item.discount_id))
  return discountIds
}

const AsyncProfile = async () => {
  const userData: TestUser = await getUser()

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
  const discountData = await getUserDiscounts()

  if (!discountData) {
    throw new Error('Could not return discounts')
  }

  return <Benefits discountData={discountData} />
}

const page = async () => {
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
