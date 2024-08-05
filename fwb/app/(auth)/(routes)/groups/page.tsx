import { getUser } from '@/app/api/users/utils/user_utils'
import { Group, TestUser, UserToGroups } from '@/app/types/types'
import CreateGroupsHeader from '@/components/ui/privategroups/groups/CreateGroupHeader'
import GroupsHomePage from '@/components/ui/privategroups/groups/GroupsHomePage'
import { generateSkeletons } from '@/components/ui/skeletons/generateSkeletons'
import { createClient } from '@/supabase.server'
import { auth } from '@clerk/nextjs'
import { Box, Container } from '@mui/material'
import { Suspense } from 'react'

async function getUserGroupsWithData(): Promise<Group[]> {
  const { userId } = auth()

  if (!userId) {
    console.log('Not signed in')
    return []
  }

  const supabase = await createClient()

  try {
    // Retrieving user's group IDs
    let { data: userGroups, error: userGroupsError } = await supabase
      .from('UserToGroups')
      .select('group_id')
      .eq('user_id', userId)
      .returns<UserToGroups[]>()

    if (userGroupsError || !userGroups) {
      console.error('Failed to fetch user groups:', userGroupsError)
      return []
    }

    const groupIds = userGroups.map((group) => group.group_id)

    // Getting group data for the user's groups
    let { data: groupsData, error: groupsDataError } = await supabase
      .from('test_groups')
      .select('*')
      .in('id', groupIds)
      .returns<Group[]>()

    if (groupsDataError || !groupsData) {
      console.error('Failed to fetch groups data:', groupsDataError)
      return []
    }

    // I initially planned to do a join here:
    // ==========================================
    // |  let { data, error } = await supabase  |
    // |  .from('UserToGroups')                 |
    // | .select(`                              |
    // |    group_id,                           |
    // |    test_groups:group_id (*)            |
    // |  `)                                    |
    // |  .eq('user_id', userId)                |
    // ==========================================

    // but since our userToGroups table has group_id as type string, and our  test_groups table has id as type UUID, setting up a direct relation wasn't possible without altering some types, so it was less destructive to do it this way. Plus it's honestly more readable to have the separate queries like this anyway.

    return groupsData
  } catch (error) {
    console.error('Error fetching data: ', error)
    return []
  }
}

async function GroupCards() {
  const userId = await auth().userId

  if (!userId) {
    throw new Error("Couldn't retrieve user")
  }

  const userData: TestUser = await getUser(userId)

  const groupData = await getUserGroupsWithData()
  return <GroupsHomePage userData={userData} groupData={groupData} />
}

const page = async () => {
  return (
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
          <GroupCards />
        </Suspense>
      </Container>
    </Box>
  )
}

export default page
