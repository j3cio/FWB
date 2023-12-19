import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { insertDiscount, getDiscounts, deleteDiscount, updateDiscount } from "@/app/api/discounts/utils/discount_utils";

// Create a new discount
export async function POST(request: NextRequest) {
  return (await insertDiscount(request));
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
