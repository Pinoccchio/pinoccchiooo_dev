// Selected portfolio projects. Counts are derived from this array.
// Historical repository totals are not current completed-project counts.

import { aezzyScreenshots } from "./aezzy-screenshots"
import { fyllensScreenshots } from "./fyllens-screenshots"
import { healthcardScreenshots } from "./healthcard-screenshots"
import { incloudScreenshots } from "./incloud-screenshots"
import { jobsyncScreenshots } from "./jobsync-screenshots"
import { uavScreenshots } from "./uav-screenshots"

// Screenshot category for organized gallery display
export interface ScreenshotCategory {
  title: string
  description: string
  screenshots: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  icon: string
  category: "hybrid" | "web" | "mobile" | "ai-ml"
  engagementType?: "Client" | "Freelance" | "Academic" | "Personal"
  sector?: "Government" | "Healthcare" | "Education" | "Business" | "Agriculture" | "Accessibility" | "Consumer"
  platformSummary?: string
  impactTags?: string[]
  techStack: string[]
  demoUrl?: string
  caseStudyUrl?: string
  thumbnail?: string
  thumbnailLogo?: string
  videoUrl?: string
  // Hybrid system-specific links
  webDemoUrl?: string        // Web demo link
  mobileDemoUrl?: string     // Mobile demo link
  webVideoUrl?: string       // Web video demo
  mobileVideoUrl?: string    // Mobile video demo
  status: "Production" | "Active Development" | "Completed"
  date: string
  isPrivate: boolean
  isFeatured?: boolean
  featuredRank?: number
  details?: string
  screenshots?: string[]     // Simple array of screenshot paths
  screenshotCategories?: ScreenshotCategory[]  // Categorized screenshots with titles
}

