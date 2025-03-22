"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"

export function GitHubCalendar() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [CalendarComponent, setCalendarComponent] = useState<any>(null)
  const { theme } = useTheme()
  const username = "Pinoccchio" // Your GitHub username

  useEffect(() => {
    // Dynamically import the component to avoid SSR issues
    import("react-github-calendar").then((module) => {
      setCalendarComponent(() => module.default)
      setIsLoaded(true)
    })
  }, [])

  // Show a loading state until client-side rendering is complete
  if (!isLoaded || !CalendarComponent) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="pinocchio-text">Loading contributions...</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto py-2">
      <CalendarComponent
        username={username}
        colorScheme={theme === "dark" ? "dark" : "light"}
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
        hideColorLegend
        hideMonthLabels={false}
        className="w-full"
        blockSize={12}
        blockMargin={4}
      />
      <div className="text-center mt-4 text-sm pinocchio-text">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pinocchio-accent hover:underline"
        >
          View my full GitHub profile
        </a>
      </div>
    </div>
  )
}

