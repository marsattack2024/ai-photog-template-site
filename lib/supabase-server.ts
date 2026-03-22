// lib/supabase-server.ts
// Service-role client for server-side operations (Server Actions, Route Handlers)
// NEVER import this in client components or expose to the browser
import { createClient } from "@supabase/supabase-js";

export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing server Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required"
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
