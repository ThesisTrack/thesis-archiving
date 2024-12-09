import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}