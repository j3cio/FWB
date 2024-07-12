import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'


export const updateDiscount = async (request: NextRequest) => {
  const { userId } = auth()
  const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
  const data = await request.json()
  const groupId = data.id
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
    //get group 
    let { data: groupData, error: userError } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single()

    if (userError) {
      console.error('Something went wrong', userError)
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }
    
    //push discount to group.discounts array
    let updatedGroupDiscount = groupData.discounts || []
    // Duplicate discount prevention
    if (!updatedGroupDiscount.includes(discountId)) {
      updatedGroupDiscount.push(discountId)
    } 

    const { error: updateError } = await supabase
    .from('groups')
    .update({ discounts: updatedGroupDiscount })
    .eq('id', groupId)
    
    if (updateError) {
      console.error('Failed to update user data', updateError)
      return NextResponse.json(
        { error: 'Failed to update user data' },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { message: 'User data updated successfully' },
        { status: 200 }
      )
    }
  }