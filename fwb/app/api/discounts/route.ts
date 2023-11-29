import type { NextApiRequest, NextApiResponse } from "next";
import { auth, currentUser } from "@clerk/nextjs";
import supabaseClient from "@/supabase";

interface Discount {
  user_id: string;
  company: string;
  terms_and_conditions: string;
  company_url: string;
  shareable_url: string;
  discount_amount: number;
  public: boolean;
  private_groups?: string;
  updated_by?: string;
 }

// Create a new discount
export async function CREATE(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { userId, getToken, orgRole } = auth();
  const user = await currentUser();

  if (userId && user) {
    const newDiscount = {
      user_id: user.id,
      company: request.body.company,
      terms_and_conditions: request.body.terms_and_conditions,
      company_url: request.body.company_url,
      shareable_url: "",
      discount_amount: request.body.discount_amount,
      public: request.body.public,
      private_groups: request.body.private_groups,
    };

    // Create a Supabase client with the current user's access token
    const token = await getToken({ template: "supabase" });
    if (!token) {
      return response.status(401).json({ error: "Unauthorized" });
    }
    const supabase = await supabaseClient(token);

    // Insert the new discount into the database
    const { data, error } = await supabase
      .from("discounts")
      .insert([newDiscount])
      .select();
    if (error) {
      return response.status(500).json({ error: "Failed to create discount" });
    }

    return response.status(200).json({ success: true, data });
  } else {
    return response.status(401).json({ error: "Unauthorized" });
  }
}

// Get all discounts accessible to the current user
export async function GET(request: NextApiRequest, response: NextApiResponse) {}

// Delete a discount
export async function DELETE(
  request: NextApiRequest,
  response: NextApiResponse
) {}

// Update a discount
export async function PATCH(
  request: NextApiRequest,
  response: NextApiResponse
) {}
