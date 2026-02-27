"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Github, Mail, Facebook, Instagram, Youtube, MapPin } from "lucide-react"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { SocialIcon } from "@/components/social-icon"
import { TechStack } from "@/components/tech-stack"
import { AboutSection } from "@/components/about-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatBot } from "@/components/chat-bot"
import { AnimatedProfile } from "@/components/animated-profile"
import { PortfolioStats } from "@/components/portfolio-stats"
import { AdminLoginDialog } from "@/components/admin-login-dialog"
import { getProjectsByCategory } from "@/data/projects"
import { getCurrentAdmin } from "@/app/actions/admin-auth-actions"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "about" | null>("projects")
  const [projectCategory, setProjectCategory] = useState<"hybrid" | "web" | "mobile" | "ai-ml">("hybrid")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Check if user is already authenticated and redirect to admin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const admin = await getCurrentAdmin()
        if (admin) {
          router.push("/admin")
        }
      } catch (error) {
        // User not authenticated, stay on landing page
        console.log("Not authenticated")
      }
    }
    checkAuth()
  }, [router])

  // Get projects for each category
  const hybridProjects = getProjectsByCategory("hybrid")
  const webProjects = getProjectsByCategory("web")
  const mobileProjects = getProjectsByCategory("mobile")
  const aiMlProjects = getProjectsByCategory("ai-ml")

  // Memoize the category change handler to prevent unnecessary re-renders
  const handleCategoryChange = useCallback(
    (category: "hybrid" | "web" | "mobile" | "ai-ml") => {
      if (category !== projectCategory) {
        setProjectCategory(category)
        setShowAllProjects(false) // Reset show all when changing categories
      }
    },
    [projectCategory],
  )

  // Secret admin access trigger - 7 rapid clicks on avatar
  const handleAvatarClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    // Clear existing timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
    }

    // If 7 clicks reached, show admin login
    if (newCount >= 7) {
      setShowAdminLogin(true)
      setClickCount(0)
      return
    }

    // Reset count after 2 seconds of inactivity
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main content container with improved responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Avatar and Profile Section - Full width on mobile, sidebar on desktop */}
          <div className="w-full lg:w-80 xl:w-96 flex flex-col items-center">
            <div
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              onClick={handleAvatarClick}
              title="Click me multiple times..."
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedProfile />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 avatar-border rounded-full ${
                  clickCount > 0 && clickCount < 7 ? "animate-pulse" : ""
                }`}></div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mt-4 pinocchio-name text-center">Pinoccchiooo</h1>
            <div className="flex items-center mt-2 text-blue-500 dark:text-blue-400">
              <MapPin size={18} className="mr-2" />
              <span>Digos City, Philippines</span>
            </div>

            <p className="mt-4 text-center max-w-md pinocchio-tagline px-4 sm:px-0">
              A <span className="pinocchio-accent hover:underline font-medium">Flutter & Next.js Developer</span>{" "}
              creating applications for Android, web, and Windows with AI integration when needed.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 mb-6">
              <SocialIcon
                icon={<Mail size={20} />}
                href="mailto:janmikoguevarra@gmail.com"
                bgColor="bg-red-500 dark:bg-red-600"
              />
              <SocialIcon
                icon={<Facebook size={20} />}
                href="https://www.facebook.com/phoebe.finley.96"
                bgColor="bg-blue-600 dark:bg-blue-700"
              />
              <SocialIcon
                icon={<Github size={20} />}
                href="https://github.com/Pinoccchio"
                bgColor="bg-gray-800 dark:bg-gray-700"
              />
              <SocialIcon
                icon={<Instagram size={20} />}
                href="https://www.instagram.com/jexlevii/"
                bgColor="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600"
              />
              <SocialIcon
                icon={<Youtube size={20} />}
                href="https://www.youtube.com/@pinocchio200"
                bgColor="bg-red-600 dark:bg-red-700"
              />
            </div>

            {/* Tech Stack - Responsive layout */}
            <div className="mt-2 mb-6 w-full">
              <h3 className="text-lg font-medium pinocchio-accent mb-4 text-center">Tech stack used:</h3>
              <TechStack />
            </div>
          </div>

          {/* Main Content - Full width on mobile, flex-1 on desktop */}
          <div className="flex-1 w-full">
            {/* Navigation - Improved responsive layout */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="hidden sm:block"></div> {/* Empty div for flex spacing on larger screens */}
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <nav className="flex gap-2 sm:gap-4 items-center">
                  <button
                    onClick={() => setActiveSection("projects")}
                    className={`px-4 sm:px-8 py-2 rounded-md font-medium transition-colors nav-button text-sm sm:text-base ${
                      activeSection === "projects"
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveSection("about")}
                    className={`px-4 sm:px-8 py-2 rounded-md font-medium transition-colors nav-button text-sm sm:text-base ${
                      activeSection === "about"
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                    }`}
                  >
                    About
                  </button>
                </nav>
                <ThemeToggle />
              </div>
            </div>

            {/* Content Sections */}
            <div className="w-full">
              {/* Projects Section - Responsive grid */}
              {activeSection === "projects" && (
                <div className="transition-all duration-300 ease-in-out">
                  {/* Portfolio Statistics */}
                  <PortfolioStats />

                  {/* Project Category Selector - 4 Categories */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-0 sm:rounded-md sm:shadow-sm" role="group">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("hybrid")}
                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium sm:rounded-l-lg rounded-lg sm:rounded-none transition-colors duration-200 ${
                          projectCategory === "hybrid"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        Hybrid Systems
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("web")}
                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg sm:rounded-none transition-colors duration-200 ${
                          projectCategory === "web"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        Web Apps
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("mobile")}
                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg sm:rounded-none transition-colors duration-200 ${
                          projectCategory === "mobile"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        Mobile Apps
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("ai-ml")}
                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium sm:rounded-r-lg rounded-lg sm:rounded-none transition-colors duration-200 ${
                          projectCategory === "ai-ml"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        AI & ML
                      </button>
                    </div>
                  </div>

                  {/* Web Projects - Dynamic Rendering */}
                  {projectCategory === "web" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {webProjects.slice(0, showAllProjects ? webProjects.length : 8).map((project) => (
                          <div key={project.id} className="project-card rounded-lg shadow-sm p-4 sm:p-6">
                            <ProjectCard
                              title={project.title}
                              description={project.description}
                              icon={project.icon}
                              githubLink={project.githubUrl}
                              demoLink={project.demoUrl}
                              videoLink={project.videoUrl}
                              type={project.category}
                              techStack={project.techStack}
                              status={project.status}
                              date={project.date}
                              isPrivate={project.isPrivate}
                              details={project.details}
                              screenshots={project.screenshots}
                              screenshotCategories={project.screenshotCategories}
                            />
                          </div>
                        ))}
                      </div>
                      {webProjects.length > 8 && (
                        <div className="flex justify-center mb-6">
                          <button
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium"
                          >
                            {showAllProjects ? `Show Less` : `Show All ${webProjects.length} Web Projects`}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Mobile Projects - Dynamic Rendering */}
                  {projectCategory === "mobile" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {mobileProjects.slice(0, showAllProjects ? mobileProjects.length : 10).map((project) => (
                          <div key={project.id} className="project-card rounded-lg shadow-sm p-4 sm:p-6">
                            <ProjectCard
                              title={project.title}
                              description={project.description}
                              icon={project.icon}
                              githubLink={project.githubUrl}
                              demoLink={project.demoUrl}
                              videoLink={project.videoUrl}
                              type={project.category}
                              techStack={project.techStack}
                              status={project.status}
                              date={project.date}
                              isPrivate={project.isPrivate}
                              details={project.details}
                              screenshots={project.screenshots}
                              screenshotCategories={project.screenshotCategories}
                            />
                          </div>
                        ))}
                      </div>
                      {mobileProjects.length > 10 && (
                        <div className="flex justify-center mb-6">
                          <button
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium"
                          >
                            {showAllProjects ? `Show Less` : `Show All ${mobileProjects.length} Mobile Apps`}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Hybrid Projects - 4 Major Systems */}
                  {projectCategory === "hybrid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      {hybridProjects.map((project) => (
                        <div key={project.id} className="project-card rounded-lg shadow-sm p-4 sm:p-6">
                          <ProjectCard
                            title={project.title}
                            description={project.description}
                            icon={project.icon}
                            githubLink={project.githubUrl}
                            demoLink={project.demoUrl}
                            videoLink={project.videoUrl}
                            webGithubLink={project.webGithubUrl}
                            mobileGithubLink={project.mobileGithubUrl}
                            webDemoLink={project.webDemoUrl}
                            mobileDemoLink={project.mobileDemoUrl}
                            webVideoLink={project.webVideoUrl}
                            mobileVideoLink={project.mobileVideoUrl}
                            type={project.category}
                            techStack={project.techStack}
                            status={project.status}
                            date={project.date}
                            isPrivate={project.isPrivate}
                            details={project.details}
                            screenshots={project.screenshots}
                            screenshotCategories={project.screenshotCategories}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI & ML Projects */}
                  {projectCategory === "ai-ml" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {aiMlProjects.slice(0, showAllProjects ? aiMlProjects.length : 8).map((project) => (
                          <div key={project.id} className="project-card rounded-lg shadow-sm p-4 sm:p-6">
                            <ProjectCard
                              title={project.title}
                              description={project.description}
                              icon={project.icon}
                              githubLink={project.githubUrl}
                              demoLink={project.demoUrl}
                              videoLink={project.videoUrl}
                              type={project.category}
                              techStack={project.techStack}
                              status={project.status}
                              date={project.date}
                              isPrivate={project.isPrivate}
                              details={project.details}
                              screenshots={project.screenshots}
                              screenshotCategories={project.screenshotCategories}
                            />
                          </div>
                        ))}
                      </div>
                      {aiMlProjects.length > 8 && (
                        <div className="flex justify-center mb-6">
                          <button
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium"
                          >
                            {showAllProjects ? `Show Less` : `Show All ${aiMlProjects.length} AI & ML Projects`}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                </div>
              )}

              {/* About Section - Responsive padding */}
              {activeSection === "about" && (
                <div className="transition-all duration-300 ease-in-out mb-6 sm:mb-8">
                  <div className="bg-card-background border border-card-border p-4 sm:p-6 rounded-lg shadow-sm">
                    <AboutSection />
                  </div>
                </div>
              )}

              {/* GitHub Contributions - Always Visible with responsive padding */}
              <div className="bg-card-background border border-card-border p-4 sm:p-6 rounded-lg shadow-sm mb-6 sm:mb-8">
                <h2 className="text-xl font-semibold mb-4 pinocchio-accent">My GitHub Contributions</h2>
                <GitHubCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
      <AdminLoginDialog isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </div>
  )
}
