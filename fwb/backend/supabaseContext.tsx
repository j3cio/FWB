"use client"
import exp from "constants";
import React from "react";
import { supabaseClient } from "./supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

const SupabaseContext = React.createContext(null);


/**
 * Initializes the Supabase provider and sets up the Supabase client.
 *
 * @param {any} children - the child components
 * @return {JSX.Element} the Supabase provider component
 */
function SupabaseProvider({ children }: any) {
  const [supabase, setSupabase] = React.useState<any>(null);
  const { getToken } = useAuth();
  React.useEffect(() => {
    getToken({template: 'supabase'}).then( async (token) => {
      if (!token) {
        console.error("No token found");
        setSupabase(null);
        return;
      }
      if (!supabase) {
        // Create a new client instance
        let client = supabaseClient(token);
        setSupabase(client);
      }
 
    });
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
 }

export { SupabaseContext, SupabaseProvider };
