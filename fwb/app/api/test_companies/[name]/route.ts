import { getSingleCompany } from '@/app/api/test_companies/[name]/utils/company_utils'
import { NextRequest } from 'next/server'

// Get single user
export async function GET(request: NextRequest) {
  return await getSingleCompany(request)
}
