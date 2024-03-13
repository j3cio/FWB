import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'
import {
  insertUser,
  getUsers,
  deleteUser,
  updateUser,
} from '@/app/api/users/utils/user_utils'

// Create a new user
export async function POST(request: NextRequest) {
  return await insertUser(request)
}

// Get all users
export async function GET(request: NextRequest) {
  return await getUsers(request)
}

// Delete a user
export async function DELETE(request: NextRequest, response: NextResponse) {
  return await deleteUser(request)
}

// Update a user
export async function PATCH(request: NextRequest, response: NextResponse) {
  return await updateUser(request)
}
