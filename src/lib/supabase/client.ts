import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase client for use in browser/client components
 * This client is safe to use in Client Components (with "use client")
 *
 * Uses NEXT_PUBLIC_ environment variables which are exposed to the browser
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Export a singleton instance for convenience
export const supabase = createClient()
