"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Facebook, FileText, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react"
import { AboutSection } from "@/components/about-section"
import { AnimatedProfile } from "@/components/animated-profile"
import { ChatBot } from "@/components/chat-bot"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { ProfileCard } from "@/components/profile-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { CONTACT } from "@/data/contact"
import { getCategoryLabel, getFilteredProjects, type Project } from "@/data/projects"

const projectFilters: Array<{ value: "all" | Project["category"]; label: string }> = [
  { value: "all", label: "All" },
  { value: "hybrid", label: "Hybrid" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "ai-ml", label: "AI" },
]

const techGroups = [
  { title: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Python", "Java", "Firebase", "Supabase", "REST APIs"] },
  { title: "AI & Tools", items: ["Gemini", "OpenAI", "MediaPipe", "PyTorch", "Jupyter", "GitHub"] },
]

const experienceItems = [
  {
    title: "Full-Stack Developer for Web, Mobile, and AI Projects",
    subtitle: "Freelance client projects across government, healthcare, education, and business",
    year: "2022-Present",
    active: true,
  },
  {
    title: "AI Integration Specialist",
    subtitle: "Gemini, OpenAI, and MediaPipe across production-style workflows",
    year: "2024-Present",
  },
  {
    title: "Multi-platform Developer",
    subtitle: "Flutter delivery across Android, iOS, Web, Windows, Linux, and macOS",
    year: "2022-2024",
  },
  { title: "BS Computer Science", subtitle: "Cor Jesu College", year: "Expected 2026" },
]

const profileActions = [
  {
    label: "Send Email",
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
    primary: true,
  },
  {
    label: "Resume",
    href: CONTACT.assets.resume,
    icon: FileText,
    primary: true,
  },
  {
    label: "GitHub",
    href: CONTACT.social.githubFull,
    icon: Github,
    primary: false,
  },
  {
    label: "LinkedIn",
    href: CONTACT.social.linkedinFull,
    icon: Linkedin,
    primary: false,
  },
  {
    label: "Facebook (Dev)",
    href: CONTACT.social.facebookDev,
    icon: MapPin,
    primary: false,
  },
  {
    label: "Facebook (Personal)",
    href: CONTACT.social.facebookPersonal,
    icon: MapPin,
    primary: false,
  },
  {
    label: "Instagram",
    href: CONTACT.social.instagramFull,
    icon: Instagram,
    primary: false,
  },
] as const

const headerActions = profileActions.filter(action =>
  action.label === "Send Email" || action.label === "GitHub" || action.label === "Facebook (Dev)"
)

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<(typeof projectFilters)[number]["value"]>("all")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllTech, setShowAllTech] = useState(false)

  const filteredProjects = getFilteredProjects(projectFilter)
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex justify-end mb-3">
          <ThemeToggle />
        </div>

        <section className="profile-row">
          <div className="relative h-[170px] w-[170px] overflow-hidden avatar-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedProfile />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="pinocchio-name text-4xl sm:text-[2.9rem] leading-none">{CONTACT.name.full}</h1>
              <div className="mt-3 flex items-center gap-2 text-[15px] text-[var(--text-secondary)]">
                <MapPin size={16} />
                {CONTACT.location.city}, {CONTACT.location.country}
              </div>
              <div className="mt-3 text-[1.05rem] text-[var(--text-primary)]">
                AI \ Software Developer \ Web & App Developer
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {headerActions.map(action => {
                const Icon = action.icon
                const className = action.primary ? "btn btn-primary justify-start" : "btn btn-secondary justify-start"
                const isExternal = !action.href.startsWith("mailto:")

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    <Icon size={16} />
                    {action.label === "Facebook (Dev)" ? "Facebook" : action.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="self-start">
            <div className="badge badge-accent">Web, Mobile, AI</div>
          </div>
        </section>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_392px]">
          <div className="flex h-full flex-col gap-8">
            <section className="section-card p-5 sm:p-6">
              <h2 className="section-title">About</h2>
              <AboutSection />
            </section>

            <section className="section-card flex min-h-[440px] flex-1 flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Tech Stack</h2>
                <button
                  type="button"
                  onClick={() => setShowAllTech(current => !current)}
                  className="btn btn-ghost !px-0 !py-0 !border-0"
                >
                  {showAllTech ? "Show Less" : "View All"}
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-6 flex-1 space-y-8">
                {techGroups.map(group => (
                  <div key={group.title}>
                    <h3 className="text-[1.1rem] font-semibold text-[var(--text-primary)]">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2.5 pl-3 sm:pl-4 text-[1rem] text-[var(--text-primary)]">
                      {(showAllTech ? group.items : group.items.slice(0, 5)).map(item => (
                        <span
                          key={item}
                          className="inline-flex min-h-10 items-center border border-[var(--border)] bg-[var(--surface-secondary)] px-3.5 py-2 leading-none"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="flex h-full flex-col gap-8">
            <section className="section-card p-5 sm:p-6">
              <ProfileCard />
              <div className="mt-4 bg-[var(--accent)] text-white px-4 py-3 text-sm font-semibold">
                Building plain, useful software with web, mobile, and AI.
              </div>
            </section>

            <section className="section-card p-5 sm:p-6">
              <h2 className="section-title">Experience</h2>
              <div className="mt-6 experience-list">
                {experienceItems.map(item => (
                  <div key={`${item.title}-${item.year}`} className="experience-item">
                    <div className="experience-marker-wrap">
                      <div
                        className={`experience-marker ${
                          item.active
                            ? "bg-black border-black dark:bg-white dark:border-white"
                            : "border-[var(--border)] bg-white dark:bg-[var(--surface-primary)]"
                        }`}
                      ></div>
                    </div>
                    <div className="experience-copy">
                      <div className="experience-row">
                        <div className="experience-title">{item.title}</div>
                        <div className="experience-year-chip">{item.year}</div>
                      </div>
                      <div className="experience-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="section-card mt-8 p-5 sm:p-6">
          <h2 className="section-title">GitHub</h2>
          <div className="mt-4">
            <GitHubCalendar />
          </div>
        </section>

        <section className="section-card mt-8 p-5 sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="section-title">Recent Projects</h2>
              <button
                type="button"
                onClick={() => setShowAllProjects(current => !current)}
                className="btn btn-ghost !px-0 !py-0 !border-0 shrink-0"
              >
                {showAllProjects ? "Show Less" : "View All"}
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {projectFilters.map(filter => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => {
                    setProjectFilter(filter.value)
                    setShowAllProjects(false)
                  }}
                  className={`filter-chip ${projectFilter === filter.value ? "filter-chip-active" : ""}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
                className="project-card p-5 sm:p-6"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  demoLink={project.demoUrl}
                  videoLink={project.videoUrl}
                  webDemoLink={project.webDemoUrl}
                  mobileDemoLink={project.mobileDemoUrl}
                  webVideoLink={project.webVideoUrl}
                  mobileVideoLink={project.mobileVideoUrl}
                  type={project.category}
                  categoryLabel={getCategoryLabel(project.category)}
                  platformSummary={project.platformSummary}
                  engagementType={project.engagementType}
                  sector={project.sector}
                  impactTags={project.impactTags}
                  techStack={project.techStack}
                  details={project.details}
                  screenshots={project.screenshots}
                  screenshotCategories={project.screenshotCategories}
                />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length > 4 && !showAllProjects && (
            <div className="mt-4 text-xs text-[var(--text-muted)]">
              Showing 4 of {filteredProjects.length} projects
            </div>
          )}
        </section>

        <section className="section-card mt-8 p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div>
              <h2 className="text-[1.35rem] font-semibold text-[var(--text-primary)]">Contact</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Reach me through the channels I actively use for work, collaborations, and project discussions.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Primary</h3>
              <div className="mt-3 space-y-2">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-medium text-[var(--text-primary)]">Email</span>
                    <span className="mt-1 block break-all text-xs text-[var(--text-secondary)]">{CONTACT.email}</span>
                  </span>
                </a>
                <a
                  href={CONTACT.assets.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText size={16} />
                    Resume
                  </span>
                  <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Social Links</h3>
              <div className="mt-3 space-y-2">
                <a
                  href={CONTACT.social.linkedinFull}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href={CONTACT.social.githubFull}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href={CONTACT.social.instagramFull}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Facebook</h3>
              <div className="mt-3 space-y-2">
                <a
                  href={CONTACT.social.facebookDev}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Facebook size={16} />
                    Dev Account
                  </span>
                  <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                </a>
                <a
                  href={CONTACT.social.facebookPersonal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Facebook size={16} />
                    Personal Account
                  </span>
                  <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChatBot />
    </div>
  )
}
