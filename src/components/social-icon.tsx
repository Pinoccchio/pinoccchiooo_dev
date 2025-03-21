import type { ReactNode } from "react"

interface SocialIconProps {
  icon: ReactNode
  href: string
  bgColor: string
}

export function SocialIcon({ icon, href, bgColor }: SocialIconProps) {
  return (
    <a
      href={href}
      className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
    >
      {icon}
    </a>
  )
}

