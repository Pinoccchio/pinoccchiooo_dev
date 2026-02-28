"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

export function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const technologies = [
    {
      name: "Next.js",
      logo: "/tech/nextjs.png",
      url: "https://nextjs.org",
      size: 32,
    },
    {
      name: "TypeScript",
      logo: "/tech/typescript.png",
      url: "https://www.typescriptlang.org",
      size: 32,
    },
    {
      name: "Dart",
      logo: "/tech/dart.png",
      url: "https://dart.dev",
      size: 32,
    },
    {
      name: "Flutter",
      logo: "/tech/flutter.png",
      url: "https://flutter.dev",
      size: 32,
    },
    {
      name: "Java",
      logo: "/tech/java.png",
      url: "https://www.java.com",
      size: 32,
    },
    {
      name: "Python",
      logo: "/tech/python.png",
      url: "https://www.python.org",
      size: 32,
    },
    {
      name: "Jupyter",
      logo: "/tech/jupyter.png",
      url: "https://jupyter.org",
      size: 32,
    },
    {
      name: "Supabase",
      logo: "/tech/supabase.png",
      url: "https://supabase.com",
      size: 32,
    },
    {
      name: "Firebase",
      logo: "/tech/firebase.png",
      url: "https://firebase.google.com",
      size: 32,
    },
  ]

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="relative"
            whileHover={{ y: -3 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          >
            {hoveredTech === tech.name && (
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border)] shadow-lg text-xs py-1 px-2 rounded whitespace-nowrap z-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tech.name}
              </motion.div>
            )}
            <a
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:opacity-80"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <Image
                src={tech.logo || "/placeholder.svg"}
                alt={tech.name}
                width={tech.size}
                height={tech.size}
                className="object-contain"
              />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

