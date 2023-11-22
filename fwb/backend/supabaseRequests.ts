import { supabaseClient } from "./supabaseClient";

const getAllDiscounts = async ({
  supabase,
}: {
  supabase: any;
}) => {
  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("*");
  
  if (error) {
    console.log(error);
  }

  return discounts;
};

export { getAllDiscounts };
