"use client"

import { useState, useCallback } from "react"
import { Github, Mail, Facebook, Instagram, Youtube, MapPin } from "lucide-react"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { SocialIcon } from "@/components/social-icon"
import { TechStack } from "@/components/tech-stack"
import { AboutSection } from "@/components/about-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatBot } from "@/components/chat-bot"
import { AnimatedProfile } from "@/components/animated-profile"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "about" | null>("projects")
  const [projectCategory, setProjectCategory] = useState<"web" | "app" | "hybrid">("web")

  // Memoize the category change handler to prevent unnecessary re-renders
  const handleCategoryChange = useCallback(
    (category: "web" | "app" | "hybrid") => {
      if (category !== projectCategory) {
        setProjectCategory(category)
      }
    },
    [projectCategory],
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main content container with improved responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Avatar and Profile Section - Full width on mobile, sidebar on desktop */}
          <div className="w-full lg:w-80 xl:w-96 flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedProfile />
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
                  {/* Project Category Selector */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("web")}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 ${
                          projectCategory === "web"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        Web Projects
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("app")}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                          projectCategory === "app"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        App Projects
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange("hybrid")}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 ${
                          projectCategory === "hybrid"
                            ? "bg-blue-500 dark:bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700"
                        }`}
                      >
                        Web & App
                      </button>
                    </div>
                  </div>

                  {/* Web Projects */}
                  {projectCategory === "web" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="A'ezzy Grammar Correction"
                          description="An intelligent online bot for grammar correction and text improvement"
                          icon="📝"
                          demoLink="https://aezzy-grammar-corrector.vercel.app/"
                          demoText="Visit Website"
                          type="web"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="E-Reserve System"
                          description="Venue reservation platform for the Local Government of Libmanan"
                          icon="🏢"
                          demoLink="https://e-reserve-web-based-system-v1.vercel.app/"
                          demoText="Visit Website"
                          type="web"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="MHealth Web App"
                          description="Healthcare management application with patient tracking features"
                          icon="🏥"
                          demoLink="https://mhealth-web-app-nine.vercel.app/"
                          demoText="Visit Website"
                          type="web"
                        />
                      </div>

                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="Procurement Management System"
                          description="Comprehensive solution for managing procurement processes"
                          icon="📊"
                          demoLink="https://www.procurement-ms.com/"
                          demoText="Visit Website"
                          type="web"
                        />
                      </div>
                    </div>
                  )}

                  {/* App Projects - Reordered as requested */}
                  {projectCategory === "app" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      {/* SnakeBuddy */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="SnakeBuddy"
                          description="An AI-powered mobile tool for identifying snakes from photos using Google's Gemini 1.5 Pro for detailed analysis."
                          icon="🐍"
                          videoLink="https://drive.google.com/file/d/1RF9ZJQC7ewUPSobTj41g_OIASBd27lzI/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* Better Bites */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="Better Bites"
                          description="An AI android application designed to help users make informed dietary choices by analyzing food product ingredients."
                          icon="🍎"
                          videoLink="https://drive.google.com/file/d/125EuRkh_k2smk1mhN1Or74CMc875aTwR/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 1. Scan My Soil */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="Scan My Soil"
                          description="AI-powered application using Gemini for soil analysis, providing agricultural recommendations and insights based on soil composition"
                          icon="🌱"
                          githubLink="https://github.com/Pinoccchio/scan_my_soil"
                          videoLink="https://drive.google.com/file/d/1k9x9oGSP-PO0DNTonA7s-wmJOaeAhdu9/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 2. EnviroSpeak */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="EnviroSpeak"
                          description="AI-powered application using Gemini that processes voice input to describe surroundings, eliminating the need for typing with voice-to-text and text-to-voice capabilities"
                          icon="🌍"
                          githubLink="https://github.com/Pinoccchio"
                          videoLink="https://drive.google.com/file/d/1k-uS8cehsSWc2Gq22VUX_2AcUE-QxsmT/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 3. TalkToHand */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="TalkToHand"
                          description="Machine learning application powered by MediaPipe that translates sign language gestures into readable text, bridging communication gaps for the hearing impaired"
                          icon="👋"
                          videoLink="https://drive.google.com/file/d/1jvLiSPp5QttF01L2UbvV-qE1o254Jc9n/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 4. Econaga */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="Econaga"
                          description="Waste management application allowing users to submit garbage collection or burial requests with location tracking, enabling drivers to efficiently collect and transport waste"
                          icon="♻️"
                          githubLink="https://github.com/Pinoccchio/econaga"
                          videoLink="https://drive.google.com/file/d/1jvdjkWWiDaeVf8jWFT36e7i2ZfIUfS2C/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* QR Code Based Attendance System */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="QR Code Based Attendance System"
                          description="Android application for tracking attendance using QR code scanning"
                          icon="📱"
                          videoLink="https://drive.google.com/file/d/1aPWLWykOcmT3baCXQsODnHdzD9BBmy8D/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 5. SienaTalk */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="SienaTalk V1"
                          description="Platform for students to book counselor appointments, exchange messages, send voice recordings, with comprehensive admin oversight of student-counselor interactions"
                          icon="💬"
                          githubLink="https://github.com/Pinoccchio/SienaTalkV1"
                          videoLink="https://drive.google.com/file/d/1k79De75llIF5ULTn8tP2_ae9MHIXACnP/view?usp=sharing"
                          type="app"
                        />
                      </div>

                      {/* 6. Eatease */}
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="Eatease"
                          description="Streamlined food delivery application with a simplified interface, allowing users to browse restaurants and order meals"
                          icon="🍔"
                          githubLink="https://github.com/Pinoccchio/eatease_app_web"
                          videoLink="https://drive.google.com/file/d/1k-IPOKgWFu4_3lmtRL3_POEPyifrwL0e/view?usp=sharing"
                          type="app"
                        />
                      </div>


                    </div>
                  )}

                  {/* Hybrid Projects */}
                  {projectCategory === "hybrid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="project-card rounded-lg overflow-hidden shadow-sm p-4 sm:p-6">
                        <ProjectCard
                          title="LawBot"
                          description="An AI legal assistant platform. The Android app features AI chat, legal resources, chat history, notifications, and user profiles, while the web admin panel includes a dashboard, analytics, user management, case reviews, and support."
                          icon="⚖️"
                          videoLink="https://drive.google.com/file/d/1RI2vOHHE83skJAbINl0fJ0z9cTaPDRr7/view?usp=sharing"
                          videoLinkText="Watch App Demo"
                          demoLink="https://drive.google.com/file/d/1Qy48z_Ve36DWUHewRYai2nDU8IiCrrr0/view?usp=sharing"
                          demoText="Watch Web Demo"
                          type="hybrid"
                        />
                      </div>
                    </div>
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
    </div>
  )
}
