import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

/**
 * Retrieves users registered through Clerk.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */
export async function GET(request: NextRequest) {
  //Extract the company_name from the url path
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("companyQuery");

  try {
    const { userId, getToken } = auth();
    const user = await currentUser();
    if (userId && user) {
      const supabase = await supabaseClient(
        request.headers.get("supabase_jwt"),
      );
      if (!supabase) {
        return NextResponse.json(
          { error: "Could not create supabase access token" },
          { status: 401 },
        );
      }

      let { data: companyData, error } = await supabase
        .from("companies")
        .select("*")
        .eq("name", query);

      if (error) {
        return NextResponse.json(
          { error: "Failed to fetch companies table" },
          { status: 500 },
        );
      }

      if (!companyData) {
        return NextResponse.json(
          { error: "That company doesn't have any discounts" },
          { status: 500 },
        );
      }

      return NextResponse.json(companyData[0], { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
