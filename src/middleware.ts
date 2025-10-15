import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Get user session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Check if user is authenticated and has admin role
    const isAdmin = user?.user_metadata?.role === "admin"

    if (!user || !isAdmin) {
      // Not authenticated or not admin, redirect to home
      const redirectUrl = new URL("/", request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return supabaseResponse
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
