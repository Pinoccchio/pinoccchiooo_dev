import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PortfolioHome from "@/components/portfolio-home"
import { getProjectById, projects } from "@/data/projects"

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
  return <PortfolioHome initialProjectId={project.id} />
}
