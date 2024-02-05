import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { getCompanyDiscounts } from "@/app/api/companies/[company_name]/utils/company_utils";

// Get single user
export async function GET(request: NextRequest) {
  return (await getCompanyDiscounts(request));
}