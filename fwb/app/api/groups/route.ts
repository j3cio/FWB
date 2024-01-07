import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";
import { insertGroup } from  "@/app/api/groups/utils/group_utils";


interface Group {
  created_at: Date;
  name: string;
  users: string[]; // An array of userIDs
  public: boolean;
  discounts: string[]; // An array of discountIDs
  admins: string[]; // An array of userIDs who are admins within the group
  // have to work out how to give admin permissions within groups
}

// Create a new group
export async function POST(request: NextRequest, response: NextResponse) {
  return (await insertGroup(request));
}
// Get all groups
export async function GET(request: NextRequest & { query: Record<string, string> }, response: NextResponse) {
  try {
    // Fetch all public groups
    const supabase = await supabaseClient();
    let { data, error } = await supabase.from("groups").select("*");
    if (error) {
      return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
// Delete a group
export async function DELETE(request: NextRequest, response: NextResponse) {
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
}
// Update a group
export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (userId && user) {
      //const group_id = request.nextUrl.searchParams.get("group_id");
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
      const { data, error } = await supabase
        .from("groups")
        .update(updatedGroup)
        .eq("id", "603f958e-8760-4f3a-8ecc-ce979e2433dc") // TODO: This uuid should not be hardcoded
        .select();
      console.log(error);
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
}
