import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Inserts a new userToGroup into the database.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */

const insertUserToGroup = async (request: NextRequest) => {
  try {
    const { userId } = auth()
    const user = await currentUser()
    // Check if the user is logged in
    if (userId && user) {
      // Extract the form data
      const formData = await request.formData()

      const newUserToGroup = {
        user_id: formData.get('user_id'),
        group_id: formData.get('group_id'),
      }
      const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
      if (!supabase) {
        return NextResponse.json(
          { error: 'Could not create supabase access token' },
          { status: 401 }
        )
      }
      // Insert the new user to group relation
      const { data, error } = await supabase
        .from('UserToGroups')
        .insert([newUserToGroup])
        .select()

      // Check for error and return response
      if (error) {
        console.error(error)
        return NextResponse.json(
          {
            error: 'Failed to create UserToGroup relation',
            details: error.message,
          },
          { status: 500 }
        )
      } else {
        return NextResponse.json({ data: data }, { status: 200 })
      }
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * Retrieves userToGroup
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */

const getUserGroups = async (request: NextRequest) => {
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
        .select('group_id')
        .eq('user_id', userId)

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

/**
 * Deletes a userToGroup relation from the database.
 *
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the result of the deletion.
 */

const deleteUserToGroup = async (request: NextRequest) => {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (userId && user) {
      const group_id = request.nextUrl.searchParams.get('group_id')
      if (!group_id) {
        return NextResponse.json(
          {
            error: 'Failed to delete UserToGroup relation, no group_id given',
          },
          { status: 500 }
        )
      }
      // Create a Supabase client with the current user's access token
      const token = request.headers.get('supabase_jwt')
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const supabase = await supabaseClient(token)

      const { error } = await supabase
        .from('UserToGroups')
        .delete()
        .eq('group_id', group_id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to delete UserToGroup relation' },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { success: true, deleted: group_id },
          { status: 200 }
        )
      }
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export { deleteUserToGroup, getUserGroups, insertUserToGroup }
