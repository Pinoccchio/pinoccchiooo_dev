"use client"

import { getProjectStats } from "@/data/projects"

export function PortfolioStats() {
  const stats = getProjectStats()

  const statItems = [
    {
      label: "Total Projects",
      value: stats.total.toString(),
      subtext: "Comprehensive portfolio",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      label: "Tech Platforms",
      value: `${stats.web + stats.mobile}+`,
      subtext: `${stats.web} web, ${stats.mobile} mobile`,
      color: "text-green-600 dark:text-green-400"
    },
    {
      label: "Hybrid Systems",
      value: "4",
      subtext: "Web + Mobile platforms",
      color: "text-pink-600 dark:text-pink-400"
    },
    {
      label: "AI Integration",
      value: stats.aiMl.toString(),
      subtext: "Gemini, OpenAI, MediaPipe",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      label: "Active Period",
      value: "2023-2025",
      subtext: "Continuous development",
      color: "text-teal-600 dark:text-teal-400"
    }
  ]

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 sm:p-6 mb-6 border border-blue-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold pinocchio-primary">Portfolio Overview</h2>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700">
            {stats.production} Production
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
            {stats.active} Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className={`text-2xl sm:text-3xl font-bold ${item.color} mb-1`}>
              {item.value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {item.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Key Technologies Banner */}
      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Primary Tech:</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium">
            Flutter (24+ projects)
          </span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
            Next.js 15 (12+ projects)
          </span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
            Supabase (18 projects)
          </span>
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
            Firebase (12 projects)
          </span>
          <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full font-medium">
            AI Integration (7 projects)
          </span>
        </div>
      </div>
    </div>
  )
}
