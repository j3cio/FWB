import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

import ReturnToChat from './ReturnToChat'
import ChatDetailsPage from './ChatDetailsPage'

import { User } from '@/app/types/types'

const getUserDetails = async (userId: string) => {
  const supabase_jwt = await auth().getToken({ template: 'supabase' })

  const supabase = await supabaseClient(supabase_jwt)

  if (!supabase) {
    return NextResponse.json(
      { error: 'Could not create supabase access token' },
      { status: 401 }
    )
  }
  let { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }

  if (user) {
    const data = user[0]
    return NextResponse.json({ success: true, data }, { status: 200 })
  }
}

interface ChatDetailParams {
  params: {
    user_id: string
  }
}
const page = async ({ params }: ChatDetailParams) => {
  const userId = params.user_id

  const response = await getUserDetails(userId)
  const data = response && (await response.json())
  const user: User = data.data

  return (
    <main className="flex h-dvh flex-col bg-[#1A1A23] text-white ">
      <ReturnToChat />
      <ChatDetailsPage user={user} />
    </main>
  )
}

export default page
