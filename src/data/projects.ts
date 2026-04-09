// Complete Project Database - All 66 Total Repositories
// Comprehensive portfolio including hybrid systems, web apps, mobile apps, AI/ML projects, educational tools, and utilities
// Generated from GitHub repository analysis + COMPLETE_PROJECT_PORTFOLIO_GUIDE.md

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
  details?: string
  screenshots?: string[]     // Simple array of screenshot paths
  screenshotCategories?: ScreenshotCategory[]  // Categorized screenshots with titles
}

export const projects: Project[] = [
  // ==================== HYBRID SYSTEMS (4 Major Platforms) ====================
  {
    id: "incloud-system",
    title: "InCloud System",
    description: "Complete cloud-based inventory management system for J.A's Food Trading, a frozen food distributor. Features multi-tier pricing, real-time sync, AI analytics, Excel import/export, QR codes, and alert systems.",
    icon: "📦",
    category: "hybrid",
    engagementType: "Client",
    sector: "Business",
    platformSummary: "Web + Mobile",
    impactTags: ["Client Work", "Inventory", "AI-enabled"],
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Gemini AI", "Riverpod", "Turbopack", "Tailwind CSS"],
    status: "Active Development",
    date: "Sep-Oct 2025",
    isPrivate: false,
    isFeatured: true,
    details: "Web: Next.js admin dashboard | Mobile: Flutter customer app | Real client: J.A's Food Trading",
    screenshotCategories: incloudScreenshots
  },
  {
    id: "rribn-system",
    title: "RRIBN Military Management System",
    description: "Army Reserve Reservist Integrated Behavioral Network for Philippine Army Reserve units. Features 4-role RBAC (Super Admin, Admin, Staff, Reservist), company management, training records, PDF reports, and QR identification.",
    icon: "🎖️",
    category: "hybrid",
    engagementType: "Client",
    sector: "Government",
    platformSummary: "Web + Mobile",
    impactTags: ["Government", "RBAC", "Security-focused"],
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Firebase FCM", "Provider", "PDF Generation", "QR Codes"],
    status: "Active Development",
    date: "Oct 2025",
    isPrivate: false,
    isFeatured: true,
    details: "Web: Personnel management | Mobile: Reservist app (private) | Government-grade security"
  },
  // ==================== AI & ML PROJECTS ====================
  {
    id: "mci-detection-system",
    title: "MCI Detection System",
    description: "Full-stack medical AI application for early Alzheimer's detection through hippocampal MRI analysis. Achieves 80.77% accuracy using Gradient Boosting on 26 volumetric features extracted from 1,213 NIfTI brain scans.",
    icon: "🧠",
    category: "ai-ml",
    engagementType: "Freelance",
    sector: "Healthcare",
    platformSummary: "Web + ML Backend",
    impactTags: ["Healthcare", "Private", "AI-enabled"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Python", "FastAPI", "PyTorch", "Supabase", "Tailwind CSS", "NIfTI"],
    // No GitHub link - showcased via screenshots only (private freelance project)
    status: "Active Development",
    date: "Jan-Jun 2026",
    isPrivate: true,
    isFeatured: true,
    details: "Freelance project (₱45K) | ML Backend + Web Dashboard | HIPAA-compliant patient management",
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
        description: "HIPAA-compliant patient records and information",
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
    description: "AI-powered road passability classification for Philippine disaster response using EfficientNet-B0 CNN. Achieves 78.4% accuracy on US flood data with ~2-3s processing. Features 3-class classification (Passable, Limited, Impassable), interactive Leaflet maps, vehicle recommendations, and safety-enhanced predictions for NDRRMC/DPWH/LGU-DRRMO command centers.",
    icon: "🛸",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Government",
    platformSummary: "Web + ML",
    impactTags: ["Disaster Response", "Research", "AI-enabled"],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Python", "FastAPI", "PyTorch", "EfficientNet-B0", "ONNX Runtime", "OpenCV", "Leaflet Maps", "Tailwind CSS"],
    status: "Completed",
    date: "2025",
    isPrivate: false,
    isFeatured: true,
    details: "PLM BSEcE Capstone 2025 | Trained on RescueNet + FloodNet (4,892 images) | Safety-enhanced predictions",
    screenshotCategories: uavScreenshots
  },
  {
    id: "fyllens",
    title: "Fyllens - Plant Health Detection",
    description: "AI-powered Flutter app for plant nutrient deficiency and disease identification. Uses 4 TensorFlow Lite models for Rice, Corn, Okra, and Cucumber analysis with Google Gemini AI for enhanced diagnosis. Features real-time camera scanning, AI chat assistant, scan history tracking, comprehensive plant library with offline support, and detailed treatment recommendations.",
    icon: "🌿",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Agriculture",
    platformSummary: "Mobile AI App",
    impactTags: ["TensorFlow Lite", "Offline-ready", "Team Project"],
    techStack: ["Flutter", "Dart", "TensorFlow Lite", "Gemini AI", "Supabase", "Provider", "GoRouter", "Image Processing"],
    status: "Completed",
    date: "2025",
    isPrivate: false,
    isFeatured: true,
    details: "APPDEV Final Project | 4 ML models | 6-person team | Jan Miko A. Guevarra - Backend Developer",
    screenshotCategories: fyllensScreenshots
  },
  {
    id: "aezzy-grammar",
    title: "A'ezzy Grammar Correction",
    description: "AI-powered grammar correction and text improvement tool. Uses Gemini 2.5 Flash Lite to detect and fix grammar, spelling, punctuation, and style issues with detailed explanations. Built as a research project for CASAP Grade 11 students.",
    icon: "📝",
    category: "ai-ml",
    engagementType: "Academic",
    sector: "Education",
    platformSummary: "Web App",
    impactTags: ["Production", "AI-enabled", "Student Research"],
    techStack: ["Next.js 14", "TypeScript", "Gemini AI", "Radix UI", "Tailwind CSS"],
    demoUrl: "https://aezzy-grammar-corrector.vercel.app/",
    status: "Production",
    date: "Mar 2025",
    isPrivate: false,
    details: "Research project | CASAP Grade 11 | Gemini 2.5 Flash Lite | Real-time corrections",
    screenshotCategories: aezzyScreenshots
  },

  // ==================== WEB PROJECTS (7) ====================
  {
    id: "healthcard-go",
    title: "HealthCardGo",
    description: "Production-grade Healthcare Appointment Management and Disease Surveillance System for Panabo City Health Office. Features 5-stage appointment workflow, SARIMA time-series forecasting, Leaflet geographic heatmaps, and real-time Supabase subscriptions across 41+ barangays.",
    icon: "🏥",
    category: "web",
    engagementType: "Client",
    sector: "Healthcare",
    platformSummary: "Web Platform",
    impactTags: ["Client Work", "Healthcare", "Forecasting"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "TanStack Query", "Chart.js", "Leaflet", "ARIMA", "Tailwind CSS"],
    // No githubUrl - private project showcased via screenshots only
    status: "Active Development",
    date: "Nov 2025 - Present",
    isPrivate: true,
    isFeatured: true,
    details: "Real client: City Health Office of Panabo City, Davao del Norte | 5-role RBAC | SARIMA forecasting | Real-time notifications",
    screenshotCategories: healthcardScreenshots
  },
  {
    id: "jobsync",
    title: "JobSync",
    description: "AI-powered Job Matching and Applicant Ranking System for Municipality of Asuncion. Features intelligent applicant ranking using Gemini 1.5 Pro with 3 ensemble scoring algorithms, multi-role RBAC (Admin/HR/PESO/Applicant), comprehensive PDS management, training program enrollment, and certificate generation.",
    icon: "💼",
    category: "web",
    engagementType: "Client",
    sector: "Government",
    platformSummary: "Web Platform",
    impactTags: ["Client Work", "Government", "AI-enabled"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Gemini AI", "Recharts", "PDF Processing", "Tailwind CSS"],
    // No githubUrl - private project showcased via screenshots only
    status: "Active Development",
    date: "Feb 2026 - Present",
    isPrivate: true,
    isFeatured: true,
    details: "Real client: Municipality of Asuncion, Davao del Norte | 4-role RBAC | AI ensemble ranking | PDS wizard | Training certificates",
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
    status: "Completed",
    date: "May 2024",
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
    status: "Completed",
    date: "2025",
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
    status: "Completed",
    date: "2024",
    isPrivate: false
  },
  {
    id: "siena-talk",
    title: "SienaTalk V1",
    description: "Student counselor booking platform with messaging, voice recordings, and admin oversight of interactions.",
    icon: "💬",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase", "Supabase", "Audio Recording", "Provider"],
    videoUrl: "https://drive.google.com/file/d/1k79De75llIF5ULTn8tP2_ae9MHIXACnP/view?usp=sharing",
    status: "Completed",
    date: "Apr 2025",
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
