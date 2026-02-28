import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase client for use in browser/client components
 * This client is safe to use in Client Components (with "use client")
 *
 * Uses NEXT_PUBLIC_ environment variables which are exposed to the browser
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required"
    )
  }

  return createSupabaseClient(url, key)
}

// Export a singleton instance for convenience
export const supabase = createClient()
