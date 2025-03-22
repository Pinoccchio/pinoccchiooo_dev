"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Github,
  Upload,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  DiscIcon as Discord,
  InstagramIcon as Tiktok,
  MapPin,
} from "lucide-react"
import { GitHubCalendar } from "@/components/github-calendar"
import { ProjectCard } from "@/components/project-card"
import { SocialIcon } from "@/components/social-icon"
import { TechStack } from "@/components/tech-stack"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "about" | null>("projects")

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Avatar and Navigation */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-60 h-60 relative overflow-hidden">
                  <Image
                    src="/pinocchio-avatar.png"
                    alt="Pinocchio Avatar"
                    width={240}
                    height={240}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-blue-300 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-4xl font-bold mt-4 text-blue-900">Pinocchio Dev</h1>
            <div className="flex items-center mt-2 text-blue-700">
              <MapPin size={18} className="mr-2" />
              <span>Wonderland</span>
            </div>

            <p className="mt-4 text-center max-w-md text-blue-800">
              A programmer <span className="text-blue-500 hover:underline">crafting digital wonders</span> and sharing
              tech tips, tricks, and high-quality resources!
            </p>

            <div className="flex gap-4 mt-6">
              <SocialIcon icon={<Mail size={20} />} href="#" bgColor="bg-red-400" />
              <SocialIcon icon={<Facebook size={20} />} href="#" bgColor="bg-blue-600" />
              <SocialIcon icon={<Github size={20} />} href="#" bgColor="bg-gray-800" />
              <SocialIcon icon={<Instagram size={20} />} href="#" bgColor="bg-pink-500" />
              <SocialIcon icon={<Youtube size={20} />} href="#" bgColor="bg-red-600" />
              <SocialIcon icon={<Discord size={20} />} href="#" bgColor="bg-indigo-500" />
              <SocialIcon icon={<Tiktok size={20} />} href="#" bgColor="bg-black" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Github className="text-gray-700" />
                <span className="text-gray-700">123</span>
                <div className="bg-blue-400 p-2 rounded-md">
                  <Upload className="text-white" size={20} />
                </div>
              </div>

              <nav className="flex gap-4 items-center">
                <button
                  onClick={() => setActiveSection("projects")}
                  className={`px-8 py-2 rounded-md font-medium transition-colors ${
                    activeSection === "projects"
                      ? "bg-blue-400 text-white"
                      : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveSection("about")}
                  className={`px-8 py-2 rounded-md font-medium transition-colors ${
                    activeSection === "about" ? "bg-blue-400 text-white" : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                  }`}
                >
                  About
                </button>
              </nav>
            </div>

            {/* Content Sections */}
            <div className="mb-8">
              {/* Projects Section */}
              {activeSection === "projects" && (
                <div className="transition-all duration-300 ease-in-out">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <ProjectCard title="Puppet Workshop" description="Create your own customizable puppet" icon="🪵" />

                    <ProjectCard
                      title="Truth Detector"
                      description="Measure how much your nose grows when you lie!"
                      icon="👃"
                    />

                    <ProjectCard
                      title="Wish Generator"
                      description="Generate and track your wishes upon a star"
                      icon="⭐"
                    />

                    <ProjectCard title="Conscience Keeper" description="Let Jiminy Cricket be your guide" icon="🦗" />
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeSection === "about" && (
                <div className="transition-all duration-300 ease-in-out mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">About Me</h2>
                    <AboutSection />
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Contributions - Always Visible */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">My GitHub Contributions</h2>
              <GitHubCalendar />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Tech stack used:</h3>
          <TechStack />
        </div>
      </div>
    </div>
  )
}

