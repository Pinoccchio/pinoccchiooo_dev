"use client"

import { Github, ExternalLink, Play, Lock } from "lucide-react"
import { TechBadgeList } from "./tech-badge"
import { type Project } from "@/data/projects"

interface ProjectCardProps {
  title: string
  description: string
  icon: string
  githubLink?: string
  demoLink?: string
  demoText?: string
  videoLink?: string
  videoLinkText?: string
  // Hybrid system-specific links
  webGithubLink?: string
  mobileGithubLink?: string
  webDemoLink?: string
  mobileDemoLink?: string
  webVideoLink?: string
  mobileVideoLink?: string
  type?: "hybrid" | "web" | "mobile" | "ai-ml" | "educational" | "tools"
  techStack?: string[]
  status?: Project["status"]
  date?: string
  isPrivate?: boolean
  details?: string
}

export function ProjectCard({
  title,
  description,
  icon,
  githubLink,
  demoLink,
  demoText = "Live Demo",
  videoLink,
  videoLinkText = "Watch Demo",
  webGithubLink,
  mobileGithubLink,
  webDemoLink,
  mobileDemoLink,
  webVideoLink,
  mobileVideoLink,
  techStack,
  status,
  date,
  isPrivate,
  details,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type = "web",
}: ProjectCardProps) {
  // Format Google Drive link for optimal viewing
  const formatGoogleDriveLink = (url: string) => {
    if (!url) return ""

    // Check if it's a Google Drive link
    if (url.includes("drive.google.com")) {
      // Extract the file ID from different Google Drive URL formats
      let fileId = ""

      // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      if (url.includes("/file/d/")) {
        fileId = url.split("/file/d/")[1].split("/")[0]
      }
      // Format 2: https://drive.google.com/open?id=FILE_ID
      else if (url.includes("open?id=")) {
        fileId = url.split("open?id=")[1].split("&")[0]
      }
      // Format 3: https://drive.google.com/drive/folders/FILE_ID
      else if (url.includes("/folders/")) {
        fileId = url.split("/folders/")[1].split("?")[0]
      }

      // If we found a file ID, create a preview link
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }

    // If not a Google Drive link or couldn't parse it, return the original URL
    return url
  }

  // Open video in a new tab with proper formatting
  const openVideoInNewTab = (url: string) => {
    const formattedUrl = formatGoogleDriveLink(url)
    window.open(formattedUrl, "_blank", "noopener,noreferrer")
  }

  // Get GitHub button label based on project type
  const getGithubButtonLabel = () => {
    switch (type) {
      case "web":
        return "Web Code"
      case "mobile":
        return "Mobile Code"
      case "tools":
        return "Code"
      case "ai-ml":
        return "Code"
      case "educational":
        return "Code"
      default:
        return "Code"
    }
  }

  // Get status badge color
  const getStatusColor = (status?: Project["status"]) => {
    switch (status) {
      case "Production":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700"
      case "Active Development":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700"
      case "Completed":
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start">
        <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</div>
        <div className="flex-1">
          {/* Title with badges */}
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <h3 className="text-base sm:text-lg font-semibold pinocchio-primary">{title}</h3>
            {isPrivate && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                <Lock size={10} className="mr-1" />
                Private
              </span>
            )}
          </div>

          {/* Status and Date */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {status && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {status}
              </span>
            )}
            {date && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {date}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="pinocchio-text mt-1 text-sm sm:text-base">{description}</p>

          {/* Details */}
          {details && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">
              {details}
            </p>
          )}

          {/* Tech Stack Badges */}
          {techStack && techStack.length > 0 && (
            <div className="mt-3">
              <TechBadgeList technologies={techStack} maxDisplay={5} />
            </div>
          )}

          {/* Links */}
          <div className="flex mt-3 gap-2 flex-wrap">
            {/* Hybrid System Links - Show labeled web/mobile links */}
            {(webGithubLink || mobileGithubLink) ? (
              <>
                {webGithubLink && (
                  <a
                    href={webGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github size={16} className="mr-1" />
                    Web Code
                  </a>
                )}

                {mobileGithubLink && (
                  <a
                    href={mobileGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github size={16} className="mr-1" />
                    Mobile Code
                  </a>
                )}

                {webDemoLink && (
                  <a
                    href={webDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Web Demo
                  </a>
                )}

                {mobileDemoLink && (
                  <a
                    href={mobileDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Mobile Demo
                  </a>
                )}

                {/* Web Demo - Always show */}
                <button
                  onClick={() => webVideoLink && openVideoInNewTab(webVideoLink)}
                  disabled={!webVideoLink}
                  className={`inline-flex items-center text-xs sm:text-sm ${
                    webVideoLink
                      ? "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Play size={16} className="mr-1" />
                  Web Demo
                </button>

                {/* Mobile Demo - Always show */}
                <button
                  onClick={() => mobileVideoLink && openVideoInNewTab(mobileVideoLink)}
                  disabled={!mobileVideoLink}
                  className={`inline-flex items-center text-xs sm:text-sm ${
                    mobileVideoLink
                      ? "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Play size={16} className="mr-1" />
                  Mobile Demo
                </button>
              </>
            ) : (
              <>
                {/* Regular single-repo project links */}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github size={16} className="mr-1" />
                    {getGithubButtonLabel()}
                  </a>
                )}

                {/* Watch Demo - Always show */}
                <button
                  onClick={() => videoLink && openVideoInNewTab(videoLink)}
                  disabled={!videoLink}
                  className={`inline-flex items-center text-xs sm:text-sm ${
                    videoLink
                      ? "text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Play size={16} className="mr-1" />
                  {videoLinkText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
