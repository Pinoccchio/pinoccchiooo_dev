"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, Play } from "lucide-react"
import { TechBadgeList } from "./tech-badge"
import { ScreenshotModal } from "./screenshot-modal"
import { type Project, type ScreenshotCategory } from "@/data/projects"

interface ProjectCardProps {
  title: string
  description: string
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
  details?: string
  screenshots?: string[]
  screenshotCategories?: ScreenshotCategory[]
}

export function ProjectCard({
  title,
  description,
  githubLink,
  demoLink,
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

  const getVideoThumbnail = (url: string) => {
    if (!url) return null

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
  const mediaLinks = [
    { label: "Demo Video", url: videoLink },
    { label: "Web Video", url: webVideoLink },
    { label: "Mobile Video", url: mobileVideoLink },
  ].filter(item => item.url)
  const videoPreviews = mediaLinks
    .map(item => ({
      ...item,
      thumbnail: getVideoThumbnail(item.url!),
    }))
    .filter(item => item.thumbnail)
  const hasVideoPreviews = videoPreviews.length > 0
  const fallbackMediaLinks = mediaLinks.filter(item => !getVideoThumbnail(item.url!))
  const actionClassName =
    "inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)] hover:shadow-md"

  return (
    <div className="flex flex-col h-full">
      {/* Header Row: Icon + Title/Status */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[1.1rem] sm:text-[1.2rem] font-semibold text-[var(--text-primary)] leading-8 break-words">{title}</h3>
          </div>

        </div>
      </div>

      {metadataTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {metadataTags.slice(0, 4).map((tag, index) => (
            <span key={`${tag}-${index}`} className="badge">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description - Full width, no truncation */}
      <p className="pinocchio-text text-[0.96rem] leading-8 mb-2">{description}</p>

      {/* Details */}
      {details && (
        <p className="text-xs text-[var(--text-muted)] mb-4 italic leading-6">
          {details}
        </p>
      )}

      {/* Tech Stack Badges */}
      {techStack && techStack.length > 0 && (
        <div className="mb-4">
          <TechBadgeList technologies={techStack} maxDisplay={6} />
        </div>
      )}

      {/* Media Preview */}
      {allScreenshots.length > 0 && (
        <div className="mb-4 border border-[var(--border)] bg-[var(--surface-secondary)] p-4 rounded-2xl">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
              Screenshots
            </div>
            <button
              type="button"
              onClick={() => openModal(0)}
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              View gallery
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {allScreenshots.slice(0, maxThumbnails).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openModal(i)}
                className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--border)] transition-colors duration-200 group bg-[var(--surface-primary)] rounded-xl shadow-sm"
              >
                <Image
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                  sizes="(max-width: 640px) 25vw, 120px"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center bg-black/10">
                  <div className="border border-white/80 bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-900">
                    Open
                  </div>
                </div>
              </button>
            ))}
          </div>
          {hasMoreScreenshots && (
            <div className="mt-2 text-xs text-[var(--text-muted)]">
              {allScreenshots.length} screenshots{categoryCount > 0 && ` across ${categoryCount} sections`}
            </div>
          )}
        </div>
      )}

      {hasVideoPreviews && (
        <div className="mb-4 border border-[var(--border)] bg-[var(--surface-secondary)] p-4 rounded-2xl">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            Video Walkthroughs
          </div>
          <div className={`grid gap-2 ${videoPreviews.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
            {videoPreviews.map(link => (
              <button
                key={link.label}
                type="button"
                onClick={() => openVideoInNewTab(link.url!)}
                className="group relative aspect-video overflow-hidden border border-[var(--border)] bg-[var(--surface-primary)] transition-colors hover:bg-[var(--surface-tertiary)] rounded-xl shadow-sm"
              >
                <Image
                  src={link.thumbnail!}
                  alt={`${title} ${link.label}`}
                  fill
                  className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/28" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/80 bg-white/90 text-gray-900 transition-transform duration-200 group-hover:scale-105">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 py-2 text-left text-white">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em]">
                    {link.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-white/88">
                    <ExternalLink size={11} />
                    Open
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {fallbackMediaLinks.length > 0 && (
        <div className="mb-4 border border-[var(--border)] bg-[var(--surface-secondary)] p-4 rounded-2xl">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            Video Walkthroughs
          </div>
          <div className="flex flex-wrap gap-2">
            {fallbackMediaLinks.map(link => (
              <button
                key={link.label}
                type="button"
                onClick={() => openVideoInNewTab(link.url!)}
                className={actionClassName}
              >
                <Play size={14} />
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Links - Push to bottom */}
      <div className="flex gap-2 flex-wrap mt-auto pt-3">
        {(webGithubLink || mobileGithubLink) ? (
          <>
            {webGithubLink && (
              <a
                href={webGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClassName}
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
                className={actionClassName}
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
                className={actionClassName}
              >
                <ExternalLink size={14} className="mr-1" />
                Web Demo
              </a>
            )}
            {mobileDemoLink && (
              <a
                href={mobileDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClassName}
              >
                <ExternalLink size={14} className="mr-1" />
                Mobile Demo
              </a>
            )}
            {!hasVideoPreviews && webVideoLink && (
              <button
                onClick={() => openVideoInNewTab(webVideoLink)}
                className={actionClassName}
              >
                <Play size={14} className="mr-1" />
                Web Video
              </button>
            )}
            {!hasVideoPreviews && mobileVideoLink && (
              <button
                onClick={() => openVideoInNewTab(mobileVideoLink)}
                className={actionClassName}
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
                className={actionClassName}
              >
                <Github size={14} className="mr-1" />
                {getGithubButtonLabel()}
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClassName}
              >
                <ExternalLink size={14} className="mr-1" />
                Demo
              </a>
            )}
            {!hasVideoPreviews && videoLink && (
              <button
                onClick={() => openVideoInNewTab(videoLink)}
                className={actionClassName}
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
