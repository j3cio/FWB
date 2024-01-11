import { SupabaseClient } from "@supabase/supabase-js";


/**
 * Retrieves discounts by their IDs from the Supabase database.
 * @param ids - An array of discount IDs.
 * @param supabaseClient - The Supabase client instance.
 * @returns A promise that resolves to an array of discounts.
 * @throws An error if the discounts cannot be fetched.
 */
export default function getDiscountsByIds(ids: string[], supabaseClient: SupabaseClient): Promise<any> {
  return new Promise((resolve, reject) => {
    supabaseClient
      .from("discounts")
      .select("*")
      .in("id", ids)
      .then(({ data: discounts, error }) => {
        if (error) {
          reject(new Error("Failed to fetch discounts"));
        } else {
          resolve(discounts);
        }
      })
  });
}
