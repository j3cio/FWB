import supabaseClient from '@/supabase'
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
