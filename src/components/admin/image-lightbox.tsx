"use client"

import { useEffect } from "react"
import { X, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ImageLightboxProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  title: string
  description?: string | null
  uploadType?: string
  uploadDate?: string
  fileName?: string
}

export function ImageLightbox({
  open,
  onOpenChange,
  imageUrl,
  title,
  description,
  uploadType,
  uploadDate,
  fileName,
}: ImageLightboxProps) {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = fileName || "image"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 gap-0 overflow-hidden bg-black/95 border-none">
        {/* Header with controls */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-semibold text-white truncate mb-1">
                {title}
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center gap-2 flex-wrap">
                  {uploadType && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-none">
                      {uploadType.replace("_", " ")}
                    </Badge>
                  )}
                  {uploadDate && (
                    <span className="text-sm text-white/70">{uploadDate}</span>
                  )}
                </div>
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownload}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <Download size={16} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleOpenInNewTab}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <ExternalLink size={16} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Image container */}
        <div
          className="w-full h-full flex items-center justify-center p-16 cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <div
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </div>

        {/* Footer with description */}
        {description && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="text-white/90 text-sm max-w-4xl mx-auto">
              {description}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
