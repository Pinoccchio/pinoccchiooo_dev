"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { type ScreenshotCategory } from "@/data/projects"
import { useTheme } from "@/components/theme-provider"

interface ScreenshotModalProps {
  isOpen: boolean
  onClose: () => void
  screenshots?: string[]
  screenshotCategories?: ScreenshotCategory[]
  title: string
  initialIndex?: number
}

export function ScreenshotModal({
  isOpen,
  onClose,
  screenshots,
  screenshotCategories,
  title,
  initialIndex = 0,
}: ScreenshotModalProps) {
  const { theme } = useTheme()
  const allScreenshots = screenshotCategories
    ? screenshotCategories.flatMap(category => category.screenshots)
    : screenshots || []

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"single" | "grid">("single")
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  const getCurrentCategory = () => {
    if (!screenshotCategories) return null

    let offset = 0
    for (const category of screenshotCategories) {
      if (currentIndex < offset + category.screenshots.length) {
        return {
          title: category.title,
          description: category.description,
          indexInCategory: currentIndex - offset,
          total: category.screenshots.length,
        }
      }
      offset += category.screenshots.length
    }

    return null
  }

  const currentCategory = getCurrentCategory()

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setViewMode("single")
    }
  }, [initialIndex, isOpen])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!thumbnailContainerRef.current || !isOpen) return

    const thumbnail = thumbnailContainerRef.current.children[currentIndex] as HTMLElement | undefined
    thumbnail?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [currentIndex, isOpen])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return

    if (event.key === "Escape") onClose()
    if (event.key === "ArrowLeft") {
      setCurrentIndex(prev => (prev === 0 ? allScreenshots.length - 1 : prev - 1))
    }
    if (event.key === "ArrowRight") {
      setCurrentIndex(prev => (prev === allScreenshots.length - 1 ? 0 : prev + 1))
    }
  }, [allScreenshots.length, isOpen, onClose])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen || !mounted || allScreenshots.length === 0) return null

  const panelClassName = theme === "dark"
    ? "bg-[var(--surface-primary)] border-[var(--border)]"
    : "bg-white border-[var(--border)]"

  const subTextClassName = theme === "dark" ? "text-[var(--text-secondary)]" : "text-[var(--text-secondary)]"

  const handlePrev = (event: React.MouseEvent) => {
    event.stopPropagation()
    setCurrentIndex(prev => (prev === 0 ? allScreenshots.length - 1 : prev - 1))
  }

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation()
    setCurrentIndex(prev => (prev === allScreenshots.length - 1 ? 0 : prev + 1))
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(247,247,245,0.96)] dark:bg-[rgba(15,17,21,0.96)] p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`mx-auto flex h-full max-w-[1500px] flex-col border-0 md:border md:my-4 md:h-[calc(100%-2rem)] md:rounded-3xl overflow-hidden shadow-2xl ${panelClassName}`}
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">{title}</h3>
              <span className="border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide text-[var(--text-secondary)]">
                {currentIndex + 1} / {allScreenshots.length}
              </span>
              {currentCategory && (
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {currentCategory.title}
                </span>
              )}
            </div>
            {currentCategory && (
              <p className={`mt-2 text-sm ${subTextClassName}`}>
                {currentCategory.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(current => current === "single" ? "grid" : "single")}
              className="border border-[var(--border)] bg-[var(--surface-secondary)] px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)] shadow-sm"
            >
              {viewMode === "single" ? "All Screens" : "Single View"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-[var(--border)] bg-[var(--surface-secondary)] p-2 rounded-full text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)] shadow-sm"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={`flex-1 flex flex-col min-h-0 ${viewMode === "single" ? "" : "hidden"}`}>
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center px-3 py-4 sm:px-6 sm:py-6">
                <div className="relative h-full w-full">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={allScreenshots[currentIndex]}
                        alt={`${title} screenshot ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {allScreenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 border border-[var(--border)] bg-[var(--surface-primary)] p-2.5 rounded-full text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] shadow-md"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 border border-[var(--border)] bg-[var(--surface-primary)] p-2.5 rounded-full text-[var(--text-secondary)] transition-all hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] shadow-md"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            <div className="border-t border-[var(--border)] px-3 py-3 sm:px-6">
              <div
                ref={thumbnailContainerRef}
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {allScreenshots.map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-14 w-24 flex-shrink-0 overflow-hidden border rounded-lg transition-opacity ${
                      index === currentIndex
                        ? "border-[var(--text-primary)] opacity-100 ring-2 ring-[var(--text-primary)] ring-offset-1 dark:ring-offset-[var(--surface-primary)]"
                        : "border-[var(--border)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
                <span>Use left and right arrow keys to navigate.</span>
                {currentCategory && (
                  <span>
                    {currentCategory.indexInCategory + 1} of {currentCategory.total} in {currentCategory.title}
                  </span>
                )}
              </div>
            </div>
        </div>

        <div className={`flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 ${viewMode === "grid" ? "" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {allScreenshots.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index)
                    setViewMode("single")
                  }}
                  className="relative aspect-video overflow-hidden border border-[var(--border)] bg-[var(--surface-secondary)] rounded-xl transition-all hover:opacity-90 hover:shadow-md"
                >
                  <Image
                    src={src}
                    alt={`${title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
