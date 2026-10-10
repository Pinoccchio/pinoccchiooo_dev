"use client"

import { useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, Play } from "lucide-react"
import { TechBadgeList } from "./tech-badge"
import { ScreenshotModal } from "./screenshot-modal"
import { type Project, type ScreenshotCategory } from "@/data/projects"

interface ProjectCardProps {
  openGalleryOnLoad?: boolean
  title: string
  description: string
  githubLink?: string
  demoLink?: string
  caseStudyLink?: string
  thumbnailSrc?: string
  thumbnailLogo?: string
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
  openGalleryOnLoad = false,
  title,
  description,
  githubLink,
  demoLink,
  caseStudyLink,
  thumbnailSrc,
  thumbnailLogo,
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
  techStack,
  details,
  screenshots,
  screenshotCategories,
  type = "web",
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(() => openGalleryOnLoad && Boolean(
    screenshotCategories?.some(category => category.screenshots.length > 0) || screenshots?.length
  ))
  const [modalInitialIndex, setModalInitialIndex] = useState(0)

  // Get all screenshots (from categories or direct array)
  const allScreenshots = screenshotCategories
    ? screenshotCategories.flatMap(cat => cat.screenshots)
    : screenshots || []
  const thumbnail = allScreenshots[0]

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
      // Drive thumbnail endpoints can show broken images even when the video link works.
      return null
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
  const metadataLine = [
    platformSummary || categoryLabel,
    engagementType ? `${engagementType} project` : null,
  ].filter(Boolean).join(" · ")
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
  const coverVideo = !thumbnail ? (fallbackMediaLinks[0] || videoPreviews[0]) : null
  const actionClassName =
    "inline-flex items-center gap-1.5 border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1.5 rounded-full shadow-sm text-[11px] sm:text-xs font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)] hover:shadow-md"

  return (
    <div className="flex flex-col h-full">
      {thumbnailSrc && demoLink ? (
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="project-cover group relative mb-4 block w-full overflow-hidden"
          aria-label={`Open live ${title} website`}
        >
          <Image
            src={thumbnailSrc}
            alt={`${title} live website preview`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="project-cover-label">Visit live site <ExternalLink size={13} /></span>
        </a>
      ) : thumbnail ? (
        <button
          type="button"
          onClick={() => openModal(0)}
          className="project-cover group relative mb-4 block w-full overflow-hidden text-left"
          aria-label={`View ${title} screenshots`}
        >
          <Image
            src={thumbnail}
            alt={`${title} project preview`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="project-cover-label">View screenshots <ExternalLink size={13} /></span>
        </button>
      ) : coverVideo ? (
        <button
          type="button"
          onClick={() => openVideoInNewTab(coverVideo.url!)}
          className="project-cover project-video-cover group relative mb-4 flex w-full flex-col items-start justify-between overflow-hidden p-5 text-left transition-colors hover:border-[var(--accent-border)]"
          aria-label={`Watch ${title} video walkthrough`}
        >
          {thumbnailSrc && (
            <Image
              src={thumbnailSrc}
              alt={`${title} app screen from the video walkthrough`}
              fill
              className="object-contain p-3"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <span className="project-video-mark relative z-10" aria-hidden="true"><Play size={20} fill="currentColor" className="ml-0.5" /></span>
          <span className="relative z-10 flex w-full items-end justify-between gap-2 rounded-lg bg-black/75 px-3 py-2 text-white">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Video walkthrough</span>
            <ExternalLink size={16} className="text-[var(--text-secondary)]" />
          </span>
        </button>
      ) : (
        <div className="project-cover project-cover-empty mb-4" aria-label={`${title} project cover`}>
          <span className="project-cover-wordmark">{title}</span>
          <span className="project-cover-kind">{platformSummary || categoryLabel || "Project"}</span>
        </div>
      )}
      {/* Header Row: Icon + Title/Status */}
      <div className="mb-3 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {thumbnailLogo && (
              <span className="project-title-logo">
                <Image
                  src={thumbnailLogo}
                  alt=""
                  width={title === "PicklePark" ? 36 : 24}
                  height={24}
                  className="h-6 w-auto max-w-9 object-contain"
                />
              </span>
            )}
            <h3 className="text-[1rem] sm:text-[1.15rem] font-semibold text-[var(--text-primary)] leading-7 break-words">{title}</h3>
          </div>

        </div>
      </div>

      {metadataLine && (
        <p className="mb-4 text-sm leading-6 text-[var(--text-secondary)]">{metadataLine}</p>
      )}

      {/* Description - Full width, no truncation */}
      <p className="pinocchio-text mb-2 text-[0.86rem] leading-7 sm:text-[0.94rem] sm:leading-8">{description}</p>

      {/* Details */}
      {details && (
        <p className="mb-4 text-[11px] sm:text-xs text-[var(--text-muted)] italic leading-5 sm:leading-6">
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
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 sm:p-4">
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
                  <div className="border border-white/80 bg-white/90 px-3 py-1.5 rounded-full text-[11px] font-semibold text-gray-900 shadow-sm">
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

      {hasVideoPreviews && !coverVideo && (
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 sm:p-4">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-gray-900 shadow-md transition-transform duration-200 group-hover:scale-110">
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

      {fallbackMediaLinks.length > 0 && !coverVideo && (
        <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 sm:p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
            Video Walkthroughs
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {fallbackMediaLinks.map(link => (
              <button
                key={link.label}
                type="button"
                onClick={() => openVideoInNewTab(link.url!)}
                className="video-cover group flex min-h-28 flex-col items-start justify-between rounded-xl border border-[var(--border)] p-4 text-left transition-colors hover:border-[var(--accent-border)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-primary)] transition-transform group-hover:scale-105">
                  <Play size={15} fill="currentColor" className="ml-0.5" />
                </span>
                <span className="flex w-full items-center justify-between gap-2 text-xs font-semibold text-[var(--text-primary)]">
                  {link.label}
                  <ExternalLink size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Links - Push to bottom */}
      <div className="flex gap-2 flex-wrap mt-auto pt-3">
        {caseStudyLink && <a href={caseStudyLink} className={actionClassName}>Read case study <ExternalLink size={14} /></a>}
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
            {demoLink && !thumbnailSrc && (
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
