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
    const { userId, getToken } = auth();
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
        public: formData.get("public") === "true" ? true : false,
        private_groups: formData.get("private_groups"),
      };

      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        return NextResponse.json(
          { error: "Could not create supabase access token" },
          { status: 401 }
        );
      }
      const supabase = await supabaseClient(token);

      // Insert the new discount into the database
      const { data, error } = await supabase
        .from("discounts")
        .insert([newDiscount])
        .select();
      if (error) {
        console.log(error)
        return NextResponse.json(
          { error: "Failed to create discount" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  response: NextResponse
) {
  try {
    // Filters
    let sort_by = request.nextUrl.searchParams.get("sort_by");
    let private_group = request.nextUrl.searchParams.get("private_group");
    let category = request.nextUrl.searchParams.get("category");
    let page_num = request.nextUrl.searchParams.get("page");

    let accending = true;

    // Interpret sort_by. Default to "view_count".
    if (sort_by === null) sort_by = "view_count";
    if (sort_by === "Most Popular") sort_by = "view_count";
    if (sort_by === "Highest to Lowest Discounts") {
      sort_by = "discount_amount"
      accending = false;
    };
    if (sort_by === "Lowest to Highest Discounts") sort_by = "discount_amount";

    // Get the range of discounts to fetch. Uses 0 indexing
    const getPagination = (page: number, size: number) => {
      const limit = size ? +size : 3
      const from = page ? page * limit : 0
      const to = page ? from + size - 1 : size - 1
    
      return { from, to }
    }
    const { from, to } = getPagination(Number(page_num), 20);

    const { userId, getToken } = auth();
    const user = await currentUser();
    if (userId && user) {
      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        return NextResponse.json(
          { error: "Could not create supabase access token" },
          { status: 401 }
        );
      }
      const supabase = await supabaseClient(token);
      // Fetch 20 discounts for page_num
      let { data: discounts, error } = await supabase
        .from("discounts")
        .select("*")
        .order(sort_by, { ascending: accending })
        .filter('categories', 'cs', `{${category}}`)
        .range(from, to);
  
      if (error) {
        return NextResponse.json(
          { error: "Failed to fetch discounts" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, discounts }, { status: 200 });
    } else {
      // Ignore private group if user is not logged in
      const supabase = await supabaseClient();
      let { data: discounts, error } = await supabase
        .from("discounts")
        .select("*")
        .order(sort_by, { ascending: accending })
        .filter('categories', 'cs', `{${category}}`)
        .eq("public", true)
        .range(from, to);
        

      if (error) {
        console.log(error)
        return NextResponse.json(
          { error: "Failed to fetch discounts" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, discounts }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a discount
export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const { userId, getToken, orgRole } = auth();
    const user = await currentUser();

    if (userId && user) {
      const discount_id = request.nextUrl.searchParams.get("discount_id");

      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);

      const { error } = await supabase
        .from("discounts")
        .delete()
        .eq("id", discount_id);

      if (error) {
        return NextResponse.json(
          { error: "Failed to delete discount" },
          { status: 500 }
        );
      } else {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update a discount
export async function PATCH(request: NextRequest, response: NextResponse) {
  return NextResponse.json({ error: "Not Implemented" }, { status: 500 });
}
