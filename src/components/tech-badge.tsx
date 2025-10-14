import { cn } from "@/lib/utils"

interface TechBadgeProps {
  tech: string
  className?: string
}

// Color mapping for different technology categories
const getTechColor = (tech: string): string => {
  const lowerTech = tech.toLowerCase()

  // Frontend Frameworks (Blue)
  if (
    lowerTech.includes("next") ||
    lowerTech.includes("react") ||
    lowerTech.includes("vite") ||
    lowerTech.includes("tailwind")
  ) {
    return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700"
  }

  // Mobile (Purple)
  if (lowerTech.includes("flutter") || lowerTech.includes("dart") || lowerTech.includes("android")) {
    return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700"
  }

  // Backend/Database (Green)
  if (
    lowerTech.includes("supabase") ||
    lowerTech.includes("firebase") ||
    lowerTech.includes("postgresql") ||
    lowerTech.includes("sql")
  ) {
    return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700"
  }

  // AI/ML (Pink/Red)
  if (
    lowerTech.includes("gemini") ||
    lowerTech.includes("openai") ||
    lowerTech.includes("ai") ||
    lowerTech.includes("mediapipe") ||
    lowerTech.includes("tensorflow") ||
    lowerTech.includes("ml")
  ) {
    return "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-700"
  }

  // State Management (Indigo)
  if (
    lowerTech.includes("riverpod") ||
    lowerTech.includes("provider") ||
    lowerTech.includes("bloc") ||
    lowerTech.includes("getx") ||
    lowerTech.includes("redux")
  ) {
    return "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700"
  }

  // Languages (Orange)
  if (
    lowerTech.includes("typescript") ||
    lowerTech.includes("javascript") ||
    lowerTech.includes("java") ||
    lowerTech.includes("kotlin") ||
    lowerTech.includes("python")
  ) {
    return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700"
  }

  // Maps & Location (Teal)
  if (
    lowerTech.includes("map") ||
    lowerTech.includes("geolocator") ||
    lowerTech.includes("location") ||
    lowerTech.includes("leaflet")
  ) {
    return "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-700"
  }

  // UI Libraries (Cyan)
  if (
    lowerTech.includes("radix") ||
    lowerTech.includes("shadcn") ||
    lowerTech.includes("material") ||
    lowerTech.includes("framer")
  ) {
    return "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700"
  }

  // Tools & Utilities (Amber)
  if (
    lowerTech.includes("turbopack") ||
    lowerTech.includes("pdf") ||
    lowerTech.includes("qr") ||
    lowerTech.includes("chart") ||
    lowerTech.includes("excel")
  ) {
    return "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700"
  }

  // Default (Gray)
  return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border transition-colors",
        getTechColor(tech),
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
