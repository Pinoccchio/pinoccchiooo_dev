import type React from "react"
import { getCurrentAdmin, logoutAdmin } from "@/app/actions/admin-auth-actions"
import { redirect } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/")
  }

  return (
    <AdminShell
      adminEmail={admin.email}
      onLogout={async () => {
        "use server"
        await logoutAdmin()
        redirect("/")
      }}
    >
      {children}
    </AdminShell>
  )
}
