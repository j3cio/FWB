import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { updateDiscount } from './utils/groupdiscount_utils'

export async function PATCH(request: NextRequest, response: NextResponse) {
  return await updateDiscount(request)
}

