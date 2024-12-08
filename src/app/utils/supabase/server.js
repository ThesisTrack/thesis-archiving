import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}
