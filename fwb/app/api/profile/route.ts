import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    // Get the user ID from the session
    const { userId } = getAuth(req);
    console.log(userId);
    console.log(formData.get("username"));
    // If there is no user ID, respond with an authentication error
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" });
    }

    // Use Clerk.js' updateUser method to update the username
    if (formData.get("username")) {
      const updatedUser = await clerkClient.users.updateUser(userId, {
        username: formData.get("username") as string,
      });
      console.log({ clerk: updatedUser });
    }

    // const response = await updateUser(req);
    // console.log({ supabase: await response.json() });

    return NextResponse.json({ user: "Successful Update" });

    // Respond with the updated user information
  } catch (error) {
    // Handle errors and respond with a server error
    console.error("Error updating username:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
