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
/**
 * Retrieves group based on the provided query parameters.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts.
 */
const getGroups = async (request: NextRequest) => {
  let group_id = request.nextUrl.searchParams.get("group_id");
  try {
    // Fetch all public groups
    const supabase = await supabaseClient();
    if (group_id) {
      // If group_id return specific group
      let { data, error } = await supabase.from("groups").select("*").eq("id", group_id);
      if (error) {
        return NextResponse.json({ error: "Failed to fetch group" }, { status: 500 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      let { data, error } = await supabase.from("groups").select("*");
      if (error) {
        // Else return all groups
        return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
/**
 * Deletes a group based on the provided query parameters.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts.
 */
const deleteGroup = async (request: NextRequest) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (userId && user) {
      const group_id = request.nextUrl.searchParams.get("group_id");

      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");
      if (!token) {
        return NextResponse.json({ error: "Could not create supabase access token" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);
      const { error } = await supabase.from("groups").delete().eq("id", group_id);

      if (error) {
        return NextResponse.json({ error: "Failed to delete group" }, { status: 500 });
      } else {
        return NextResponse.json({ success: true }, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
/**
 * Update a group based on the provided query parameters and form data.
 *
 * @param request - The NextRequest object containing the query parameters.
 * @returns A NextResponse object containing the fetched discounts.
 */
const updateGroup = async (request: NextRequest) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (userId && user) {
      const group_id = request.nextUrl.searchParams.get("group_id");
      const formData = await request.formData();

      const updatedGroup = {
        name: formData.get("name"),
        users: formData.get("users"), // Array
        discounts: formData.get("discounts"), // Array
        admins: formData.get("admins"), // Array
        public: formData.get("public"),
      };

      // Create a Supabase client with the current user's access token
      const token = request.headers.get("supabase_jwt");

      if (!token) {
        return NextResponse.json({ error: "Could not create supabase access token" }, { status: 401 });
      }
      const supabase = await supabaseClient(token);

      // Update the group in the database
      const { data, error } = await supabase.from("groups").update(updatedGroup).eq("id", group_id).select();
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export { deleteGroup, getGroups, insertGroup, updateGroup };
