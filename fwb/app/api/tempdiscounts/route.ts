import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'



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

