"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Images, Grid3X3, List } from "lucide-react"
import { type ScreenshotCategory } from "@/data/projects"

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
  // Flatten categories into single array for navigation
  const allScreenshots = screenshotCategories
    ? screenshotCategories.flatMap(cat => cat.screenshots)
    : screenshots || []

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"slideshow" | "grid">("slideshow")
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // Get current category info
  const getCurrentCategory = () => {
    if (!screenshotCategories) return null
    let count = 0
    for (const cat of screenshotCategories) {
      if (currentIndex < count + cat.screenshots.length) {
        return {
          category: cat,
          indexInCategory: currentIndex - count,
          categoryIndex: screenshotCategories.indexOf(cat)
        }
      }
      count += cat.screenshots.length
    }
    return null
  }

  const currentCategoryInfo = getCurrentCategory()

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setViewMode("slideshow")
    }
  }, [isOpen, initialIndex])

  // Mount check for portal
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current && isOpen && viewMode === "slideshow") {
      const container = thumbnailContainerRef.current
      const thumbnail = container.children[currentIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [currentIndex, isOpen, viewMode])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === "Escape") onClose()
    else if (e.key === "ArrowLeft") setCurrentIndex(prev => (prev === 0 ? allScreenshots.length - 1 : prev - 1))
    else if (e.key === "ArrowRight") setCurrentIndex(prev => (prev === allScreenshots.length - 1 ? 0 : prev + 1))
  }, [isOpen, onClose, allScreenshots.length])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen || !mounted || allScreenshots.length === 0) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev === 0 ? allScreenshots.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev === allScreenshots.length - 1 ? 0 : prev + 1))
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Images size={20} className="text-blue-400" />
          <h3 className="font-semibold text-white text-lg hidden sm:block">{title}</h3>
          <span className="text-sm text-gray-400 bg-gray-800 px-2.5 py-1 rounded-full">
            {currentIndex + 1} / {allScreenshots.length}
          </span>
          {currentCategoryInfo && (
            <span className="text-sm text-blue-400 hidden sm:inline">
              {currentCategoryInfo.category.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("slideshow")}
              className={`p-1.5 rounded ${viewMode === "slideshow" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              title="Slideshow view"
            >
              <Images size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              title="Grid view"
            >
              <Grid3X3 size={18} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X size={24} className="text-gray-300 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden" onClick={e => e.stopPropagation()}>
        {viewMode === "slideshow" ? (
          /* Slideshow View */
          <div className="h-full flex flex-col">
            {/* Main Image */}
            <div className="flex-1 relative flex items-center justify-center p-4 min-h-0">
              <div className="relative w-full h-full max-w-7xl">
                <Image
                  src={allScreenshots[currentIndex]}
                  alt={`${title} screenshot ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Navigation Arrows */}
              {allScreenshots.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 border border-gray-700"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 border border-gray-700"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Category Info Bar */}
            {currentCategoryInfo && (
              <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{currentCategoryInfo.category.title}</h4>
                    <p className="text-gray-400 text-sm">{currentCategoryInfo.category.description}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {currentCategoryInfo.indexInCategory + 1} of {currentCategoryInfo.category.screenshots.length} in category
                  </span>
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            <div className="bg-black/50 border-t border-gray-800 py-2 px-2 sm:px-4">
              <div
                ref={thumbnailContainerRef}
                className="flex gap-1.5 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {allScreenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative flex-shrink-0 rounded overflow-hidden transition-all ${
                      i === currentIndex
                        ? "ring-2 ring-blue-500 w-20 h-12"
                        : "opacity-40 hover:opacity-100 w-16 h-10"
                    }`}
                  >
                    <Image src={src} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
                ← → arrow keys to navigate • ESC to close
              </p>
            </div>
          </div>
        ) : (
          /* Grid View with Categories */
          <div
            ref={gridContainerRef}
            className="h-full overflow-y-auto p-4"
          >
            {screenshotCategories ? (
              /* Categorized Grid */
              <div className="max-w-7xl mx-auto space-y-8">
                {screenshotCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <List size={18} className="text-blue-400" />
                        <h4 className="text-white font-semibold text-lg">{category.title}</h4>
                      </div>
                      <span className="text-gray-500 text-sm">({category.screenshots.length})</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {category.screenshots.map((src, imgIndex) => {
                        const globalIndex = screenshotCategories
                          .slice(0, catIndex)
                          .reduce((sum, c) => sum + c.screenshots.length, 0) + imgIndex
                        return (
                          <button
                            key={imgIndex}
                            onClick={() => {
                              setCurrentIndex(globalIndex)
                              setViewMode("slideshow")
                            }}
                            className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors group"
                          >
                            <Image
                              src={src}
                              alt={`${category.title} ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                View
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Simple Grid (no categories) */
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {allScreenshots.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i)
                        setViewMode("slideshow")
                      }}
                      className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors group"
                    >
                      <Image
                        src={src}
                        alt={`Screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
