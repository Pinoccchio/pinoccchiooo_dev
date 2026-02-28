import { createServerClient as createSSRClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

/**
 * Creates a Supabase client for Server Components and Server Actions with SSR support
 * This client uses the service role key for admin operations that bypass RLS
 *
 * ⚠️ WARNING: Only use this in server-side code (Server Components, Server Actions, API Routes)
 * NEVER import this in Client Components as it would expose the service role key
 */
export async function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required"
    )
  }

  const cookieStore = await cookies()

  return createSSRClient(url, serviceRoleKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Handle cookies in Server Components (read-only)
          }
        },
      },
    }
  )
}

/**
 * Creates a direct Supabase admin client using service role key
 * This client properly sets the service_role context for storage operations
 * Use this for storage uploads/deletes to avoid RLS policy conflicts
 *
 * ⚠️ WARNING: Only use this in server-side code (Server Actions, API Routes)
 * NEVER import this in Client Components as it would expose the service role key
 */
export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error(
      "createAdminClient must only be used server-side. Do not import this in client components."
    )
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required"
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Creates a Supabase client for Server Components with the anon key
 * This respects Row Level Security (RLS) policies and handles user authentication
 * Use this when you want to enforce RLS and access user sessions on the server side
 */
export async function createServerAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required"
    )
  }

  const cookieStore = await cookies()

  return createSSRClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Handle cookies in Server Components (read-only)
          }
        },
      },
    }
  )
}
