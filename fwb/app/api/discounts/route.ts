import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import {
  insertDiscount,
  getDiscounts,
  deleteDiscount,
  updateDiscount,
} from "@/app/api/discounts/utils/discount_utils";

/**
 * Handles the POST request for creating a new discount.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the response data.
 */
export async function POST(request: NextRequest) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  // Extract the form data
  const formData = await request.formData();
  const newDiscount = {
    user_id: user.id,
    company: formData.get("company"),
    terms_and_conditions: formData.get("terms_and_conditions"),
    company_url: formData.get("company_url"),
    shareable_url: "", //TODO: Generate shareable URL
    categories: String(formData.get("categories")).split(",") || [],
    discount_amount: formData.get("discount_amount"),
    public: formData.get("public") === "true" ? true : false,
    private_groups: String(formData.get("private_groups")).split(",") || [],
  };

  // Create a supabase client
  // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
  const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
  if (!supabase) {
    return NextResponse.json(
      { error: "Could not create supabase client" },
      { status: 401 }
    );
  }

  // Insert the new discount into the database
  const { data, error } = await supabase
    .from("discounts")
    .insert([newDiscount])
    .select();

  // Check for error and return response
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to insert discount in supabase" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: data }, { status: 200 });
}

/**
 * Retrieves discounts based on the provided query parameters.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts.
 */
export async function GET(request: NextRequest) {
  // Extract the filters from the query params
  let sort_by = request.nextUrl.searchParams.get("sort_by");
  let private_group =
    request.nextUrl.searchParams.get("private_group") || "all";
  let category = request.nextUrl.searchParams.get("category");
  let page_num = request.nextUrl.searchParams.get("page");

  let accending = true;

  // Interpret sort_by. Default to "view_count".
  if (sort_by === null) sort_by = "view_count";
  if (sort_by === "Most Popular") sort_by = "view_count";
  if (sort_by === "Highest to Lowest Discounts") {
    sort_by = "discount_amount";
    accending = false;
  }
  if (sort_by === "Lowest to Highest Discounts") sort_by = "discount_amount";

  // Get the range of discounts to fetch. Uses 0 indexing
  const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3;
    const from = page ? page * limit : 0;
    const to = page ? from + size - 1 : size - 1;

    return { from, to };
  };
  const { from, to } = getPagination(Number(page_num), 20);

  const { userId } = auth();
  const user = await currentUser();

  // If the user is logged in, fetch private group discounts and public discounts
  if (userId && user) {
    // DEV NOTE: This is a temporary fix to get around the fact that we can't create a supabase_jwt with a long-lived session token
    const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
    if (!supabase) {
      return NextResponse.json(
        { error: "Could not create supabase client" },
        { status: 401 }
      );
    }

    // Only fetch discounts of a category if the category is not "all"
    if (category && category !== "all") {
      let { data: categoryDiscounts, error } = await supabase
        .from("categories")
        .select("discounts")
        .eq("name", category)
        .single();

      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to fetch category discounts" },
          { status: 500 }
        );
      }

      // Convert the array of discount UUIDs into discounts
      const discountUUIDs = categoryDiscounts?.discounts;
      const { data: discountsData, error: discountsError } = await supabase
        .from("discounts")
        .select("*")
        .in("id", discountUUIDs)
        .order(sort_by, { ascending: accending })
        .range(from, to);

      if (discountsError) {
        console.log(discountsError);
        return NextResponse.json(
          { error: "Failed to convert discount UUIDs into discounts" },
          { status: 500 }
        );
      }

      const discounts = discountsData || [];

      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to fetch category discounts" },
          { status: 500 }
        );
      }
      return NextResponse.json({ discounts }, { status: 200 });
    }

    // Else, Fetch 20 discounts directly from discounts table
    let { data: discounts, error } = await supabase
      .from("discounts")
      .select("*")
      .order(sort_by, { ascending: accending })
      .range(from, to);

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to fetch public and private discounts" },
        { status: 500 }
      );
    }
    return NextResponse.json({ discounts }, { status: 200 });
  } else {
    // Only fetch public discounts if user is not logged in
    const supabase = await supabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Could not create supabase client" },
        { status: 401 }
      );
    }

    let { data: discounts, error } = await supabase
      .from("discounts")
      .select("*")
      .order(sort_by, { ascending: accending })
      .eq("public", true)
      .range(from, to);

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to fetch public discounts" },
        { status: 500 }
      );
    }
    return NextResponse.json({ discounts }, { status: 200 });
  }
}

// Delete a discount
export async function DELETE(request: NextRequest, response: NextResponse) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Failed to obtain current User" },
      { status: 401 }
    );
  }

  // Extract the discount_id from the query params
  const discount_id = request.nextUrl.searchParams.get("discount_id");

  // Create a Supabase client with the current user's access token
  const token = request.headers.get("supabase_jwt");
  if (!token) {
    return NextResponse.json(
      { error: "Missing supabase_jwt token" },
      { status: 401 }
    );
  }
  const supabase = await supabaseClient(token);
  if (!supabase) {
    return NextResponse.json(
      { error: "Failed to create supabase client" },
      { status: 401 }
    );
  }

  const { error } = await supabase
    .from("discounts")
    .delete()
    .eq("id", discount_id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete discount" },
      { status: 500 }
    );
  }
}

// Update a discount
export async function PATCH(request: NextRequest, response: NextResponse) {
  return await updateDiscount(request);
}
