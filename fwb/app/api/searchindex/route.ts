import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

export async function GET(request: NextRequest) {
  const { userId } = auth()
  const user = await currentUser()

  if (userId && user) {
    const supabase = await supabaseClient(request.headers.get('supabase_jwt'))

    if (!supabase) {
      return NextResponse.json(
        { error: 'Could not create supabase client' },
        { status: 401 }
      )
    }

    // Fetch all companies
    let { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')

    if (companiesError) {
      return NextResponse.json(
        { error: 'Failed to fetch companies' },
        { status: 500 }
      )
    }

    return NextResponse.json({ companies }, { status: 200 })
  }
}
