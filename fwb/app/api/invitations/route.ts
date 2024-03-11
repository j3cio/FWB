import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser, clerkClient } from '@clerk/nextjs'

// Function to check if an invitation already exists for a given email
async function checkExistingInvitation(email: string) {
    const invitations = await clerkClient.invitations.getInvitationList()
    return invitations.find((invitation) => invitation.emailAddress === email)
}

// Send invitation emails
export async function POST(request: NextRequest) {
    const res = await request.json()
    const emails = res.emails

    // Iterate through the list of emails
    for (const email of emails) {
        try {
            // Check if an invitation already exists for the email
            const existingInvitation = await checkExistingInvitation(email)

            if (existingInvitation) {
                // If an invitation exists, revoke it
                await clerkClient.invitations.revokeInvitation(
                    existingInvitation.id
                )
            }

            // Create a new invitation
            await clerkClient.invitations.createInvitation({
                emailAddress: email,
                redirectUrl: 'http://localhost:3000/sign-up',
            })
        } catch (error) {
            console.log(error)
        }
    }
    return Response.json({ res: 'ok' })
}
