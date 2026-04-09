"use client"

import { useMemo } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { Cpu, MapPin, ScanLine, Sparkles } from "lucide-react"
import { CONTACT } from "@/data/contact"

export function ProfileCard() {
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 })
  const edgeLight = useTransform(rotateY, [-8, 0, 8], [0.85, 1, 0.88])

  const cardMeta = useMemo(
    () => [
      { label: "Profile Card", value: "Multi-platform Systems" },
      { label: "Focus", value: "Government, healthcare, and business" },
      { label: "Base", value: `${CONTACT.location.city}, ${CONTACT.location.country}` },
    ],
    []
  )

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width
    const py = (event.clientY - bounds.top) / bounds.height

    rotateY.set((px - 0.5) * 10)
    rotateX.set((0.5 - py) * 10)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="profile-card-shell">
      <motion.div
        className="profile-card"
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div className="profile-card-edge" style={{ opacity: edgeLight }} />

        <div className="profile-card-top">
          <div className="profile-card-symbol">
            <ScanLine size={20} strokeWidth={2.2} />
          </div>
          <div className="profile-card-chip">
            <Sparkles size={12} />
            <span>Since 2022</span>
          </div>
        </div>

        <div className="profile-card-header">
          <div className="profile-card-kicker">Software Developer</div>
          <div className="profile-card-name">{CONTACT.name.full}</div>
          <div className="profile-card-role">AI & Full-Stack Developer</div>
        </div>

        <div className="profile-card-grid">
          {cardMeta.map(item => (
            <div key={item.label} className="profile-card-block">
              <div className="profile-card-label">{item.label}</div>
              <div className="profile-card-value">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="profile-card-footer">
          <div className="profile-card-footer-item">
            <Cpu size={14} />
            <span>Production systems</span>
          </div>
          <div className="profile-card-footer-item">
            <MapPin size={14} />
            <span>Philippines</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
