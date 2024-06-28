import { NextRequest, NextResponse } from 'next/server'
import {
  getGroupUsers,
} from './utils/groupToUsers_utils'

// Get all userToGroups
export async function GET(request: NextRequest) {
  return await getGroupUsers(request)
}
