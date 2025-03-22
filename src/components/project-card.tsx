interface ProjectCardProps {
  title: string
  description: string
  icon: string
}

export function ProjectCard({ title, description, icon }: ProjectCardProps) {
  return (
    <div className="flex items-start">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold pinocchio-primary">{title}</h3>
        <p className="pinocchio-text mt-1">{description}</p>
      </div>
    </div>
  )
}

