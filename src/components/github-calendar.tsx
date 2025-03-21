"use client"

import { useState, useEffect } from "react"

export function GitHubCalendar() {
  const [contributions, setContributions] = useState<number[][]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Mon", "Wed", "Fri"]

  // Generate random contribution data
  useEffect(() => {
    const generateContributions = () => {
      const data = []
      for (let i = 0; i < 53; i++) {
        const week = []
        for (let j = 0; j < 7; j++) {
          // Random contribution level: 0-4
          const level = Math.floor(Math.random() * 5)
          week.push(level)
        }
        data.push(week)
      }
      return data
    }

    setContributions(generateContributions())
    setIsLoaded(true)
  }, [])

  // Get color based on contribution level
  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100"
      case 1:
        return "bg-blue-100"
      case 2:
        return "bg-blue-200"
      case 3:
        return "bg-blue-300"
      case 4:
        return "bg-blue-400"
      default:
        return "bg-gray-100"
    }
  }

  // Show a loading state until client-side rendering is complete
  if (!isLoaded) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-gray-500">Loading contributions...</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max">
        <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
          {days.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>

        <div>
          <div className="flex text-xs text-gray-500 mb-1">
            {months.map((month, i) => (
              <div key={i} className="w-8">
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            {contributions.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 ${getColor(day)} rounded-sm`}
                    title={`${day} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

