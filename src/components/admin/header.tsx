"use client"

import { Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type AdminHeaderProps = {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onToggleMobile: () => void
  pageTitle?: string
}

export function AdminHeader({
  isCollapsed,
  onToggleCollapse,
  onToggleMobile,
  pageTitle = "Admin Panel",
}: AdminHeaderProps) {
  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobile}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>
      </header>

      {/* Desktop Header */}
      <header
        className={cn(
          "hidden lg:flex fixed top-0 right-0 z-20 h-18 items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300",
          isCollapsed ? "left-20" : "left-64"
        )}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>
      </header>
    </>
  )
}
