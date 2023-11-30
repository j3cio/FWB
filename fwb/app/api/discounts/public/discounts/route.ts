import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

export async function GET(request: NextRequest & { query: Record<string, string> }, response: NextResponse) {
    // Filters
    const sort_by = request.nextUrl.searchParams.get('sort_by');
    const private_group = request.nextUrl.searchParams.get('private_group');
    const category = request.nextUrl.searchParams.get('category');
    const page_num = request.nextUrl.searchParams.get('page');
  
    const supabase = await supabaseClient();
    let { data: discounts, error } = await supabase
    .from('discounts')
    .select('*')
    return NextResponse.json({ success: true, discounts }, { status: 200 });
  }