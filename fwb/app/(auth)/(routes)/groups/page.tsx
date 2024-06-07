import { Group, UserData } from '@/app/types/types'
import CreateGroupsHeader from '@/components/ui/privategroups/groups/CreateGroupHeader'
import GroupsHomePage from '@/components/ui/privategroups/groups/GroupsHomePage'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import GroupPageSkeleton from '@/components/ui/skeletons/pages/GroupPageSkeleton'
import { UserProvider } from '@/contexts/UserContext'
import { auth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'
import { Suspense } from 'react'
import { User } from 'stream-chat'

async function getUser() {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  if (!supabase_jwt) {
    console.log('Not signed in')
    return
  }

  const userId = await auth().userId

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

async function getGroupData(groupId: string) {
  const bearer_token = await auth().getToken({ template: 'testing_template' })
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  if (!supabase_jwt) {
    console.log('Not signed in')
    return
  }

  if (groupId) {
    var myHeaders = new Headers()
    myHeaders.append('supabase_jwt', supabase_jwt)
    myHeaders.append('Authorization', `Bearer ${bearer_token}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/groups?group_id=${groupId}`, // add to .env
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
          admins: ['123'],
          public: false,
          users: [],
        },
      ],
    }
  }
}

async function GroupCards({ userData }: { userData: UserData }) {
  const groupData: Group[] = await Promise.all(
    userData.users[0].user_groups.map(async (group_id) => {
      const singleGroupData = await getGroupData(group_id)
      return singleGroupData.data[0]
    })
  )

  return <GroupsHomePage userData={userData} groupData={groupData} />
}

const page = async () => {
  const userData: UserData = await getUser()

  return (
    <UserProvider initialUserData={userData}>
      <Box
        component="section"
        sx={{ backgroundColor: '#1A1A23', minHeight: '100vh' }}
      >
        <Container disableGutters maxWidth="lg">
          <CreateGroupsHeader />
          <Suspense
            fallback={
              <div className="mt-16">
                {generateSkeletons({ type: 'GroupCard', quantity: 3 })}
              </div>
            }
          >
            <GroupCards userData={userData} />
          </Suspense>
        </Container>
      </Box>
    </UserProvider>
  )
}

export default page
