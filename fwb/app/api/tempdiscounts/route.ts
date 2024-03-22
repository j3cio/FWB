import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  let discount_id = request.nextUrl.searchParams.get('discount_id')
  try {
    // Fetch all public groups
    const supabase = await supabaseClient()
    if (discount_id) {
      // If discount_id return specific discount
      let { data, error } = await supabase
        .from('discounts')
        .select('*')
        .eq('id', discount_id)
      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch discount' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, data }, { status: 200 })
    } else {
      let { data, error } = await supabase.from('discounts').select('*')
      if (error) {
        // Else return all groups
        return NextResponse.json(
          { error: 'Failed to fetch discounts' },
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


export async function PATCH(request: NextRequest, response: NextResponse) {
  const { userId } = auth()
  const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
  const data = await request.json()
  const discountId = data.discountId

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json(
      { error: 'Could not create supabase client' },
      { status: 401 }
    )
  }

  let { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (userError) {
    console.error('Something went wrong', userError)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }

  let updatedDiscounts = userData.user_discounts || []

  // Duplicate discount prevention
  if (!updatedDiscounts.includes(discountId)) {
    updatedDiscounts.push(discountId)
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ user_discounts: updatedDiscounts })
    .eq('user_id', userId)

  if (updateError) {
    console.error('Failed to update user data', updateError)
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    )
  }
}