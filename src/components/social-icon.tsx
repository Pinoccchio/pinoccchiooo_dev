import type React from "react"
interface SocialIconProps {
  icon: React.ReactNode
  href: string
  bgColor: string
}

export function SocialIcon({ icon, href, bgColor }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full p-2 ${bgColor} text-white hover:opacity-75 transition-opacity`}
    >
      {icon}
    </a>
  )
}

