import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

// TODO: add clerk stuff later
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
