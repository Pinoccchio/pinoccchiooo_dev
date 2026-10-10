"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronRight,
  ArrowDown,
  Facebook,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react"
import { AboutSection } from "@/components/about-section"
import { AnimatedProfile } from "@/components/animated-profile"
import { ChatBot } from "@/components/chat-bot"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { TechLogo } from "@/components/tech-logo"
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
  { title: "Backend", items: ["Node.js", "NestJS", "Python", "Java", "REST APIs", "Webhooks"] },
  { title: "Database & Backend Services", items: ["PostgreSQL", "Supabase", "Firebase", "Firestore", "Neon", "Cloudflare D1"] },
  { title: "Mobile & App Development", items: ["Flutter", "React Native", "Expo", "Android", "iOS", "App Store Connect", "Google Play Console"] },
  { title: "AI & Machine Learning", items: ["OpenAI", "Gemini", "Claude", "MediaPipe", "PyTorch", "CNN Models", "Jupyter Notebook"] },
  { title: "Cloud, Hosting & Storage", items: ["Vercel", "Render", "Cloudflare Workers", "Cloudflare R2", "AWS RDS"] },
  { title: "Tools & Workflow", items: ["Git", "GitHub", "Vitest", "Docker", "Postman", "Figma", "Xcode", "Android Studio", "VS Code", "Cursor"] },
]

const experienceItems = [
  {
    title: "Independent Product Developer",
    subtitle: "Built and maintain NameAsOne, with public profiles, custom handles, contact actions, and profile editing",
    year: "2026-Present",
    active: true,
  },
  {
    title: "Full-Stack Software Developer Intern",
    subtitle: "JohnV MEDIA — sole full-stack developer for PicklePark and PesoJar during a supervised practicum",
    year: "Jul-Aug 2026",
  },
  {
    title: "Freelance Full-Stack Developer",
    subtitle: "Started client work during college, building web, mobile, backend, and AI integration features across business, healthcare, and education projects",
    year: "During college-Present",
  },
]

const heroActions = [
  {
    label: "View Projects",
    href: "#projects",
    icon: ArrowDown,
    primary: true,
  },
  {
    label: "Email Me",
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
    primary: false,
  },
  {
    label: "Resume",
    href: CONTACT.assets.resume,
    icon: FileText,
    primary: false,
  },
  {
    label: "nameasone",
    href: CONTACT.social.nameasoneFull,
    icon: Globe,
    primary: false,
  },
] as const

const socialLinks = [
  { label: "nameasone", href: CONTACT.social.nameasoneFull, icon: Globe },
  { label: "LinkedIn", href: CONTACT.social.linkedinFull, icon: Linkedin },
  { label: "Facebook", href: CONTACT.social.facebookDev, icon: Facebook },
  { label: "Instagram", href: CONTACT.social.instagramFull, icon: Instagram },
] as const

