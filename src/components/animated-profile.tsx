"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const profileImages = [
  { key: "pinocchio", src: "/pinocchio-avatar.png", alt: "Pinoccchiooo avatar" },
  { key: "profile", src: "/my-profile.png", alt: "Jan Miko A. Guevarra profile" },
  { key: "facebook-profile", src: "/fb-profile.jpg", alt: "Jan Miko A. Guevarra Facebook profile" },
] as const

export function AnimatedProfile() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Rotate between images every 12 seconds - less distracting
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % profileImages.length)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 overflow-hidden rounded-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={profileImages[activeIndex].key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={profileImages[activeIndex].src}
            alt={profileImages[activeIndex].alt}
            fill
            className="object-contain bg-[var(--surface-secondary)] p-2"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

