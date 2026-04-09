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
  categoryLabel?: string
  platformSummary?: string
  engagementType?: Project["engagementType"]
  sector?: Project["sector"]
  impactTags?: string[]
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
  categoryLabel,
  platformSummary,
  engagementType,
  sector,
  impactTags,
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

  const getVideoThumbnail = (url: string): string | null => {
    if (!url) return null

    // Handle Google Drive URLs
    if (url.includes("drive.google.com")) {
      let fileId = ""
      if (url.includes("/file/d/")) {
        fileId = url.split("/file/d/")[1].split("/")[0]
      } else if (url.includes("open?id=")) {
        fileId = url.split("open?id=")[1].split("&")[0]
      }
      if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
      }
    }

    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = ""
      if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1].split("&")[0]
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0]
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      }
    }

    return null
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
    // Production status gets accent treatment, others use neutral
    if (status === "Production") {
      return "bg-[var(--accent-muted)] text-[var(--accent)] border-[var(--accent)]"
    }
    return "bg-[var(--surface-tertiary)] text-[var(--text-secondary)] border-[var(--border)]"
  }

  const openModal = (index: number) => {
    setModalInitialIndex(index)
    setIsModalOpen(true)
  }

  // Determine how many thumbnails to show
  const maxThumbnails = 4
  const hasMoreScreenshots = allScreenshots.length > maxThumbnails
  const categoryCount = screenshotCategories?.length || 0
  const metadataTags = Array.from(
    new Set([platformSummary, engagementType, sector, categoryLabel, ...(impactTags || [])].filter(Boolean) as string[])
  )

  // Compute video thumbnails once for reuse
  const videoThumbnails = [
    { url: videoLink, thumbnail: getVideoThumbnail(videoLink || ""), label: "Demo", type: "video" as const },
    { url: webVideoLink, thumbnail: getVideoThumbnail(webVideoLink || ""), label: "Web", type: "webVideo" as const },
    { url: mobileVideoLink, thumbnail: getVideoThumbnail(mobileVideoLink || ""), label: "Mobile", type: "mobileVideo" as const },
  ].filter(v => v.url && v.thumbnail)

  const hasVideoThumbnails = videoThumbnails.length > 0

  return (
    <div className="flex flex-col h-full">
      {/* Header Row: Icon + Title/Status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="text-xl sm:text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          {/* Title with Private Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] break-words">{title}</h3>
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
              <span className="text-xs text-[var(--text-muted)]">
                {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {metadataTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {metadataTags.slice(0, 5).map((tag, index) => (
            <span key={`${tag}-${index}`} className="badge">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description - Full width, no truncation */}
      <p className="pinocchio-text text-sm leading-relaxed mb-2">{description}</p>

      {/* Details */}
      {details && (
        <p className="text-xs text-[var(--text-muted)] mb-3 italic leading-relaxed">
          {details}
        </p>
      )}

      {/* Tech Stack Badges */}
      {techStack && techStack.length > 0 && (
        <div className="mb-3">
          <TechBadgeList technologies={techStack} maxDisplay={6} />
        </div>
      )}

      {/* Screenshots Gallery - Full Width Grid Style */}
      {allScreenshots.length > 0 && (
        <div className="mb-3">
          <div className="grid grid-cols-4 gap-1.5">
            {allScreenshots.slice(0, maxThumbnails).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openModal(i)}
                className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--border)] transition-all duration-300 group bg-[var(--surface-secondary)]"
              >
                <Image
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 25vw, 120px"
                />
                {/* Hover overlay with icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Images size={14} className="text-gray-900" />
                  </div>
                </div>
              </button>
            ))}
          </div>
          {/* View More Row - Full width button below grid */}
          {hasMoreScreenshots && (
            <button
              type="button"
              onClick={() => openModal(0)}
              className="mt-2 w-full py-2 border border-[var(--border)] transition-all duration-300 flex items-center justify-center gap-2 group hover:bg-[var(--surface-secondary)]"
            >
              <Images size={14} className="text-[var(--text-secondary)]" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                View all {allScreenshots.length} screenshots
                {categoryCount > 0 && ` (${categoryCount} sections)`}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Video Preview Thumbnails - Full Width Cinematic Style */}
      {hasVideoThumbnails && (
        <div className="mb-3">
          <div className={`grid gap-2 ${videoThumbnails.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {videoThumbnails.map((video, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openVideoInNewTab(video.url!)}
                className="relative w-full aspect-video overflow-hidden border border-[var(--border)] transition-all duration-300 group bg-gray-900"
                title={`Watch ${video.label} Video`}
              >
                {/* Thumbnail image - full coverage */}
                <Image
                  src={video.thumbnail!}
                  alt={`${title} ${video.label} video`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                {/* Play button - centered, prominent */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 dark:bg-white/90 flex items-center justify-center backdrop-blur-sm transform group-hover:scale-110 transition-all duration-300 group-hover:bg-white">
                    <Play size={22} className="text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Label badge - bottom left with glass effect */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                    {video.label}
                  </span>
                  {/* Watch indicator on hover */}
                  <span className="text-[10px] font-medium text-white/90 bg-[var(--accent)]/85 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    <ExternalLink size={10} />
                    Watch
                  </span>
                </div>
              </button>
            ))}
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
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline py-1.5 px-1"
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
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline py-1.5 px-1"
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
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline py-1.5 px-1"
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
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline py-1.5 px-1"
              >
                <ExternalLink size={14} className="mr-1" />
                App Demo
              </a>
            )}
            {/* Only show video links if no video thumbnails are displayed */}
            {!hasVideoThumbnails && webVideoLink && (
              <button
                onClick={() => openVideoInNewTab(webVideoLink)}
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline cursor-pointer py-1.5 px-1"
              >
                <Play size={14} className="mr-1" />
                Web Video
              </button>
            )}
            {!hasVideoThumbnails && mobileVideoLink && (
              <button
                onClick={() => openVideoInNewTab(mobileVideoLink)}
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline cursor-pointer py-1.5 px-1"
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
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline py-1.5 px-1"
              >
                <Github size={14} className="mr-1" />
                {getGithubButtonLabel()}
              </a>
            )}
            {/* Only show video link if no video thumbnail is displayed */}
            {!hasVideoThumbnails && videoLink && (
              <button
                onClick={() => openVideoInNewTab(videoLink)}
                className="inline-flex items-center text-xs text-[var(--accent)] hover:underline cursor-pointer py-1.5 px-1"
              >
                <Play size={14} className="mr-1" />
                {videoLinkText}
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
