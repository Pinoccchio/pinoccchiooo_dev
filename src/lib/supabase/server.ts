import { createClient } from "@supabase/supabase-js"

/**
 * Creates a Supabase client for use in Server Components and Server Actions
 * This client uses the service role key which has elevated permissions
 *
 * ⚠️ WARNING: Only use this in server-side code (Server Components, Server Actions, API Routes)
 * NEVER import this in Client Components as it would expose the service role key
 *
 * The service role key bypasses Row Level Security (RLS)
 * Use this when you need administrative access to the database
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

/**
 * Creates a Supabase client for Server Components with the anon key
 * This respects Row Level Security (RLS) policies
 * Use this when you want to enforce RLS on the server side
 */
export function createServerAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
