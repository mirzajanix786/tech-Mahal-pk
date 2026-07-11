import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client — uses the SERVICE ROLE key.
 * This bypasses Row Level Security, so it can insert/update/delete products
 * and upload images. NEVER import this file from a "use client" component
 * or expose the service role key to the browser. Only used inside
 * app/api/**\/route.ts files (server-side only).
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
