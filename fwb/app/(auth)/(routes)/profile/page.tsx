import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import { DiscountData, UserData, UserToDiscounts } from '@/app/types/types'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Profile from './Profile'
import supabaseClient from '@/supabase'

async function getUser(bearer_token: string, supabase_jwt: string) {
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

async function getUserDiscountTable(bearer_token: string, supabase_jwt: string) {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/UserToDiscounts`,
      requestOptions
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.discountIds // This returns the result object
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error // This re-throws the error to be handled by the caller
  }
}

async function getDiscountIdsArray(userToDiscountsTable: UserToDiscounts[]) {
  var discountIds: any = []
  userToDiscountsTable.map(item => discountIds.push(item.discountId));
  return discountIds
}

const page = async () => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const userData: UserData = bearer_token && supabase_jwt ? await getUser(bearer_token, supabase_jwt) : undefined
  const userToDiscountsTable: UserToDiscounts[] = bearer_token && supabase_jwt ? await getUserDiscountTable(bearer_token, supabase_jwt) : undefined
  const discountIds = await getDiscountIdsArray(userToDiscountsTable)
  const discountData: DiscountData[] = userData && bearer_token && supabase_jwt ? await getAllDiscountsData(discountIds, bearer_token, supabase_jwt) : []
  
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
  return (
    <div>
      <Profile userData={userData} discountData={discountData} />
    </div>
  )
}

export default page
