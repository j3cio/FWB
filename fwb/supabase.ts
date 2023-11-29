import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with the provided access token.
 * @param {string} supabaseAccessToken - The access token for the Supabase client.
 * @returns {Promise<SupabaseClient>} - The Supabase client instance.
 * @throws {Error} - If the required environment variables are missing.
 */
const supabaseClient = async (supabaseAccessToken: string) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL env var");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_KEY env var");
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  return supabase;
};

export default supabaseClient;
