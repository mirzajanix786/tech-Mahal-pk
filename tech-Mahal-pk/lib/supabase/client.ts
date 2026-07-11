import { createClient } from "@supabase/supabase-js";

/**
 * Public Supabase client — uses the anon key.
 * Safe to use anywhere (it can only do what the Row Level Security
 * policies on the database allow, which is: read products only).
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);
