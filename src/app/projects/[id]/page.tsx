import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ProjectCard } from "@/components/project-card"
import { getCategoryLabel, getProjectById, projects } from "@/data/projects"

type Props = { params: Promise<{ id: string }> }
const origin = "https://pinoccchiooo-dev.vercel.app"

export function generateStaticParams() {
  return projects.map(project => ({ id: project.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById((await params).id)
  if (!project) return { title: "Project not found" }
  const image = project.thumbnail ?? project.screenshotCategories?.[0]?.screenshots[0] ?? project.screenshots?.[0]
  return {
    title: { absolute: `${project.title} | Jan Miko A. Guevarra` },
    description: project.description,
    alternates: { canonical: `${origin}/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${origin}/projects/${project.id}`,
      images: image ? [{ url: `${origin}${encodeURI(image)}`, alt: `${project.title} application preview` }] : [],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.description, images: image ? [`${origin}${encodeURI(image)}`] : [] },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectById((await params).id)
  if (!project) notFound()
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/#projects" className="mb-6 inline-block text-sm text-[var(--text-secondary)] hover:underline">← All portfolio projects</Link>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">{project.title}</h1>
      <p className="mb-6 text-sm text-[var(--text-secondary)]">Project by Jan Miko A. Guevarra</p>
      <article className="project-card p-5 sm:p-6">
        <ProjectCard
          openGalleryOnLoad
          title={project.title} description={project.description} demoLink={project.demoUrl}
          thumbnailSrc={project.thumbnail} thumbnailLogo={project.thumbnailLogo} videoLink={project.videoUrl}
          webDemoLink={project.webDemoUrl} mobileDemoLink={project.mobileDemoUrl}
          webVideoLink={project.webVideoUrl} mobileVideoLink={project.mobileVideoUrl}
          type={project.category} categoryLabel={getCategoryLabel(project.category)}
          platformSummary={project.platformSummary} engagementType={project.engagementType}
          techStack={project.techStack} details={project.details}
          screenshots={project.screenshots} screenshotCategories={project.screenshotCategories}
        />
      </article>
    </main>
  )
}
