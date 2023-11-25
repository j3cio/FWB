import exp from "constants";
import React from "react";
import { supabaseClient } from "./supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

const SupabaseContext = React.createContext(null);

function SupabaseProvider({ children }: any) {
  const [supabase, setSupabase] = React.useState<any>(null);
  const { getToken } = useAuth();

  React.useEffect(() => {
    getToken().then((token) => {
      if (!token) {
        console.error("No token found");
        setSupabase(null);
        return;
      }
      const client = supabaseClient(token);
      setSupabase(client);
    });
  }, [getToken]);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
 }

export default SupabaseProvider;
