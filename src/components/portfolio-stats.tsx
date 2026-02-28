"use client"

import { getProjectStats } from "@/data/projects"

export function PortfolioStats() {
  const stats = getProjectStats()

  const statItems = [
    {
      label: "Total Projects",
      value: stats.total.toString(),
      subtext: "Comprehensive portfolio"
    },
    {
      label: "Tech Platforms",
      value: `${stats.web + stats.mobile}+`,
      subtext: `${stats.web} web, ${stats.mobile} mobile`
    },
    {
      label: "Hybrid Systems",
      value: "4",
      subtext: "Web + Mobile platforms"
    },
    {
      label: "AI Integration",
      value: stats.aiMl.toString(),
      subtext: "Gemini, OpenAI, MediaPipe"
    },
    {
      label: "Active Period",
      value: "2023-2025",
      subtext: "Continuous development"
    }
  ]

  return (
    <div className="bg-[var(--surface-secondary)] rounded-lg p-4 sm:p-6 mb-6 border border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold pinocchio-primary">Portfolio Overview</h2>
        <div className="flex items-center gap-2">
          <span className="badge badge-accent">
            {stats.production} Production
          </span>
          <span className="badge">
            {stats.active} Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-[var(--surface-primary)] rounded-lg p-3 sm:p-4 border border-[var(--border)] hover:shadow-md transition-shadow">
            <div className="stat-value text-2xl sm:text-3xl text-[var(--accent)] mb-1">
              {item.value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)] mb-1">
              {item.label}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              {item.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Key Technologies Banner */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-medium text-[var(--text-secondary)]">Primary Tech:</span>
          <span className="badge">Flutter (24+ projects)</span>
          <span className="badge">Next.js 15 (12+ projects)</span>
          <span className="badge">Supabase (18 projects)</span>
          <span className="badge">Firebase (12 projects)</span>
          <span className="badge badge-accent">AI Integration (7 projects)</span>
        </div>
      </div>
    </div>
  )
}
