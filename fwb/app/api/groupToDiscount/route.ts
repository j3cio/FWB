import { NextRequest, NextResponse } from 'next/server'
import { getGroupDiscounts } from './utils/groupToDiscount_utils'

export async function GET(request: NextRequest) {
  return await getGroupDiscounts(request)
}
