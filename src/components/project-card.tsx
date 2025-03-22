interface ProjectCardProps {
  title: string
  description: string
  icon: string
}

export function ProjectCard({ title, description, icon }: ProjectCardProps) {
  return (
    <div className="flex items-start">
      <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold pinocchio-primary">{title}</h3>
        <p className="pinocchio-text mt-1 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  )
}

