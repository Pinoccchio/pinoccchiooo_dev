"use client"

import { Github, ExternalLink, Play } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  icon: string
  githubLink?: string
  demoLink?: string
  demoText?: string
  videoLink?: string
  type?: "web" | "app"
}

export function ProjectCard({
  title,
  description,
  icon,
  githubLink,
  demoLink,
  demoText = "Live Demo",
  videoLink,
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start">
        <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">{icon}</div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold pinocchio-primary">{title}</h3>
          <p className="pinocchio-text mt-1 text-sm sm:text-base">{description}</p>

          <div className="flex mt-3 gap-2">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Github size={16} className="mr-1" />
                Code
              </a>
            )}

            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink size={16} className="mr-1" />
                {demoText}
              </a>
            )}

            {videoLink && (
              <button
                onClick={() => openVideoInNewTab(videoLink)}
                className="inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Play size={16} className="mr-1" />
                Watch Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
