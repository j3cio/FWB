import { NextRequest, NextResponse } from 'next/server'
import { getTestCompanies } from './utils/test_companies_utils' 

// Get all test_companies
export async function GET(request: NextRequest) {
  return await getTestCompanies(request)
}
