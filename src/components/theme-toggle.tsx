"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)] transition-colors ${
        theme === "light"
          ? "bg-white hover:bg-[var(--surface-secondary)]"
          : "bg-[var(--surface-primary)] hover:bg-[var(--surface-tertiary)]"
      }`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

