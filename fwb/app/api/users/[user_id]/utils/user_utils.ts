import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

/**
 * Retrieves users registered through Clerk.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched users or an error response.
 */
const getSingleUser = async (request: NextRequest) => {
  //Extract the clerk user_id from the url path
  const urlObject = new URL(request.url);
  const userIdPathVariable = urlObject.pathname.split("/").pop();

  try {
    const { userId, getToken } = auth();
    const user = await currentUser();
    // If the user is logged in, fetch all other users on the platform
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

      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userIdPathVariable);

      if (error) {
        return NextResponse.json(
          { error: "Failed to fetch users" },
          { status: 500 },
        );
      }
      return NextResponse.json({ success: true, users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export { getSingleUser };
