import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

export async function GET(request: NextRequest) {
  let discount_ids = request.nextUrl.searchParams.get('discount_ids')
  const discount_array = discount_ids?.split(',');

  let sort_by = request.nextUrl.searchParams.get('sort_by') || null
  let private_group = request.nextUrl.searchParams.get('private_group') || 'all'

  let accending = true

  // Interpret sort_by. Default to "view_count".
  if (sort_by === null) sort_by = 'view_count'
  if (sort_by === 'most popular') sort_by = 'view_count'
  if (sort_by === 'highest to lowest discounts') {
    sort_by = 'discount_amount'
    accending = false
  }
  if (sort_by === 'most recent') {
    sort_by = 'created_at'
    accending = false
  }
  if (sort_by === 'lowest to highest discounts') sort_by = 'discount_amount'

  try {
    // Fetch all public groups
    const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
    if (!supabase) {
      return NextResponse.json(
        { error: 'Could not create supabase access token' },
        { status: 401 }
      )
    }

    if (discount_array?.length) {

      const { userId, getToken } = auth()
      const user = await currentUser()
      // If the user is logged in, fetch all other users on the platform
      if (userId && user) {

        // If discount_ids are provided, return discounts for those IDs
        let { data: discounts, error: discountsError } = await supabase
          .from('discounts')
          .select('*')
          .in('id', discount_array)
          .order(sort_by, { ascending: accending })

        if (discountsError) {
          return NextResponse.json(
            { error: `Failed to fetch discounts ${discount_ids}` },
            { status: 500 }
          )
        }

        let { data: users, error } = await supabase
          .from('users')
          .select('*')

        if (error) {
          return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
          )
        }

        const combinedData = discounts?.map(discount => {
          const user = users?.find(user => user.user_id === discount.user_id);
          return {
            ...discount,
            user_image: user ? user.profile_picture_url : null,
            user_username: user ? user.username : null
          };
        });
        
        return NextResponse.json(combinedData, { status: 200 })

      }

    } else {
      // If no discount_ids provided, return all discounts
      let { data, error } = await supabase.from('discounts').select('*')
      if (error) {
        return NextResponse.json(
          { error: `Failed to fetch discounts` },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, data }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}