import supabaseClient from '@/supabase'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { getNewLogoUrl } from './utils/logos_utils'


export async function GET(request: NextRequest, response: NextResponse) {
  let discount_id = request.nextUrl.searchParams.get('discount_id')
  try {
    // Fetch all public groups
    const token = request.headers.get('supabase_jwt');
    console.log('Received token:', token); // Log the token to verify
    const supabase = await supabaseClient(request.headers.get('supabase_jwt'))

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }
    if (discount_id) {
      // If discount_id return specific discount
      let { data, error } = await supabase
        .from('discounts')
        .select('*')
        .eq('id', discount_id)
      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch discount' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, data }, { status: 200 })
    } else {
      let { data, error } = await supabase.from('discounts').select('*')
      if (error) {
        // Else return all groups
        return NextResponse.json(
          { error: 'Failed to fetch discounts' },
          { status: 500 }
        )
      }
      return NextResponse.json({ success: true, data }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}


/**
 * Handles the POST request for creating a new discount.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the response data.
 */
export async function POST(request: NextRequest) {
  const { userId } = auth()

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await currentUser()
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized. Failed to obtain current User' },
      { status: 401 }
    )
  }

  // Create a supabase client
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
  if (!supabase) {
    return NextResponse.json(
      { error: 'Could not create supabase client' },
      { status: 401 }
    )
  }

  const formData = await request.formData()
  // Extract the form data
  const newDiscount = {
    user_id: user.id,
    terms_and_conditions: formData.get('terms_and_conditions'),
    shareable_url: '', //TODO: Generate shareable URL
    discount_amount: formData.get('discount_amount'),
    public: formData.get('public') === 'true' ? true : false,
    name: formData.get('company'),
  }

  // Insert the new discount into the database
  const { data: discount, error } = await supabase
    .from('discounts')
    .insert([newDiscount])
    .select()
  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to insert discount in supabase' },
      { status: 500 }
    )
  }

  // Get the discounts of the company
  const company_url = formData.get('company_url')
  let { data: companyData, error: companyDataError } = await supabase
    .from('companies')
    .select('discounts')
    .eq('url', company_url)
    .single()

  const logoUrl = await getNewLogoUrl(String(formData.get('company_url')))
  const companyUrl = formData.get('company_url')
  const formattedUrl = companyUrl?.toString().replace(/\s/g, '') // stripped out any inner whitespace
  // Create a new company if the company does not exist
  if (companyDataError) {
    const newCompany = {
      discounts: [],
      name: formData.get('company'),
      url: formattedUrl,
      description: '',
      logo: logoUrl,
    }
    // Insert the company into the companies table
    const { data: insertedCompany, error: insertError } = await supabase
      .from('companies')
      .insert([newCompany])
      .single()

    companyData = insertedCompany

    if (insertError) {
      console.error(insertError)
      return NextResponse.json(
        { error: 'Failed to insert new company in supabase' },
        { status: 500 }
      )
    }
  }

  // Insert the discount into the company's discounts array
  const updatedDiscounts = [
    ...(companyData?.discounts || []),
    String(discount[0].id),
  ]
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .update({ discounts: updatedDiscounts })
    .eq('url', company_url)
    .select()

  if (companyError) {
    console.error(companyError)
    return NextResponse.json(
      { error: 'Failed to insert discount into company' },
      { status: 500 }
    )
  }

  // Update the greatest discount of the company and the discounts_updated_at timestamp
  let { data: greatestDiscount, error: greatestDiscountsError } = await supabase
    .from('companies')
    .select('greatest_discount')
    .eq('url', company_url)
    .single()
  if (greatestDiscountsError) {
    console.error(greatestDiscountsError)
    return NextResponse.json(
      { error: 'Failed to get greatest discount of company' },
      { status: 500 }
    )
  }

  const { data: updatedCompany, error: updatedCompanyError } = await supabase
    .from('companies')
    .update({
      greatest_discount: Math.max(
        Number(formData.get('discount_amount')),
        greatestDiscount?.greatest_discount || 0
      ),
      discounts_updated_at: new Date(),
    })
    .eq('url', company_url)
    .select()
  if (updatedCompanyError) {
    console.error(updatedCompanyError)
    return NextResponse.json(
      { error: 'Failed to update greatest discount of company' },
      { status: 500 }
    )
  }

  // Insert the discount into the categories' discounts arrays
  const categories = String(formData.get('categories')).split(',')
  categories.forEach(async (category) => {
    let { data: categoryData, error: categoryDataError } = await supabase
      .from('categories')
      .select('discounts')
      .eq('name', category.toLowerCase())
      .single()

    // Insert the discount into the category's discounts array
    const updatedDiscounts = [
      ...(categoryData?.discounts || []),
      String(discount[0].id),
    ]

    const { data: categoryUpdated, error: categoryUpdatedError } =
      await supabase
        .from('categories')
        .update({ discounts: updatedDiscounts })
        .eq('name', category.toLowerCase())
        .select()

    if (categoryUpdatedError) {
      console.error(categoryUpdatedError)
      return NextResponse.json(
        { error: 'Failed to insert discount into category' },
        { status: 500 }
      )
    }
  })

  return NextResponse.json({ data: discount }, { status: 200 })
}


export async function PATCH(request: NextRequest, response: NextResponse) {
  const { userId } = auth()
  const supabase = await supabaseClient(request.headers.get('supabase_jwt'))
  const data = await request.json()
  const discountId = data.discountId

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json(
      { error: 'Could not create supabase client' },
      { status: 401 }
    )
  }

  let { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (userError) {
    console.error('Something went wrong', userError)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }

  let updatedDiscounts = userData.user_discounts || []

  // Duplicate discount prevention
  if (!updatedDiscounts.includes(discountId)) {
    updatedDiscounts.push(discountId)
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ user_discounts: updatedDiscounts })
    .eq('user_id', userId)

  if (updateError) {
    console.error('Failed to update user data', updateError)
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    )
  }
}
