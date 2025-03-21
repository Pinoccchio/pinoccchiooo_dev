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
    },
    {
      name: "TypeScript",
      logo: "/tech/typescript.png",
      url: "https://www.typescriptlang.org",
    },
    {
      name: "Dart",
      logo: "/tech/dart.png",
      url: "https://dart.dev",
    },
    {
      name: "Flutter",
      logo: "/tech/flutter.png",
      url: "https://flutter.dev",
    },
    {
      name: "Java",
      logo: "/tech/java.png",
      url: "https://www.java.com",
    },
    {
      name: "Kotlin",
      logo: "/tech/kotlin.png",
      url: "https://kotlinlang.org",
    },
    {
      name: "Python",
      logo: "/tech/python.png",
      url: "https://www.python.org",
    },
    {
      name: "Jupyter",
      logo: "/tech/jupyter.png",
      url: "https://jupyter.org",
    },
    {
      name: "Supabase",
      logo: "/tech/supabase.png",
      url: "https://supabase.com",
    },
    {
      name: "Firebase",
      logo: "/tech/firebase.png",
      url: "https://firebase.google.com",
    },
  ]

  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-4 max-w-md">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="relative"
            whileHover={{ y: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {hoveredTech === tech.name && (
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10"
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
              className="flex items-center justify-center bg-white p-2 rounded-full shadow-sm border border-gray-200 w-12 h-12 hover:shadow-md transition-shadow duration-300"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <Image
                src={tech.logo || "/placeholder.svg"}
                alt={tech.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

