import { NextRequest } from 'next/server'
import { getCompanyToDiscount } from './utils/companyToDiscount_utils'

// Get all userToGroups
export async function GET(request: NextRequest) {
  return await getCompanyToDiscount(request)
}
