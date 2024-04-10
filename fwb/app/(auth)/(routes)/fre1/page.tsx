import UserFlowPage1 from './fre1';
import { auth } from '@clerk/nextjs'; // Import the redirect function from '@clerk/nextjs'
import { redirect } from 'next/navigation';

async function getUser(user_id: any, supabaseToken: any, bearerToken: any) {
  var myHeaders = new Headers()
  myHeaders.append('supabase_jwt', supabaseToken)
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user_id}`,
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
  const userId = await auth().userId

  const userData: any = await getUser(userId, supabase_jwt, bearer_token)

  console.log("asidfasodinfaoi" + userData);
  //Error handling for if user tries to access page not signed in or Clerk isn't ready
  if (userData.users[0]) {
    if (
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
    } else if (
      userData.users[0].hasCompletedFRE[2] &&
      userData.users[0].hasCompletedFRE[1] &&
      userData.users[0].hasCompletedFRE[0]
    ) {
      redirect('/profile')
    }
  } 

  return (
    <div>
      <UserFlowPage1 userData={userData} />
    </div>
  )
}

export default page
