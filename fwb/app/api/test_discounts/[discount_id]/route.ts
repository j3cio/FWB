import { getDiscountsOfASingleCompany } from '@/app/api/test_discounts/[discount_id]/utils/discount_utils'
import { NextRequest } from 'next/server'

// Get single user
export async function GET(request: NextRequest) {
  return await getDiscountsOfASingleCompany(request)
}
