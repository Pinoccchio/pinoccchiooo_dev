"use client"

import { getProjectStats } from "@/data/projects"

export function PortfolioStats() {
  const stats = getProjectStats()

  const statItems = [
    {
      label: "Projects",
      value: stats.total.toString(),
      subtext: "Shipped and documented",
    },
    {
      label: "Hybrid Systems",
      value: stats.hybrid.toString(),
      subtext: "Web and mobile coordination",
    },
    {
      label: "Production",
      value: stats.production.toString(),
      subtext: "Live or deployed work",
    },
    {
      label: "AI-enabled",
      value: stats.aiMl.toString(),
      subtext: "Assistive and analytical flows",
    },
  ]

  return (
    <div>
      <div className="mt-4">
        <h2 className="pinocchio-name text-3xl">A compact view of the work</h2>
        <p className="mt-3 max-w-2xl text-[var(--text-secondary)] leading-8">
          The numbers are here to provide context, not to turn the page into a dashboard. They support the story, they
          do not replace it.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {statItems.map(item => (
          <div key={item.label} className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
            <div className="stat-value text-4xl text-[var(--text-primary)]">{item.value}</div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              {item.label}
            </div>
            <div className="mt-2 text-sm text-[var(--text-muted)]">{item.subtext}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="badge">Government workflows</span>
        <span className="badge">Healthcare systems</span>
        <span className="badge">Flutter delivery</span>
        <span className="badge">Next.js platforms</span>
        <span className="badge badge-accent">AI-integrated products</span>
      </div>
    </div>
  )
}
