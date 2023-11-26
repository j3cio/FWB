import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseClient } from "./supabaseClient";

/**
 * Retrieves all discounts from the Supabase database.
 *
 * @param {SupabaseClient} supabase - The Supabase client used to connect to the database.
 * @return {Promise<Array>} An array of discounts retrieved from the database.
 */
const getAllDiscounts = async (supabase : SupabaseClient) => {
  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("*");
  if (error) {
    console.error(error)
  }


  return discounts;
};

export { getAllDiscounts };
