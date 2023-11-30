import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

interface Discount {
  user_id: string;
  company: string;
  terms_and_conditions: string;
  company_url: string;
  shareable_url: string;
  discount_amount: number;
  public: boolean;
  private_groups?: string;
  updated_by?: string;
}

// Create a new discount
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { userId, getToken, orgRole } = auth();
    const user = await currentUser();

    if (userId && user) {
      const formData = await request.formData();
      const newDiscount = {
        user_id: user.id,
        company: formData.get("company"),
        terms_and_conditions: formData.get("terms_and_conditions"),
        company_url: formData.get("company_url"),
        shareable_url: "",
        discount_amount: formData.get("discount_amount"),
        public: formData.get("public"),
        private_groups: formData.get("private_groups"),
      };

      // Create a Supabase client with the current user's access token
      const token = await getToken({ template: "supabase" });
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const supabase = await supabaseClient(token);

      // Insert the new discount into the database
      const { data, error } = await supabase
        .from("discounts")
        .insert([newDiscount])
        .select();
      if (error) {
        return NextResponse.json({ error: 'Failed to create discount' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest & { query: Record<string, string> }, response: NextResponse) {
  try {
    // Filters
    // const sort_by = request.nextUrl.searchParams.get('sort_by');
    // const private_group = request.nextUrl.searchParams.get('private_group');
    // const category = request.nextUrl.searchParams.get('category');
    // const page_num = request.nextUrl.searchParams.get('page');


    // Fetch all public discounts
    const supabase = await supabaseClient();
    let { data: discounts, error } = await supabase
      .from('discounts')
      .select('*');

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch discounts' }, { status: 500 });
    }

    return NextResponse.json({ success: true, discounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
  

// Delete a discount
export async function DELETE(
  request: NextRequest,
  response: NextResponse
) {
  try {
    const { userId, getToken, orgRole } = auth();
    const user = await currentUser();

    if (userId && user) {
      // Create a Supabase client with the current user's access token
      const token = await getToken({ template: "supabase" });
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const supabase = await supabaseClient(token);

      const { error } = await supabase
        .from('discounts')
        .delete()
        .eq('some_column', 'someValue')

      if (error) {
        return NextResponse.json({ error: 'Failed to delete discount' }, { status: 500 })
      } else {
        return NextResponse.json({ success: true }, { status: 200 })
      }
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Update a discount
export async function PATCH(
  request: NextRequest,
  response: NextResponse
) {
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
}

