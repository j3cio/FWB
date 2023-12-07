import { NextRequest, NextResponse } from "next/server";
import supabaseClient from "@/supabase";

// Create a Supabase client with the current user's access token
const supabaseClientWithAccessToken = async (token: string | null) => {
  if (!token) {
    return null;
  } else {
    const supabase = await supabaseClient(token);
    return supabase;
  }
};

export { supabaseClientWithAccessToken };
