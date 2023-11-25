import { supabaseClient } from "./supabaseClient";

const getAllDiscounts = async ({ token } : { userId: string | undefined | null, token: string }) => {
  const supabase = supabaseClient(token);
  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("*");

  return discounts;
};

export { getAllDiscounts };
