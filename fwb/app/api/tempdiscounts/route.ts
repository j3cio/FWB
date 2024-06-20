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
        .from('test_discounts')
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
      let { data, error } = await supabase.from('test_discounts').select('*')
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

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (userId && user) {
      const formData = await request.formData()
      const newDiscount = {
        user_id: formData.get('user_id'),
        shareable_url: formData.get('shareable_url') || 'No url provided',
        discount_amount: formData.get('discount_amount') || 0,
        view_count: formData.get('view_count') || 0,
        share_count: formData.get('share_count') || 0,
        message_count: formData.get('message_count') || 0,
        terms_and_conditions:
          formData.get('terms_and_conditions') === 'false' ? false : true,
        public: formData.get('public') === 'private' ? false : true, // There might be a way to use a boolean rather than having to type false?
        logo: formData.get('logo') || 'No logo provided',
        name: formData.get('name') || 'No name provided',
        company: formData.get('company') || 'No company provided',
        description: formData.get('description') || 'No description provided',
      }
      const supabase = await supabaseClient(request.headers.get('supabase_jwt'))

      if (!supabase) {
        return NextResponse.json(
          { error: 'Could not create supabase access token' },
          { status: 401 }
        )
      }

      // Insert the new discount into the discounts table in supabase
      const { data, error } = await supabase
        .from('discounts')
        .insert([newDiscount])
        .select()
      // Check for error and return response
      if (error) {
        return NextResponse.json(
          {
            error: 'Failed to create new group',
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
