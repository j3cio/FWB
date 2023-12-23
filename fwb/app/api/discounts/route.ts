import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { insertDiscount, getDiscounts, deleteDiscount, updateDiscount } from "@/app/api/discounts/utils/discount_utils";

// Create a new discount
export async function POST(request: NextRequest) {
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Failed to obtain current User" }, { status: 401 });
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
  const supabase = await supabaseClient(
    request.headers.get("supabase_jwt")
  );
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

export async function GET(request: NextRequest) {
  return (await getDiscounts(request));
}

// Delete a discount
export async function DELETE(request: NextRequest, response: NextResponse) {
  return (await deleteDiscount(request));
}

// Update a discount
export async function PATCH(request: NextRequest, response: NextResponse) {
  return (await updateDiscount(request));
}
