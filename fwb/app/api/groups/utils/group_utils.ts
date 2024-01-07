import supabaseClient from "@/supabase";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * Inserts a new group into the database.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
const insertGroup = async (request: NextRequest) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    // Check if the user is logged in
    if (userId && user) {
      // Extract the form data
      const formData = await request.formData();

      const newGroup = {
        name: formData.get("name"),
        users: formData.get("users") || [],
        discounts: formData.get("discounts") || [],
        admins: formData.get("admins") || [],
        public: formData.get("public") === "false" ? false : true, // There might be a way to use a boolean rather than having to type false?
      };

      const supabase = await supabaseClient(request.headers.get("supabase_jwt"));
      if (!supabase) {
        return NextResponse.json({ error: "Could not create supabase access token" }, { status: 401 });
      }
      // Insert the new group into the groups table in supabase
      const { data, error } = await supabase.from("groups").insert([newGroup]).select();

      // Check for error and return response
      if (error) {
        return NextResponse.json({ error: "Failed to create new group", details: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ data: data }, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export { insertGroup };
