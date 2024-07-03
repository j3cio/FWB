import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Retrieves userToGroup
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */

const getGroupUsers = async (request: NextRequest) => {
  let group_id = request.nextUrl.searchParams.get('group_id')

  try {
    const { userId } = auth()
    const user = await currentUser()
    // If the user is logged in, fetch all other users on the platform
    if (userId && user) {
      const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
      if (!supabase) {
        return NextResponse.json(
          { error: 'Could not create supabase access token' },
          { status: 401 }
        )
      }
      let { data: groups, error } = await supabase
        .from('UserToGroups')
        .select('user_id')
        .eq('group_id', group_id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch user groups' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, groups }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}


export { getGroupUsers }
