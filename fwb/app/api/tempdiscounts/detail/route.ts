import supabaseClient from '@/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  let discount_ids = request.nextUrl.searchParams.get('discount_ids')
  const discount_array = discount_ids?.split(','); 
  
  try {
    // Fetch all public groups
    const supabase = await supabaseClient()

    if (discount_array?.length) {
      // If discount_ids are provided, return discounts for those IDs
      let { data, error } = await supabase
        .from('discounts')
        .select('*')
        .in('id', discount_array)

      if (error) {
        return NextResponse.json(
          { error: `Failed to fetch discounts ${discount_ids}` },
          { status: 500 }
        )
      }
      return NextResponse.json(data, { status: 200 })
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