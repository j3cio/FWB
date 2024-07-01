import { auth } from '@clerk/nextjs'
import { Box } from '@mui/material'
import GroupContent from './GroupContent'

async function getGroupData(params: {
  [key: string]: string | string[] | undefined
}) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  if (!supabase_jwt) {
    console.warn('Not signed in')
    return
  }

  if (params.group_id) {
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${bearer_token}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${params.group_id}`, // add to .env
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
  } else {
    return {
      success: false,
      data: [
        {
          id: '',
          name: 'No group id',
          discounts: [],
          admins: '123',
          public: false,
          users: [],
        },
      ],
    }
  }
}

async function getUser(user_id: string) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  if (!supabase_jwt) {
    console.warn('Not signed in')
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

async function getDiscount(discount_id: string) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  if (!supabase_jwt) {
    console.warn('Not signed in')
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discounts?discount_id=${discount_id}`,
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

async function getAllDiscountData(discount_ids: string[]) {
  const promises = discount_ids.map((discount: any, key: number) =>
    getDiscount(discount.discount_id)
  )
  const results = await Promise.all(promises)

  // filters out any data that has an empty users array
  //const filteredResults = results.filter((result) => result.users.length > 0)

  return results
}

async function getAllUserData(user_ids: string[]) {
  const promises = user_ids.map((user: any, key: number) =>
    getUser(user.user_id)
  )
  const results = await Promise.all(promises)

  // filters out any data that has an empty users array
  //const filteredResults = results.filter((result) => result.users.length > 0)

  return results
}

async function getGroupsToUserTable(
  bearer_token: string,
  supabase_jwt: string,
  group_id: string
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/groupToUser?group_id=${group_id}`,
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

async function getGroupsToDiscountTable(
  bearer_token: string,
  supabase_jwt: string,
  group_id: string
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/groupToDiscount?group_id=${group_id}`,
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

const Page = async ({ params }: { params: { group_id: string } }) => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const groupData = await getGroupData(params)
  const userIdArray = await getGroupsToUserTable(
    bearer_token!,
    supabase_jwt!,
    groupData.data[0].id
  )
  const discountIdArray = await getGroupsToDiscountTable(
    bearer_token!,
    supabase_jwt!,
    groupData.data[0].id
  )
  const userData: any = await getAllUserData(userIdArray.groups)
  const discountData: any = await getAllDiscountData(discountIdArray.discounts)

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      <GroupContent
        userData={userData}
        groupData={groupData}
        discountData={discountData}
        userIdArray={userIdArray.groups}
      />
    </Box>
  )
}

export default Page
