import { NextRequest, NextResponse } from "next/server";
import supabaseClient from "@/supabase";
import {
  getNewLogoUrl,
  getExistingLogoUrl,
  saveLogoUrl,
} from "@/utils/logos_utils";

export async function GET(request: NextRequest) {
  try {
    // Check if domain_name parameter exists
    const domain_name = request.nextUrl.searchParams.get("domain_name");
    if (!domain_name) {
      return NextResponse.json(
        { message: "Missing domain_name parameter" },
        { status: 400 }
      );
    }

    // Fetch existing logo url from database
    const existingLogoUrl = await getExistingLogoUrl(domain_name);
    if (existingLogoUrl) {
      return NextResponse.json({ logo_url: existingLogoUrl }, { status: 200 });
    }

    // If it doesn't exist, fetch it from Brandfetch and save it to the database
    const logoUrl = await getNewLogoUrl(domain_name);
    saveLogoUrl(domain_name, logoUrl);
    return NextResponse.json({ logo_url: logoUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "An error occurred while fetching brand data. Check domain_name format or try again later.",
      },
      { status: 500 }
    );
  }
}
