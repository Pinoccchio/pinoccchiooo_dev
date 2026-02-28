"use server"

import { createServerAnonClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export type AdminUser = {
  id: string
  email: string
}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

/**
 * Login admin user using Supabase Auth
 */
export async function loginAdmin(formData: FormData) {
  try {
    const rawEmail = formData.get("email")
    const rawPassword = formData.get("password")

    const result = loginSchema.safeParse({
      email: rawEmail,
      password: rawPassword,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      const errorMessage = errors.email?.[0] || errors.password?.[0] || "Invalid input"
      return { success: false, error: errorMessage }
    }

    const { email, password } = result.data

    const supabase = await createServerAnonClient()

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Verify user has admin role (check user_metadata)
    const isAdmin = data.user.user_metadata?.role === "admin"

    if (!isAdmin) {
      // Sign out if not admin
      await supabase.auth.signOut()
      return { success: false, error: "Unauthorized - Admin access only" }
    }

    revalidatePath("/", "layout")

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || "",
      },
    }
  } catch {
    return { success: false, error: "An error occurred during login" }
  }
}

/**
 * Logout admin user
 */
export async function logoutAdmin() {
  try {
    const supabase = await createServerAnonClient()
    await supabase.auth.signOut()

    revalidatePath("/", "layout")

    return { success: true }
  } catch {
    return { success: false, error: "An error occurred during logout" }
  }
}

/**
 * Get current admin user from session
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const supabase = await createServerAnonClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    // Verify admin role
    const isAdmin = user.user_metadata?.role === "admin"

    if (!isAdmin) {
      return null
    }

    return {
      id: user.id,
      email: user.email || "",
    }
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated as admin
 */
export async function isAuthenticated(): Promise<boolean> {
  const admin = await getCurrentAdmin()
  return admin !== null
}

/**
 * Verify admin session (used in server components)
 */
export async function verifyAdminSession(): Promise<{ user: AdminUser | null }> {
  const user = await getCurrentAdmin()
  return { user }
}
