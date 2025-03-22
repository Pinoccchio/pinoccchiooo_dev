"use client"

import Image from "next/image"
import { useState } from "react"
import { Github, Mail, Facebook, Instagram, Youtube, MapPin } from "lucide-react"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { SocialIcon } from "@/components/social-icon"
import { TechStack } from "@/components/tech-stack"
import { AboutSection } from "@/components/about-section"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "about" | null>("projects")

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main content container with improved responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Avatar and Profile Section - Full width on mobile, sidebar on desktop */}
          <div className="w-full lg:w-80 xl:w-96 flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 relative overflow-hidden rounded-full">
                  <Image
                    src="/pinocchio-avatar.png"
                    alt="Pinoccchiooo Avatar"
                    width={240}
                    height={240}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 avatar-border rounded-full"></div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                      <ProjectCard
                        title="Puppet Workshop"
                        description="Create your own customizable puppet"
                        icon="🪵"
                      />
                    </div>

                    <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                      <ProjectCard
                        title="Truth Detector"
                        description="Measure how much your nose grows when you lie!"
                        icon="👃"
                      />
                    </div>

                    <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                      <ProjectCard
                        title="Wish Generator"
                        description="Generate and track your wishes upon a star"
                        icon="⭐"
                      />
                    </div>

                    <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                      <ProjectCard title="Conscience Keeper" description="Let Jiminy Cricket be your guide" icon="🦗" />
                    </div>
                  </div>
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
    </div>
  )
}

