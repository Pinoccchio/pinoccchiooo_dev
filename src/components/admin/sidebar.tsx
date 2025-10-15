"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Upload, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type SidebarProps = {
  adminEmail: string
  onLogout: () => void
  isCollapsed: boolean
  isMobileOpen: boolean
  onToggleCollapse: () => void
  onToggleMobile: () => void
}

export function AdminSidebar({
  adminEmail,
  onLogout,
  isCollapsed,
  isMobileOpen,
  onToggleMobile
}: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/uploads",
      label: "Uploads",
      icon: Upload,
      exact: false,
    },
  ]

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className={cn(
        "flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-700",
        isCollapsed && "px-4 justify-center"
      )}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex-shrink-0">
          <Image
            src="/pinocchio-avatar.png"
            alt="Admin"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{adminEmail}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onToggleMobile()}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                active
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "flex-shrink-0",
                  active && "drop-shadow-sm"
                )}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn(
        "px-3 py-4 border-t border-gray-200 dark:border-gray-700",
        isCollapsed && "px-2"
      )}>
        <button
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => onToggleMobile()}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex fixed top-0 left-0 bottom-0 z-30 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
