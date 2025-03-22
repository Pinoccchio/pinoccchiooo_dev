"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        theme === "light"
          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
          : "bg-blue-800 text-yellow-300 hover:bg-blue-700"
      }`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

