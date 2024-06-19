import { NextRequest, NextResponse } from 'next/server'
import {
  deleteUserToDiscount,
  getUserDiscounts,
  insertUserToDiscount,
} from './utils/userToDiscount_utils'

// Create a userToDiscount
export async function POST(request: NextRequest) {
  return await insertUserToDiscount(request)
}

// Get all userToDiscount
export async function GET(request: NextRequest) {
  return await getUserDiscounts(request)
}

// Delete a userToDiscount
export async function DELETE(request: NextRequest, response: NextResponse) {
  return await deleteUserToDiscount(request)
}