export default function Home() {
  const [projectFilter, setProjectFilter] = useState<(typeof projectFilters)[number]["value"]>("all")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllTech, setShowAllTech] = useState(false)

  const filteredProjects = getFilteredProjects(projectFilter)
  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="portfolio-shell">
        <div className="portfolio-topbar">
          <ThemeToggle />
        </div>

        <section className="portfolio-hero">
          <div className="portfolio-avatar">
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedProfile />
            </div>
          </div>

          <div className="portfolio-hero-main">
            <div className="portfolio-name-row">
              <h1 className="portfolio-name">{CONTACT.name.full}</h1>
            </div>

            <div className="portfolio-location">
              <MapPin size={15} />
              <span>{CONTACT.location.city}, {CONTACT.location.country}</span>
            </div>

            <p className="portfolio-role-line">Full-Stack Software Developer | AI-Powered Applications</p>
            <p className="portfolio-hero-summary">I turn complex workflows into practical apps, dashboards, and platforms people can use every day.</p>

            <div className="portfolio-action-row">
              {heroActions.map(action => {
                const Icon = action.icon
                const isExternal = action.href.startsWith("http") || action.href.startsWith("/")

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={action.primary ? "clean-btn clean-btn-primary" : "clean-btn"}
                  >
                    {action.label === "nameasone" ? (
                      <Image src="/nameasone-n-mark.svg" alt="" width={15} height={15} />
                    ) : (
                      <Icon size={15} />
                    )}
                    {action.label}
                  </a>
                )
              })}

            </div>
          </div>
        </section>

        <section id="projects" className="clean-section mt-4">
          <div className="clean-section-header">
            <h2 className="clean-section-title">Selected Work</h2>
            <button
              type="button"
              onClick={() => setShowAllProjects(current => !current)}
              className="clean-inline-button"
            >
              {showAllProjects ? "Show Less" : "View All"}
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
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

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="project-card p-5 sm:p-6"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  demoLink={project.demoUrl}
                  thumbnailSrc={project.thumbnail}
                  thumbnailLogo={project.thumbnailLogo}
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
        </section>
        <div className="portfolio-pair-grid mt-4">
          <section className="clean-section">
            <h2 className="clean-section-title">About</h2>
            <AboutSection />
          </section>

          <section className="clean-section">
            <h2 className="clean-section-title">Contact</h2>
            <div className="contact-stack">
              <a href={`mailto:${CONTACT.email}`} className="contact-link-row">
                <span className="inline-flex items-center gap-3">
                  <Mail size={15} />
                <span>Email</span>
              </span>
              <ChevronRight size={15} />
            </a>

            <a href={CONTACT.social.githubFull} target="_blank" rel="noopener noreferrer" className="contact-link-row">
              <span className="inline-flex items-center gap-3">
                <Github size={15} />
                <span>GitHub</span>
              </span>
              <ChevronRight size={15} />
            </a>

            {socialLinks.map(item => {
              const Icon = item.icon

              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link-row">
                  <span className="inline-flex items-center gap-3">
                    {item.label === "nameasone" ? (
                      <Image src="/nameasone-n-mark.svg" alt="" width={15} height={15} />
                    ) : (
                      <Icon size={15} />
                    )}
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight size={15} />
                </a>
              )
              })}
            </div>
          </section>
        </div>

        <section className="clean-section mt-4">
          <h2 className="clean-section-title">Experience</h2>
          <div className="mt-5 experience-list">
            {experienceItems.map(item => (
              <div key={`${item.title}-${item.year}`} className="experience-item">
                <div className="experience-marker-wrap">
                  <div
                    className={`experience-marker rounded-full ${
                      item.active
                        ? "bg-[var(--text-primary)] border-[var(--text-primary)]"
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

        <section className="clean-section mt-4">
          <h2 className="clean-section-title">Education</h2>
          <p className="mt-3 text-sm text-[var(--text-primary)]">{CONTACT.education.formatted}</p>
        </section>

        <section className="clean-section mt-4">
          <div className="clean-section-header">
            <h2 className="clean-section-title">Tech Stack</h2>
            <button
              type="button"
              onClick={() => setShowAllTech(current => !current)}
              className="clean-inline-button"
            >
              {showAllTech ? "Show Less" : "View All"}
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="tech-stack-groups">
            {techGroups.map(group => (
              <div key={group.title} className="tech-stack-group">
                <h3 className="tech-stack-title">{group.title}</h3>
                <div className="tech-stack-items">
                  {(showAllTech ? group.items : group.items.slice(0, 6)).map(item => (
                    <span key={item} className="tech-stack-item">
                      <TechLogo name={item} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="clean-section clean-section-github mt-4">
          <h2 className="clean-section-title">GitHub</h2>
          <div className="mt-4">
            <GitHubCalendar />
          </div>
        </section>

        <section className="clean-section portfolio-closing mt-4">
          <div>
            <h2 className="clean-section-title">Let&apos;s work together</h2>
            <p>Hiring for a developer or building a product? Tell me what you need and I’ll get back to you by email.</p>
          </div>
          <a href={`mailto:${CONTACT.email}`} className="clean-btn clean-btn-primary"><Mail size={15} /> Email Me</a>
        </section>
      </div>

      <ChatBot />
    </div>
  )
}
