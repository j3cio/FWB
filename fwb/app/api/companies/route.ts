import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'
import supabaseClient from '@/supabase'

type CompanyAndDiscounts = {
  id: number
  name: string
  description: string
  logo: string
  url: string
  greatest_discount: number
  discounts: string[]
  views: number
}

type Company = {
  created_at: string
  name: string
  description: string
  logo: string | null
  url: string
  views: number
  discounts: string[]
  id: string
  view_count: number
  greatest_discount: number
  discounts_updated_at: string
}

/**
 * Retrieves companies based on the provided query parameters.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing a list of CompanyAndDiscounts objects
 */
export async function GET(request: NextRequest) {
  // Extract the filters from the query params
  let sort_by = request.nextUrl.searchParams.get('sort_by')
  let private_group = request.nextUrl.searchParams.get('private_group') || 'all'
  let category = request.nextUrl.searchParams.get('category')
  let page_num = request.nextUrl.searchParams.get('page')

  let ascending = true

  // Interpret sort_by. Default to "view_count".
  if (sort_by === null) sort_by = 'view_count'
  if (sort_by === 'Most Popular') sort_by = 'view_count'
  if (sort_by === 'Highest to Lowest Discounts') {
    sort_by = 'greatest_discount'
    ascending = false
  }
  if (sort_by === 'Most Recent') {
    sort_by = 'discounts_updated_at'
    ascending = false
  }
  if (sort_by === 'Lowest to Highest Discounts') sort_by = 'greatest_discount'

  // Get the range of companies to fetch. Uses 0 indexing
  const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1

    return { from, to }
  }
  const { from, to } = getPagination(Number(page_num), 20)

  const { userId } = auth()
  const user = await currentUser()

  // If the user is logged in, fetch private group discounts and public discounts
  if (userId && user) {
    // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
    const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
    if (!supabase) {
      return NextResponse.json(
        { error: 'Could not create supabase client' },
        { status: 401 }
      )
    }

    // Only fetch companies of a category if the category is not "all"
    if (category && category !== 'all') {
      let { data: categoryDiscounts, error } = await supabase
        .from('categories')
        .select('discounts')
        .eq('name', category.toLowerCase())
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch category discounts' },
          { status: 500 }
        )
      }

      // Fetch all companies
      let { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .order(sort_by, { ascending: ascending })
        .range(from, to)

      if (companiesError) {
        return NextResponse.json(
          { error: 'Failed to fetch companies' },
          { status: 500 }
        )
      }

      // Filter companies by category
      let result: CompanyAndDiscounts[] = []
      // const publicCompanies = companies?.filter(company: Company => company.)
      companies?.forEach((company) => {
        const intersection = new Set(
          [...company.discounts].filter((x) =>
            categoryDiscounts?.discounts.includes(x)
          )
        )
        if (intersection.size > 0) {
          result.push({
            id: company.id,
            name: company.name,
            description: company.description,
            logo: company.logo,
            url: company.url,
            greatest_discount: company.greatest_discount,
            discounts: Array.from(intersection),
            views: company.view_count,
          })
        }
      })
      return NextResponse.json({ result }, { status: 200 })
    }

    // Else, Fetch 20 companies directly from company table
    let { data: result, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .order(sort_by, { ascending: ascending })
      .range(from, to)

    const publicCompanies = result?.map((company: Company) => company.discounts)

    console.log({ publicCompanies })
    if (companiesError) {
      console.log(companiesError)
      return NextResponse.json(
        { error: 'Failed to fetch public and private companies' },
        { status: 500 }
      )
    }

    return NextResponse.json({ result }, { status: 200 })
  }

  return NextResponse.json({ error: 'User not logged in' }, { status: 401 })
}
