import { NextRequest, NextResponse } from "next/server";
import supabaseClient from "@/supabase";

export async function GET(request: NextRequest & { query: Record<string, string> }, response: NextResponse) {
    return NextResponse.json({ error: 'Not Implemented' }, { status: 500 })
}