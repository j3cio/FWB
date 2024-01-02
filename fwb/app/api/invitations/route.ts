import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser, clerkClient } from "@clerk/nextjs";

// send invitation emails
export async function POST(request: NextRequest) {
  const invitations = await clerkClient.invitations.getInvitationList();

  const res = await request.json();
  const emails = res.emails;

  emails.forEach(async (email: string) => {
    try {
      const invitation = await clerkClient.invitations.createInvitation({
        emailAddress: email,
        redirectUrl: "http://localhost:3000/sign-up",
        // publicMetadata: {
        //   example: "metadata",
        //   example_nested: {
        //     nested: "metadata",
        //   },
        // },
      });
    } catch (error) {
      console.log(error);
    }
  });
  console.log(invitations);

  return Response.json({ res: "ok" });
}
