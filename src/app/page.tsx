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

// CSS styles in a separate style block or file
const styles = `
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a; /* Darker text for better contrast */
  --card-background: #ffffff;
  --card-border: #e5e7eb;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --muted: #f3f4f6;
  --muted-foreground: #334155; /* Darker for better contrast */
  
  /* New color variables for your Pinocchio branding */
  --pinocchio-primary: #1e40af; /* Darker blue for main branding */
  --pinocchio-accent: #3b82f6; /* Bright blue for accents */
  --pinocchio-text: #1e293b; /* Dark slate for regular text */
}

.dark {
  --background: #0a0a0a;
  --foreground: #f8fafc; /* Brighter white text for dark mode */
  --card-background: #1a1a1a;
  --card-border: #2d2d2d;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --muted: #1f2937;
  --muted-foreground: #cbd5e1; /* Lighter for better contrast in dark mode */
  
  /* Dark mode Pinocchio branding */
  --pinocchio-primary: #60a5fa; /* Brighter blue for dark mode */
  --pinocchio-accent: #93c5fd; /* Even brighter blue accent */
  --pinocchio-text: #f1f5f9; /* Light text for dark mode */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--pinocchio-text);
  font-family: Arial, Helvetica, sans-serif;
}

.pinocchio-name {
  color: var(--pinocchio-primary);
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.pinocchio-tagline {
  color: var(--pinocchio-text);
  font-weight: 500;
}

.pinocchio-accent {
  color: var(--pinocchio-accent);
}

.avatar-border {
  border: 4px solid var(--pinocchio-primary);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

.nav-button {
  transition: all 0.2s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
}

.project-card {
  border: 1px solid var(--card-border);
  background-color: var(--card-background);
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--pinocchio-accent);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.2);
}
`

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "about" | null>("projects")

  return (
    <>
      {/* Include the styles */}
      <style jsx global>
        {styles}
      </style>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            {/* Avatar and Navigation */}
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-60 h-60 relative overflow-hidden rounded-full">
                    <Image
                      src="/pinocchio-avatar.png"
                      alt="Jan Miko Avatar"
                      width={240}
                      height={240}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 avatar-border rounded-full"></div>
                </div>
              </div>

              <h1 className="text-4xl font-bold mt-4 pinocchio-name">Jan Miko</h1>
              <div className="flex items-center mt-2 text-blue-500 dark:text-blue-400">
                <MapPin size={18} className="mr-2" />
                <span>Digos City, Philippines</span>
              </div>

              <p className="mt-4 text-center max-w-md pinocchio-tagline">
                A <span className="pinocchio-accent hover:underline font-medium">Flutter & Next.js Developer</span>{" "}
                creating applications for Android, web, and Windows with AI integration when needed.
              </p>

              <div className="flex gap-4 mt-6 mb-6">
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

              {/* Tech Stack - Moved here from bottom of page */}
              <div className="mt-2 mb-6">
                <h3 className="text-lg font-medium pinocchio-accent mb-4 text-center">Tech stack used:</h3>
                <TechStack />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Navigation */}
              <div className="flex justify-between items-center mb-8">
                <div></div> {/* Empty div for flex spacing */}
                <div className="flex items-center gap-4">
                  <nav className="flex gap-4 items-center">
                    <button
                      onClick={() => setActiveSection("projects")}
                      className={`px-8 py-2 rounded-md font-medium transition-colors nav-button ${
                        activeSection === "projects"
                          ? "bg-blue-500 dark:bg-blue-600 text-white"
                          : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                      }`}
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => setActiveSection("about")}
                      className={`px-8 py-2 rounded-md font-medium transition-colors nav-button ${
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
              <div className="mb-8">
                {/* Projects Section */}
                {activeSection === "projects" && (
                  <div className="transition-all duration-300 ease-in-out">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-6">
                        <ProjectCard
                          title="Puppet Workshop"
                          description="Create your own customizable puppet"
                          icon="🪵"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-6">
                        <ProjectCard
                          title="Truth Detector"
                          description="Measure how much your nose grows when you lie!"
                          icon="👃"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-6">
                        <ProjectCard
                          title="Wish Generator"
                          description="Generate and track your wishes upon a star"
                          icon="⭐"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-6">
                        <ProjectCard
                          title="Conscience Keeper"
                          description="Let Jiminy Cricket be your guide"
                          icon="🦗"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section */}
                {activeSection === "about" && (
                  <div className="transition-all duration-300 ease-in-out mb-8">
                    <div className="bg-card-background border border-card-border p-6 rounded-lg shadow-sm">
                      <AboutSection />
                    </div>
                  </div>
                )}
              </div>

              {/* GitHub Contributions - Always Visible */}
              <div className="bg-card-background border border-card-border p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4 pinocchio-accent">My GitHub Contributions</h2>
                <GitHubCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

