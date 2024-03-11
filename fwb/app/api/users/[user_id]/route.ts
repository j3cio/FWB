import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { getSingleUser } from "@/app/api/users/[user_id]/utils/user_utils";

// Get single user
export async function GET(request: NextRequest) {
  return await getSingleUser(request);
}
