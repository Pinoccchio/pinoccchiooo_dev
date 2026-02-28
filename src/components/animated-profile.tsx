"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function AnimatedProfile() {
  const [isAvatarShown, setIsAvatarShown] = useState(true)

  // Toggle between images every 12 seconds - less distracting
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAvatarShown((prev) => !prev)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 overflow-hidden rounded-full">
      <AnimatePresence mode="wait">
        {isAvatarShown ? (
          <motion.div
            key="pinocchio"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src="/pinocchio-avatar.png" alt="Pinocchio Avatar" fill className="object-cover" priority />
          </motion.div>
        ) : (
          <motion.div
            key="real-profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image src="/my-profile.png" alt="Real Profile" fill className="object-cover" priority />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

