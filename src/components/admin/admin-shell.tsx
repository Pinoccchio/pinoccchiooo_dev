"use client"

import { useState } from "react"
import { AdminSidebar } from "./sidebar"
import { AdminHeader } from "./header"
import { AdminPageProvider, useAdminPage } from "./admin-page-context"
import { cn } from "@/lib/utils"

type AdminShellProps = {
  adminEmail: string
  onLogout: () => void
  children: React.ReactNode
}

function AdminShellContent({ adminEmail, onLogout, children }: AdminShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { pageTitle } = useAdminPage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <AdminSidebar
        adminEmail={adminEmail}
        onLogout={onLogout}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* Header */}
      <AdminHeader
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        pageTitle={pageTitle}
      />

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 p-2 sm:p-4 lg:p-8 overflow-y-auto transition-all duration-300 min-h-screen",
          "pt-18 lg:pt-24", // Top padding for fixed header (mobile h-16 + 8px, desktop h-18 + 24px)
          isCollapsed ? "lg:ml-20" : "lg:ml-64" // Left margin for sidebar on desktop
        )}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export function AdminShell({ adminEmail, onLogout, children }: AdminShellProps) {
  return (
    <AdminPageProvider>
      <AdminShellContent adminEmail={adminEmail} onLogout={onLogout}>
        {children}
      </AdminShellContent>
    </AdminPageProvider>
  )
}
