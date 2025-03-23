interface ProjectCardProps {
  title: string
  description: string
  icon: string
  link?: string
}

export function ProjectCard({ title, description, icon, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start group transition-all duration-300 hover:opacity-90"
    >
      <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold pinocchio-primary group-hover:underline">{title}</h3>
        <p className="pinocchio-text mt-1 text-sm sm:text-base">{description}</p>
      </div>
    </a>
  )
}

