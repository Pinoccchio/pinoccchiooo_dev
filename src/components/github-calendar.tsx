/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"

export function GitHubCalendar() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [CalendarComponent, setCalendarComponent] = useState<any>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const { theme } = useTheme()
  const username = "Pinoccchio" // Your GitHub username

  useEffect(() => {
    // Dynamically import the component to avoid SSR issues
    import("react-github-calendar").then((module) => {
      setCalendarComponent(() => module.default)
      setIsLoaded(true)
    })
  }, [])

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth)
    }

    updateViewportWidth()
    window.addEventListener("resize", updateViewportWidth)

    return () => {
      window.removeEventListener("resize", updateViewportWidth)
    }
  }, [])

  // Show a loading state until client-side rendering is complete
  if (!isLoaded || !CalendarComponent) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="pinocchio-text">Loading contributions...</p>
      </div>
    )
  }

  // Define color themes that match GitHub's original design
  const colorTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }

  const calendarSizing =
    viewportWidth >= 1280
      ? { blockSize: 17, blockMargin: 4, fontSize: 14 }
      : viewportWidth >= 1024
        ? { blockSize: 16, blockMargin: 4, fontSize: 13 }
        : viewportWidth >= 768
          ? { blockSize: 12, blockMargin: 4, fontSize: 12 }
          : viewportWidth >= 480
            ? { blockSize: 9, blockMargin: 3, fontSize: 10 }
            : { blockSize: 8, blockMargin: 2, fontSize: 9 }

  return (
    <div className="overflow-x-auto pt-2 pb-1">
      <div className="min-w-[280px] sm:min-w-[320px] w-full">
        <CalendarComponent
          username={username}
          colorScheme={theme === "dark" ? "dark" : "light"}
          theme={colorTheme}
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
          hideColorLegend
          hideMonthLabels={false}
          className="w-full"
          blockSize={calendarSizing.blockSize}
          blockMargin={calendarSizing.blockMargin}
          fontSize={calendarSizing.fontSize}
        />
      </div>
      <div className="mt-2 text-center text-xs sm:text-sm pinocchio-text">
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

