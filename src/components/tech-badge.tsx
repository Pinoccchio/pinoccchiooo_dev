import { cn } from "@/lib/utils"

interface TechBadgeProps {
  tech: string
  className?: string
}

// Unified neutral color for all tech badges - cleaner visual hierarchy
const getTechColor = (): string => {
  return "bg-[var(--surface-tertiary)] text-[var(--text-secondary)] border-[var(--border)]"
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors",
        getTechColor(),
        className
      )}
      title={tech}
    >
      {tech}
    </span>
  )
}

// Component for displaying multiple tech badges
interface TechBadgeListProps {
  technologies: string[]
  maxDisplay?: number
  className?: string
}

export function TechBadgeList({ technologies, maxDisplay = 100, className }: TechBadgeListProps) {
  // Show all badges by default (maxDisplay set to 100, effectively unlimited)
  const displayTechs = technologies.slice(0, Math.min(maxDisplay, technologies.length))

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayTechs.map((tech, index) => (
        <TechBadge key={index} tech={tech} />
      ))}
    </div>
  )
}