export const projects: Project[] = [
  // ==================== PRODUCTION & CLIENT PLATFORMS ====================
  {
    id: "picklepark",
    caseStudyUrl: "/case-studies/picklepark",
    title: "PicklePark",
    description: "Live operations platform for court bookings, Open Play, tournaments, payments, and facility administration.",
    icon: "🏓",
    category: "hybrid",
    engagementType: "Client",
    sector: "Business",
    platformSummary: "Responsive Web Platform",
    impactTags: ["Production", "Real-time", "Payments"],
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Realtime", "PayMongo", "Vitest"],
    demoUrl: "https://www.pickleparkph.com/",
    thumbnail: "/picklepark-thumbnail.png",
    thumbnailLogo: "/picklepark-logo.png",
    status: "Production",
    date: "2026",
    isPrivate: true,
    isFeatured: true,
    featuredRank: 1,
    details: "Served as the sole full-stack developer during the JohnV MEDIA practicum, implementing booking and Open Play operations, Court Pulse, credits, payment workflows, and tournament/admin tools. The public site shows the customer-facing platform."
  },
  {
    id: "nameasone",
    title: "nameasone",
    description: "Personal identity platform with custom handles, grouped links, contact actions, and owner-provided payment details.",
    icon: "🌐",
    category: "web",
    engagementType: "Personal",
    sector: "Consumer",
    platformSummary: "Web Platform & Identity Hub",
    impactTags: ["Production", "Identity", "Live Platform"],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    demoUrl: "https://nameasone.cc/",
    thumbnail: "/nameasone-thumbnail.png",
    thumbnailLogo: "/nameasone-n-mark.svg",
    status: "Production",
    date: "2026",
    isPrivate: false,
    isFeatured: true,
    featuredRank: 2,
    details: "Built the public profile and handle experience | Grouped social and contact actions | Payment details let visitors pay directly through the owner's provider"
  },

  // ==================== HYBRID SYSTEMS ====================
  {
    id: "incloud-system",
    caseStudyUrl: "/case-studies/incloud",
    title: "InCloud System",
    description: "Cloud inventory system for J.A's Food Trading.",
    icon: "📦",
    category: "hybrid",
    engagementType: "Client",
    sector: "Business",
    platformSummary: "Web + Mobile",
    impactTags: ["Client Work", "Inventory", "AI-enabled"],
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Gemini AI", "Riverpod", "Turbopack", "Tailwind CSS"],
    status: "Active Development",
    date: "2025",
    isPrivate: false,
    isFeatured: true,
    details: "Built the full-stack system independently for J.A's Food Trading, including the Next.js inventory admin, Flutter customer app, and backend stock and order workflows. Owned frontend, backend, and application integration. Project screens are available in the gallery.",
    screenshotCategories: incloudScreenshots
  },
  {
    id: "pesojar-v2",
    title: "PesoJar",
    description: "Local-first personal finance app with account access, synchronization, and subscription integration.",
    icon: "💰",
    category: "hybrid",
    engagementType: "Client",
    sector: "Consumer",
    platformSummary: "Flutter App + Backend + Web Admin",
    techStack: ["Flutter", "Dart", "SQLite", "Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "Better Auth", "Stripe", "Next.js"],
    demoUrl: "https://pesojar.com/",
    thumbnail: "/pesojar-thumbnail.jpg",
    status: "Active Development",
    date: "2026",
    isPrivate: true,
    details: "Handled full-stack development for mobile finance workflows, local-first storage and synchronization, authentication, subscription integration, and protected administration. Account access and sync are backed by Cloudflare services."
  },
  {
    id: "nomoqr",
    title: "NomoQR",
    description: "Restaurant QR ordering and staff operations for menus, kitchen handoff, billing, and receipts.",
    icon: "🍽️",
    category: "web",
    engagementType: "Client",
    sector: "Business",
    platformSummary: "Guest Ordering + Staff Dashboard",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Realtime"],
    demoUrl: "https://www.nomoqr.com/",
    thumbnail: "/nomoqr-thumbnail.jpg",
    status: "Active Development",
    date: "2026",
    isPrivate: true,
    details: "Developing account-free table QR ordering and real-time restaurant workflows for kitchen handoff, menus, tables, staff, inventory, billing, and receipts. Implemented server routes and PostgreSQL functions to validate guest operations and prices; collaborated with a frontend contributor."
  },
  {
    id: "pay247",
    title: "Pay247",
    description: "HighLevel and Xendit payment integration with authenticated setup, checkout mapping, and webhook processing.",
    icon: "🔗",
    category: "web",
    engagementType: "Client",
    sector: "Business",
    platformSummary: "Payment Integration · Test Pilot",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "HighLevel API", "Xendit", "OAuth", "Webhooks"],
    demoUrl: "https://pay247.vercel.app/",
    thumbnail: "/pay247-thumbnail.jpg",
    status: "Active Development",
    date: "2026",
    isPrivate: true,
    details: "Implemented OAuth-based merchant setup, checkout mapping, provider verification, and payment webhook synchronization. A documented sandbox checkout reached HighLevel Paid through native Xendit callbacks; concurrency handling prevents duplicate confirmation. This is a test-mode pilot, not a live-payment rollout."
  },
  // ==================== AI & ML PROJECTS ====================
  {
    id: "mci-detection-system",
    title: "MCI Detection System",
    description: "Research application combining MRI processing, model inference, and a web dashboard.",
    icon: "🧠",
    category: "ai-ml",
    engagementType: "Freelance",
    sector: "Healthcare",
    platformSummary: "Web + ML Backend",
    impactTags: ["Healthcare", "Private", "AI-enabled"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Python", "FastAPI", "PyTorch", "Supabase", "Tailwind CSS", "NIfTI"],
    // No GitHub link - showcased via screenshots only (private freelance project)
    status: "Completed",
    date: "2026",
    isPrivate: true,
    isFeatured: true,
    details: "Built the web interface and Python/FastAPI backend for MRI/NIfTI processing, model inference, role-based records, and PDF reports in a research prototype.",
    // Categorized screenshots for organized gallery display
    screenshotCategories: [
      {
        title: "Landing Page",
        description: "Public-facing marketing pages showcasing the system's capabilities",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 214858.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 214915.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215038.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215057.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215113.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215134.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215151.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215202.png",
        ]
      },
      {
        title: "Authentication",
        description: "Secure login, registration, and password recovery",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215215.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215232.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215245.png",
        ]
      },
      {
        title: "Dashboard",
        description: "Role-based dashboards for Admin, Clinician, and Researcher",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215502.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221346.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222658.png",
        ]
      },
      {
        title: "Research Platform",
        description: "Research datasets and model analysis tools for researchers",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222737.png",
        ]
      },
      {
        title: "Patient Management",
        description: "Patient records and information management",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215514.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215531.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215556.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215614.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215629.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221400.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221413.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221451.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221512.png",
        ]
      },
      {
        title: "MRI Scan Management",
        description: "Upload and manage NIfTI brain scan files",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215645.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215659.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215718.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215742.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215804.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221524.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221540.png",
        ]
      },
      {
        title: "MCI Analysis",
        description: "ML-powered cognitive impairment detection workflow",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215825.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222711.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215904.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221603.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220011.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215949.png",
        ]
      },
      {
        title: "Analysis Results",
        description: "Prediction results with brain visualization and confidence scores",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215921.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221615.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221632.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221645.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221658.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221713.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221727.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221738.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221751.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222919.png",
        ]
      },
      {
        title: "Analytics Dashboard",
        description: "Performance metrics, trends, and model statistics",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220027.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220055.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220115.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220128.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220145.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222752.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222809.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222823.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222837.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222848.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222858.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222906.png",
        ]
      },
      {
        title: "Reports",
        description: "PDF report generation and clinical documentation",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220240.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220300.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220326.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220350.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220411.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220431.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220444.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220501.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220516.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220532.png",
        ]
      },
      {
        title: "User Management & Settings",
        description: "Role-based access control, user profiles, and settings",
        screenshots: [
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222646.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222930.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222941.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222954.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223006.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223019.png",
          "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223031.png",
        ]
      }
    ]
  },
  {
    id: "uav-flood-assessment",
    title: "UAV Flood Assessment System",
    description: "Flood road passability checker for disaster response.",
    icon: "🛸",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Government",
    platformSummary: "Web + ML",
    impactTags: ["Disaster Response", "Research", "AI-enabled"],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Python", "FastAPI", "PyTorch", "EfficientNet-B0", "ONNX Runtime", "OpenCV", "Leaflet Maps", "Tailwind CSS"],
    status: "Completed",
    date: "Year unconfirmed",
    isPrivate: false,
    isFeatured: true,
    details: "Academic flood-road assessment research project combining image analysis, a Python/FastAPI backend, and a Next.js interface with map visualization.",
    screenshotCategories: uavScreenshots
  },
  {
    id: "fyllens",
    title: "Fyllens - Plant Health Detection",
    description: "Plant health app for nutrient and disease checks.",
    icon: "🌿",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Agriculture",
    platformSummary: "Mobile AI App",
    impactTags: ["TensorFlow Lite", "Offline-ready", "AI-enabled"],
    techStack: ["Flutter", "Dart", "TensorFlow Lite", "Gemini AI", "Supabase", "Provider", "GoRouter", "Image Processing"],
    status: "Completed",
    date: "2025",
    isPrivate: false,
    isFeatured: true,
    details: "APPDEV final project covering Flutter application development, backend integration, and plant-image analysis.",
    screenshotCategories: fyllensScreenshots
  },
  {
    id: "aezzy-grammar",
    title: "A'ezzy Grammar Correction",
    description: "AI grammar and writing correction tool.",
    icon: "📝",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Education",
    platformSummary: "Web App",
    impactTags: ["AI-enabled", "Student Research"],
    techStack: ["Next.js 14", "TypeScript", "Gemini AI", "Radix UI", "Tailwind CSS"],
    status: "Completed",
    date: "Mar 2025",
    isPrivate: true,
    details: "Research project | CASAP Grade 11 | Gemini 2.5 Flash Lite | Real-time corrections",
    screenshotCategories: aezzyScreenshots
  },

  // ==================== WEB PROJECTS (7) ====================
  {
    id: "healthcard-go",
    title: "HealthCardGo",
    description: "Healthcare appointment and surveillance system.",
    icon: "🏥",
    category: "web",
    engagementType: "Client",
    sector: "Healthcare",
    platformSummary: "Web Platform",
    impactTags: ["Client Work", "Healthcare", "Forecasting"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Chart.js", "Leaflet", "ARIMA", "Tailwind CSS"],
    // No githubUrl - private project showcased via screenshots only
    status: "Completed",
    date: "2025-2026",
    isPrivate: true,
    isFeatured: true,
    details: "For the City Health Office of Panabo City, worked on appointment and surveillance workflows with five user roles, forecasting, and real-time notifications. Project screens are available in the gallery.",
    screenshotCategories: healthcardScreenshots
  },
  {
    id: "jobsync",
    title: "JobSync",
    description: "AI job matching and applicant ranking system.",
    icon: "💼",
    category: "web",
    engagementType: "Client",
    sector: "Government",
    platformSummary: "Web Platform",
    impactTags: ["Client Work", "Government", "AI-enabled"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Gemini AI", "Recharts", "PDF Processing", "Tailwind CSS"],
    // No githubUrl - private project showcased via screenshots only
    status: "Completed",
    date: "2025-2026",
    isPrivate: true,
    isFeatured: true,
    details: "Built applicant-management workflows for the Municipality of Asuncion, Davao del Norte, with role-based access, AI-assisted ranking, applicant records, training certificates, and reporting.",
    screenshotCategories: jobsyncScreenshots
  },
  // ==================== MOBILE APPLICATIONS ====================
  {
    id: "yummify",
    title: "Yummify Recipe Finder",
    description: "AI-powered recipe discovery combining Gemini AI with Spoonacular API for personalized recommendations and recipe generation.",
    icon: "🍳",
    category: "ai-ml",
    techStack: ["Flutter", "Dart", "Gemini AI", "Spoonacular API", "Firebase", "Provider"],
    videoUrl: "https://drive.google.com/file/d/1SNMK_7fW5-mlBQF8jLWPcTClgxBi2MdK/view?usp=sharing",
    thumbnail: "/yummify-video.jpg",
    status: "Completed",
    date: "Jun 2025",
    isPrivate: false
  },
  {
    id: "snake-buddy",
    title: "SnakeBuddy",
    description: "AI-powered snake identification using Gemini 1.5 Pro vision with real-time camera capture and offline catalog for Philippines.",
    icon: "🐍",
    category: "ai-ml",
    techStack: ["Flutter", "Dart", "Gemini AI", "Camera", "TensorFlow Lite"],
    videoUrl: "https://drive.google.com/file/d/1RF9ZJQC7ewUPSobTj41g_OIASBd27lzI/view?usp=sharing",
    thumbnail: "/snake-buddy-video.jpg",
    status: "Completed",
    date: "Apr-Jun 2025",
    isPrivate: false
  },
  {
    id: "better-bites",
    title: "Better Bites",
    description: "AI dietary choice analyzer scanning ingredient labels with OCR, providing health recommendations based on personal profiles.",
    icon: "🍎",
    category: "ai-ml",
    techStack: ["Flutter", "Dart", "Gemini AI", "ML Kit OCR", "Riverpod", "SQLite"],
    videoUrl: "https://drive.google.com/file/d/125EuRkh_k2smk1mhN1Or74CMc875aTwR/view?usp=sharing",
    thumbnail: "/better-bites-video.jpg",
    status: "Completed",
    date: "Jun 2025",
    isPrivate: false
  },
  {
    id: "scan-my-soil",
    title: "Scan My Soil",
    description: "AI soil analysis providing agricultural recommendations and insights based on soil composition using Gemini vision.",
    icon: "🌱",
    category: "ai-ml",
    techStack: ["Flutter", "Dart", "Gemini AI", "Supabase", "Provider", "Image Processing"],
    videoUrl: "https://drive.google.com/file/d/1k9x9oGSP-PO0DNTonA7s-wmJOaeAhdu9/view?usp=sharing",
    thumbnail: "/scan-my-soil-video.jpg",
    status: "Completed",
    date: "Mar-Apr 2025",
    isPrivate: false
  },
  {
    id: "talk-to-hand",
    title: "TalkToHand",
    description: "Real-time sign language gesture recognition using MediaPipe, translating gestures into readable text for accessibility.",
    icon: "👋",
    category: "ai-ml",
    techStack: ["Android Native", "MediaPipe", "Java", "Kotlin", "ML"],
    videoUrl: "https://drive.google.com/file/d/1jvLiSPp5QttF01L2UbvV-qE1o254Jc9n/view?usp=sharing",
    thumbnail: "/talk-to-hand-video.jpg",
    status: "Completed",
    date: "First year of college",
    isPrivate: false
  },
  {
    id: "envirospeak",
    title: "EnviroSpeak",
    description: "AI voice processing app using Gemini that describes surroundings via voice input with voice-to-text and text-to-speech.",
    icon: "🌍",
    category: "ai-ml",
    techStack: ["Flutter", "Dart", "Gemini AI", "Speech-to-Text", "Text-to-Speech"],
    videoUrl: "https://drive.google.com/file/d/1k-uS8cehsSWc2Gq22VUX_2AcUE-QxsmT/view?usp=sharing",
    thumbnail: "/envirospeak-video.jpg",
    status: "Completed",
    date: "Second year of college",
    isPrivate: false
  },
  {
    id: "econaga",
    title: "Econaga",
    description: "Waste management with location tracking allowing users to submit collection requests for efficient waste transportation.",
    icon: "♻️",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase", "GetX", "Google Maps", "Hive", "Charts"],
    videoUrl: "https://drive.google.com/file/d/1jvdjkWWiDaeVf8jWFT36e7i2ZfIUfS2C/view?usp=sharing",
    thumbnail: "/econaga-video.jpg",
    status: "Completed",
    date: "Sep 2024-Mar 2025",
    isPrivate: false
  },
  {
    id: "qr-attendance",
    title: "QR Code Attendance System",
    description: "QR-based attendance tracking for efficient check-in/check-out management.",
    icon: "📱",
    category: "mobile",
    techStack: ["Android", "QR Codes", "Database"],
    videoUrl: "https://drive.google.com/file/d/1aPWLWykOcmT3baCXQsODnHdzD9BBmy8D/view?usp=sharing",
    thumbnail: "/qr-attendance-video.jpg",
    status: "Completed",
    date: "Grade 12",
    isPrivate: false
  },
  {
    id: "siena-talk",
    title: "SienaTalk",
    description: "Student counselor booking platform with messaging, voice recordings, and admin oversight of interactions.",
    icon: "💬",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase", "Supabase", "Audio Recording", "Provider"],
    videoUrl: "https://drive.google.com/file/d/1k79De75llIF5ULTn8tP2_ae9MHIXACnP/view?usp=sharing",
    thumbnail: "/siena-talk-video.jpg",
    status: "Completed",
    date: "2024-2025",
    isPrivate: false
  },
  {
    id: "eatease",
    title: "Eatease",
    description: "Streamlined food delivery with simplified interface for browsing restaurants and ordering meals.",
    icon: "🍔",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase"],
    videoUrl: "https://drive.google.com/file/d/1k-IPOKgWFu4_3lmtRL3_POEPyifrwL0e/view?usp=sharing",
    thumbnail: "/eatease-video.jpg",
    status: "Completed",
    date: "Nov-Dec 2024",
    isPrivate: false
  },
]

// Helper functions for filtering projects
export const getProjectsByCategory = (category: "hybrid" | "web" | "mobile" | "ai-ml") => {
  return projects.filter(p => p.category === category)
}

export const getCategoryLabel = (category: Project["category"]) => {
  switch (category) {
    case "hybrid":
      return "Hybrid"
    case "web":
      return "Web"
    case "mobile":
      return "Mobile"
    case "ai-ml":
      return "AI"
  }
}

const statusPriority: Record<Project["status"], number> = {
  Production: 0,
  "Active Development": 1,
  Completed: 2,
}

const categoryPriority: Record<Project["category"], number> = {
  hybrid: 0,
  web: 1,
  "ai-ml": 2,
  mobile: 3,
}

export const getSortedProjects = () => {
  return [...projects].sort((a, b) => {
    const featuredDelta = Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured))
    if (featuredDelta !== 0) return featuredDelta

    const featuredRankDelta = (a.featuredRank ?? Number.MAX_SAFE_INTEGER) - (b.featuredRank ?? Number.MAX_SAFE_INTEGER)
    if (featuredRankDelta !== 0) return featuredRankDelta

    const statusDelta = statusPriority[a.status] - statusPriority[b.status]
    if (statusDelta !== 0) return statusDelta

    const categoryDelta = categoryPriority[a.category] - categoryPriority[b.category]
    if (categoryDelta !== 0) return categoryDelta

    return a.title.localeCompare(b.title)
  })
}

