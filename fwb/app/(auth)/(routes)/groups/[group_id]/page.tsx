import { DiscountData, GroupData, UserData } from '@/app/types/types'
import GroupDetailsSection from '@/components/ui/privategroups/groupdetailspage/GroupDetailsSection'
import Tabs from '@/components/ui/privategroups/groupdetailspage/Tabs'

import { auth } from '@clerk/nextjs'

import { getAllDiscountsData } from '@/app/api/discounts/utils/fetch_discount_utils'
import GroupContent from './GroupContent'
import { Box } from '@mui/material'

//TODOs:
// Backend ---
// Search bar for searching members

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

async function getAllUserData(user_ids: string[]) {
  const promises = user_ids.map((user: any, key: number) =>
    getUser(user.user_id)
  )
  const results = await Promise.all(promises)

  // filters out any data that has an empty users array
  const filteredResults = results.filter((result) => result.users.length > 0)

  return filteredResults
}


async function getGroupsToUserTable(bearer_token: string,
  supabase_jwt: string, group_id: string) {
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

const Page = async ({ params }: { params: { group_id: string } }) => {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })
  const groupData = await getGroupData(params)
  const userIdArray = await getGroupsToUserTable(bearer_token!, supabase_jwt!, groupData.data[0].id)
  const userData: any = await getAllUserData(userIdArray.groups)
  // const userData: any = await getAllUserData(groupData.data[0].users)

  // // Makes sure that our tokens exist, else gives us an empty array
  // const discountData: DiscountData[] =
  //   bearer_token && supabase_jwt
  //     ? await getAllDiscountsData(
  //         groupData.data[0].discounts,
  //         bearer_token,
  //         supabase_jwt
  //       )
  //     : []

  return (
    <Box sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}>
      {/* <GroupContent
        userData={userData}
        groupData={groupData}
        discountData={discountData}
      /> */}
    </Box>
  )
}

export default Page
