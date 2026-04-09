"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Facebook, Github, Mail, MapPin } from "lucide-react"
import { AboutSection } from "@/components/about-section"
import { AnimatedProfile } from "@/components/animated-profile"
import { ChatBot } from "@/components/chat-bot"
import { GitHubCalendar } from "@/components/github-calendar"
import { ThemeToggle } from "@/components/theme-toggle"
import { getFilteredProjects, type Project } from "@/data/projects"

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
    title: "Full-Stack Developer & Hybrid System Architect",
    subtitle: "Freelance systems across government, healthcare, education, and business",
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

function getProjectMeta(project: Project) {
  if (project.demoUrl) {
    try {
      return new URL(project.demoUrl).hostname.replace(/^www\./, "")
    } catch {
      return project.platformSummary || project.category
    }
  }

  return project.platformSummary || project.sector || project.category
}

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<(typeof projectFilters)[number]["value"]>("all")

  const filteredProjects = getFilteredProjects(projectFilter)
  const featuredProjects = filteredProjects.slice(0, 4)

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
              <h1 className="pinocchio-name text-4xl sm:text-[2.9rem] leading-none">Pinoccchiooo</h1>
              <div className="mt-3 flex items-center gap-2 text-[15px] text-[var(--text-secondary)]">
                <MapPin size={16} />
                Digos City, Philippines
              </div>
              <div className="mt-3 text-[1.05rem] text-[var(--text-primary)]">
                AI \ Software Engineer \ Systems Builder
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:janmikoguevarra@gmail.com" className="btn btn-primary">
                <Mail size={16} />
                Send Email
              </a>
              <a href="https://github.com/Pinoccchio" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github size={16} />
                View GitHub
              </a>
              <a href="https://www.facebook.com/phoebe.finley.96" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Facebook size={16} />
                Facebook
              </a>
            </div>
          </div>

          <div className="self-start">
            <div className="badge badge-accent">Hybrid Systems / AI Workflows</div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_392px]">
          <div className="space-y-8">
            <section className="section-card p-5 sm:p-6">
              <h2 className="section-title">About</h2>
              <AboutSection />
            </section>

            <section className="section-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Tech Stack</h2>
                <button className="btn btn-ghost !px-0 !py-0 !border-0">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-6 space-y-7">
                {techGroups.map(group => (
                  <div key={group.title}>
                    <h3 className="text-[1.1rem] font-semibold text-[var(--text-primary)]">{group.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-2 pl-3 sm:pl-4 text-[1rem] text-[var(--text-primary)]">
                      {group.items.map(item => (
                        <span
                          key={item}
                          className="inline-flex items-center border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-1.5 leading-none"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Recent Projects</h2>
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {projectFilters.map(filter => (
                      <button
                        key={filter.value}
                        type="button"
                        onClick={() => setProjectFilter(filter.value)}
                        className={`filter-chip ${projectFilter === filter.value ? "filter-chip-active" : ""}`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <button className="btn btn-ghost !px-0 !py-0 !border-0 hidden sm:inline-flex">
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.demoUrl || project.videoUrl || "#"}
                    target={project.demoUrl || project.videoUrl ? "_blank" : undefined}
                    rel={project.demoUrl || project.videoUrl ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.28, delay: index * 0.04 }}
                    className="block border border-[var(--border)] p-4 hover:bg-[var(--surface-secondary)] transition-colors"
                  >
                    <div className="text-[1.05rem] font-semibold text-[var(--text-primary)]">{project.title}</div>
                    <p className="mt-2 text-[0.98rem] leading-7 text-[var(--text-primary)]">{project.description}</p>
                    <div className="mt-3 inline-block bg-[var(--surface-tertiary)] px-3 py-1 text-sm text-[var(--text-secondary)]">
                      {getProjectMeta(project)}
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="section-card p-5 sm:p-6">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#3b3b3b] to-[#181818] text-white p-6 flex flex-col justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/60">Access Card</div>
                  <div className="mt-6 text-3xl font-bold">PINOCCHIOOO</div>
                  <div className="mt-2 text-sm text-white/65">Systems Developer</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/50">Focus</div>
                  <div className="text-sm">Government, healthcare, and business platforms</div>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Philippines</div>
              </div>
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

            <section className="section-card p-5 sm:p-6">
              <h2 className="section-title">GitHub</h2>
              <div className="mt-4">
                <GitHubCalendar />
              </div>
            </section>
          </div>
        </div>
      </div>

      <ChatBot />
    </div>
  )
}
