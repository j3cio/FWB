import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client instance with the provided access token.
 *
 * @param {string} supabaseAccessToken - The access token used to authenticate with Supabase.
 * @return {SupabaseClient} The Supabase client instance.
 */
export const supabaseClient = (supabaseAccessToken:string) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_KEY || "", {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  return supabase;
};
