import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Inserts a new userToDiscount into the database.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */

const insertUserToDiscount = async (request: NextRequest) => {
  try {
    const { userId } = auth()
    const user = await currentUser()
    // Check if the user is logged in
    if (userId && user) {
      // Extract the form data
      const formData = await request.formData()

      const newUserToDiscount = {
        user_id: formData.get('user_id'),
        discount_id: formData.get('discount_id'),
      }
      const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
      if (!supabase) {
        return NextResponse.json(
          { error: 'Could not create supabase access token' },
          { status: 401 }
        )
      }
      // Insert the new user to discount relation
      const { data, error } = await supabase
        .from('UserToDiscounts')
        .insert([newUserToDiscount])
        .select()

      // Check for error and return response
      if (error) {
        console.error(error)
        return NextResponse.json(
          {
            error: 'Failed to create UserToDiscount relation',
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
 * Retrieves userToDiscount
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */

const getUserDiscounts = async (request: NextRequest) => {
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
      let { data: discounts, error } = await supabase
        .from('UserToDiscounts')
        .select('discount_id')
        .eq('user_id', userId)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch user discounts' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, discounts }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * Deletes a userToDiscount from the database.
 *
 * @param request - The NextRequest object containing the request details.
 * @returns A NextResponse object with the result of the deletion.
 */

const deleteUserToDiscount = async (request: NextRequest) => {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (userId && user) {
      const discount_id = request.nextUrl.searchParams.get('discount_id')
      if (!discount_id) {
        return NextResponse.json(
          {
            error:
              'Failed to delete UserToDiscount relation, no discount_id given',
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
        .from('UserToDiscounts')
        .delete()
        .eq('discount_id', discount_id)

      if (error) {
        return NextResponse.json(
          { error: 'Failed to delete UserToDiscount relation' },
          { status: 500 }
        )
      } else {
        return NextResponse.json(
          { success: true, deleted: discount_id },
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

export { deleteUserToDiscount, getUserDiscounts, insertUserToDiscount }
