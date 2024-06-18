import { NextRequest, NextResponse } from 'next/server'
import {
  deleteUserToGroup,
  getUserGroups,
  insertUserToGroup,
} from './utils/userToGroup_utils'

// Create a userToGroup
export async function POST(request: NextRequest) {
  return await insertUserToGroup(request)
}

// Get all userToGroups
export async function GET(request: NextRequest) {
  return await getUserGroups(request)
}

// Delete a userToGroup
export async function DELETE(request: NextRequest, response: NextResponse) {
  return await deleteUserToGroup(request)
}
