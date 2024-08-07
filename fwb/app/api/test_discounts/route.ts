import { NextRequest, NextResponse } from 'next/server'
import { getTestDiscounts } from './utils/test_discounts_utils' 

// Get all test_discounts
export async function GET(request: NextRequest) {
  return await getTestDiscounts(request)
}
