"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, Play, Lock, Images } from "lucide-react"
import { TechBadgeList } from "./tech-badge"
import { ScreenshotModal } from "./screenshot-modal"
import { type Project, type ScreenshotCategory } from "@/data/projects"

interface ProjectCardProps {
  title: string
  description: string
  icon: string
  githubLink?: string
  demoLink?: string
  demoText?: string
  videoLink?: string
  videoLinkText?: string
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
  screenshots?: string[]
  screenshotCategories?: ScreenshotCategory[]
}

export function ProjectCard({
  title,
  description,
  icon,
  githubLink,
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
  screenshots,
  screenshotCategories,
  type = "web",
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInitialIndex, setModalInitialIndex] = useState(0)

  // Get all screenshots (from categories or direct array)
  const allScreenshots = screenshotCategories
    ? screenshotCategories.flatMap(cat => cat.screenshots)
    : screenshots || []

  const formatGoogleDriveLink = (url: string) => {
    if (!url) return ""
    if (url.includes("drive.google.com")) {
      let fileId = ""
      if (url.includes("/file/d/")) {
        fileId = url.split("/file/d/")[1].split("/")[0]
      } else if (url.includes("open?id=")) {
        fileId = url.split("open?id=")[1].split("&")[0]
      } else if (url.includes("/folders/")) {
        fileId = url.split("/folders/")[1].split("?")[0]
      }
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return url
  }

  const openVideoInNewTab = (url: string) => {
    const formattedUrl = formatGoogleDriveLink(url)
    window.open(formattedUrl, "_blank", "noopener,noreferrer")
  }

  const getGithubButtonLabel = () => {
    switch (type) {
      case "web":
        return "Web Code"
      case "mobile":
        return "Mobile Code"
      default:
        return "Code"
    }
  }

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

  const openModal = (index: number) => {
    setModalInitialIndex(index)
    setIsModalOpen(true)
  }

  // Determine how many thumbnails to show
  const maxThumbnails = 4
  const hasMoreScreenshots = allScreenshots.length > maxThumbnails
  const categoryCount = screenshotCategories?.length || 0

  return (
    <div className="flex flex-col h-full">
      {/* Header Row: Icon + Title/Status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl sm:text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          {/* Title with Private Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold pinocchio-primary break-words">{title}</h3>
            {isPrivate && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex-shrink-0">
                <Lock size={10} className="mr-1" />
                Private
              </span>
            )}
          </div>

          {/* Status and Date */}
          <div className="flex items-center gap-2 flex-wrap mt-1">
            {status && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(status)}`}>
                {status}
              </span>
            )}
            {date && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description - Full width, no truncation */}
      <p className="pinocchio-text text-sm leading-relaxed mb-2">{description}</p>

      {/* Details */}
      {details && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic leading-relaxed">
          {details}
        </p>
      )}

      {/* Tech Stack Badges */}
      {techStack && techStack.length > 0 && (
        <div className="mb-3">
          <TechBadgeList technologies={techStack} maxDisplay={6} />
        </div>
      )}

      {/* Screenshots Gallery */}
      {allScreenshots.length > 0 && (
        <div className="mb-3">
          <div className="flex gap-1.5 flex-wrap">
            {allScreenshots.slice(0, maxThumbnails).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openModal(i)}
                className="relative w-16 h-10 flex-shrink-0 rounded overflow-hidden border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
              >
                <Image
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Images size={12} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
            {/* View More Button */}
            {hasMoreScreenshots && (
              <button
                type="button"
                onClick={() => openModal(0)}
                className="h-10 px-2 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 transition-colors flex items-center gap-1"
              >
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  +{allScreenshots.length - maxThumbnails}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Links - Push to bottom */}
      <div className="flex gap-2 flex-wrap mt-auto pt-2">
        {(webGithubLink || mobileGithubLink) ? (
          <>
            {webGithubLink && (
              <a
                href={webGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Github size={14} className="mr-1" />
                Web
              </a>
            )}
            {mobileGithubLink && (
              <a
                href={mobileGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Github size={14} className="mr-1" />
                Mobile
              </a>
            )}
            {webDemoLink && (
              <a
                href={webDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink size={14} className="mr-1" />
                Demo
              </a>
            )}
            {mobileDemoLink && (
              <a
                href={mobileDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink size={14} className="mr-1" />
                App Demo
              </a>
            )}
            {webVideoLink && (
              <button
                onClick={() => openVideoInNewTab(webVideoLink)}
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Play size={14} className="mr-1" />
                Web Video
              </button>
            )}
            {mobileVideoLink && (
              <button
                onClick={() => openVideoInNewTab(mobileVideoLink)}
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Play size={14} className="mr-1" />
                Mobile Video
              </button>
            )}
          </>
        ) : (
          <>
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Github size={14} className="mr-1" />
                {getGithubButtonLabel()}
              </a>
            )}
            {videoLink && (
              <button
                onClick={() => openVideoInNewTab(videoLink)}
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Play size={14} className="mr-1" />
                {videoLinkText}
              </button>
            )}
            {/* Show View Screenshots button if there are screenshots but no other links */}
            {!githubLink && !videoLink && allScreenshots.length > 0 && (
              <button
                onClick={() => openModal(0)}
                className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Images size={14} className="mr-1" />
                {categoryCount > 0
                  ? `View ${allScreenshots.length} Screenshots (${categoryCount} sections)`
                  : `View ${allScreenshots.length} Screenshots`
                }
              </button>
            )}
          </>
        )}
      </div>

      {/* Screenshot Modal - Using Portal */}
      {allScreenshots.length > 0 && (
        <ScreenshotModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          screenshots={screenshotCategories ? undefined : screenshots}
          screenshotCategories={screenshotCategories}
          title={title}
          initialIndex={modalInitialIndex}
        />
      )}
    </div>
  )
}
