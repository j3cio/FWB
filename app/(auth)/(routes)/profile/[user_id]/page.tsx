import Profile from '@/app/(auth)/(routes)/profile/Profile'
import { DiscountData, UserData } from '@/app/types/types'
import { auth } from '@clerk/nextjs'

async function getUser(
  bearer_token: string,
  supabase_jwt: string,
  userId: string
) {
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

const page = async ({ params }: { params: { user_id: string } }) => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const discountData: DiscountData[] = []
  const userData: UserData =
    bearer_token && supabase_jwt
      ? await getUser(bearer_token, supabase_jwt, params.user_id)
      : undefined
  return (
    <div>
      <Profile userData={userData} discountData={discountData} isPublic={true} />
    </div>
  )
}

export default page