export const getFilteredProjects = (category: Project["category"] | "all") => {
  const sortedProjects = getSortedProjects()
  if (category === "all") return sortedProjects
  return sortedProjects.filter(project => project.category === category)
}

export const getFeaturedProjects = () => {
  return getSortedProjects().filter(p => p.isFeatured)
}

export const getPublicProjects = () => {
  return projects.filter(p => !p.isPrivate)
}

export const getProjectsByTech = (tech: string) => {
  return projects.filter(p =>
    p.techStack.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  )
}

export const getProjectsByStatus = (status: Project["status"]) => {
  return projects.filter(p => p.status === status)
}

export const getProjectById = (id: string) => {
  return projects.find(p => p.id === id)
}

// Statistics
export const getProjectStats = () => {
  return {
    total: projects.length,
    hybrid: getProjectsByCategory("hybrid").length,
    web: getProjectsByCategory("web").length,
    mobile: getProjectsByCategory("mobile").length,
    aiMl: getProjectsByCategory("ai-ml").length,
    private: projects.filter(p => p.isPrivate).length,
    public: projects.filter(p => !p.isPrivate).length,
    featured: getFeaturedProjects().length,
    production: getProjectsByStatus("Production").length,
    active: getProjectsByStatus("Active Development").length,
    completed: getProjectsByStatus("Completed").length
  }
}
