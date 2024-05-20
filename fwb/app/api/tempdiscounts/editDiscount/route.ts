import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

// Update a discount
export async function PATCH(request: NextRequest, response: NextResponse) {
    const { userId } = auth()
  
    // Check if the user is logged in
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Failed to obtain current User' },
        { status: 401 }
      )
    }
  
    // Create a Supabase client with the current user's access token
    const token = request.headers.get('supabase_jwt')
    if (!token) {
      return NextResponse.json(
        { error: 'Missing supabase_jwt token' },
        { status: 401 }
      )
    }
    // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
    const supabase = await supabaseClient(token)
    if (!supabase) {
      return NextResponse.json(
        { error: 'Failed to create supabase client' },
        { status: 401 }
      )
    }
  
    // Extract the form data
    const formData = await request.formData()

    console.log('FORMDATA', formData)
    const updatedDiscount: any = {}
  
    const discount_id = formData.get('discount_id')
  
    if (formData.get('company')) {
      updatedDiscount.company = formData.get('company')
    }
    if (formData.get('terms_and_conditions')) {
      updatedDiscount.terms_and_conditions = formData.get('terms_and_conditions')
    }
    if (formData.get('name')) {
      updatedDiscount.name = formData.get('name')
    }
    if (formData.get('discount_amount')) {
      updatedDiscount.discount_amount = Number(formData.get('discount_amount'))
    }
    if (formData.get('public')) {
      updatedDiscount.public = formData.get('public') === 'public' ? true : false
    }
    if (formData.get('description')) {
      updatedDiscount.description = formData.get('description')
    }

  
    // Update the discount in the database
    const { data, error } = await supabase
      .from('discounts')
      .update(updatedDiscount)
      .eq('id', discount_id)
      .select()
  
    if (error) {
      console.log(error)
      return NextResponse.json(
        { error: 'Failed to update discount' },
        { status: 500 }
      )
    }
  
    return NextResponse.json(
      { success: true, updated_values: data },
      { status: 200 }
    )
  }
  