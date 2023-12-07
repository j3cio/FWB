import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { insertDiscount, getDiscounts } from "@/utils/discount_utils";

// Create a new discount
export async function POST(request: NextRequest) {
  return (await insertDiscount(request));
}

export async function GET(request: NextRequest) {
  return (await getDiscounts(request));
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
        return NextResponse.json(
          { success: true, deleted: discount_id },
          { status: 200 }
        );
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
  try {
    const { userId, getToken } = auth();
    const user = await currentUser();
    if (userId && user) {
      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        console.log("no token");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);

      const formData = await request.formData();
      const updatedDiscount: any = {};

      const discount_id = formData.get("discount_id");

      if (formData.get("company")) {
        updatedDiscount.company = formData.get("company");
      }
      if (formData.get("terms_and_conditions")) {
        updatedDiscount.terms_and_conditions = formData.get(
          "terms_and_conditions"
        );
      }
      if (formData.get("company_url")) {
        updatedDiscount.company_url = formData.get("company_url");
      }
      if (formData.get("discount_amount")) {
        updatedDiscount.discount_amount = Number(
          formData.get("discount_amount")
        );
      }
      if (formData.get("public")) {
        updatedDiscount.public =
          formData.get("public") === "true" ? true : false;
      }
      if (formData.get("private_groups")) {
        updatedDiscount.private_groups = formData.get("private_groups");
      }

      const { data, error } = await supabase
        .from("discounts")
        .update(updatedDiscount)
        .eq("id", discount_id)
        .select();

      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to update discount" },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { success: true, updated_values: data },
          { status: 200 }
        );
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
