import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

/**
 * Retrieves test_discounts
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */
const getTestDiscounts = async (request: NextRequest) => {
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

      let { data: discounts, error } = await supabase.from('test_discounts').select('*')

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch discounts' },
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





export { getTestDiscounts }
