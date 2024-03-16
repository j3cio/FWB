import {
  deleteGroup,
  getGroups,
  insertGroup,
  updateGroup,
} from "@/app/api/groups/utils/group_utils";
import { NextRequest, NextResponse } from "next/server";

interface Group {
  created_at: Date;
  name: string;
  users: string[]; // An array of userIDs
  public: boolean;
  discounts: string[]; // An array of discountIDs
  admins: string[]; // An array of userIDs who are admins within the group
}

// Create a new group
export async function POST(request: NextRequest, response: NextResponse) {
  return await insertGroup(request);
}
// Get all groups
export async function GET(
  request: NextRequest & { query: Record<string, string> },
  response: NextResponse,
) {
  return await getGroups(request);
}
// Delete a group
export async function DELETE(request: NextRequest, response: NextResponse) {
  return await deleteGroup(request);
}
// Update a group
export async function PATCH(request: NextRequest, response: NextResponse) {
  return await updateGroup(request);
}
