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
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Gemini AI", "Riverpod", "Turbopack", "Tailwind CSS"],
    status: "Active Development",
    date: "Sep-Oct 2025",
    isPrivate: false,
    isFeatured: true,
    details: "Web: Next.js admin dashboard | Mobile: Flutter customer app | Real client: J.A's Food Trading",
    screenshotCategories: incloudScreenshots
  },
  {
    id: "learnsmart-platform",
    title: "LearnSmart Educational Platform",
    description: "Comprehensive AI-powered educational platform implementing 4 evidence-based study techniques: Active Recall (flashcards with SM-2), Pomodoro (focus tracking), Feynman (teach to learn), and Retrieval Practice (adaptive questions).",
    icon: "🎓",
    category: "hybrid",
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Gemini AI", "Provider", "Chart.js", "PDF Processing"],
    status: "Active Development",
    date: "Aug-Oct 2025",
    isPrivate: true,
    isFeatured: true,
    details: "Web: Admin/instructor platform | Mobile: Student app | 15+ database tables with analytics"
  },
  {
    id: "rribn-system",
    title: "RRIBN Military Management System",
    description: "Army Reserve Reservist Integrated Behavioral Network for Philippine Army Reserve units. Features 4-role RBAC (Super Admin, Admin, Staff, Reservist), company management, training records, PDF reports, and QR identification.",
    icon: "🎖️",
    category: "hybrid",
    techStack: ["Next.js 15", "React 19", "Flutter", "TypeScript", "Supabase", "Firebase FCM", "Provider", "PDF Generation", "QR Codes"],
    status: "Active Development",
    date: "Oct 2025",
    isPrivate: false,
    isFeatured: true,
    details: "Web: Personnel management | Mobile: Reservist app (private) | Government-grade security"
  },
  {
    id: "lawbot-platform",
    title: "LawBot - Cybercrime Reporting Platform",
    description: "AI-powered cybercrime reporting for Philippines with 67+ crime types across 10 categories. Features AI evidence suggestions, credibility meter, pattern detection, and case management for PNP officers.",
    icon: "⚖️",
    category: "hybrid",
    techStack: ["Next.js 15", "React 18", "Flutter", "TypeScript", "Supabase", "Firebase", "Gemini 2.0", "Provider", "Vite"],
    mobileVideoUrl: "https://drive.google.com/file/d/1RI2vOHHE83skJAbINl0fJ0z9cTaPDRr7/view?usp=sharing",
    videoUrl: "https://drive.google.com/file/d/1RI2vOHHE83skJAbINl0fJ0z9cTaPDRr7/view?usp=sharing",
    demoUrl: "https://drive.google.com/file/d/1Qy48z_Ve36DWUHewRYai2nDU8IiCrrr0/view?usp=sharing",
    status: "Production",
    date: "Jun-Sep 2025",
    isPrivate: false,
    isFeatured: true,
    details: "Mobile: Citizen reporting | Web: PNP officer dashboard | Alternative: React/Vite version"
  },

  // ==================== AI & ML PROJECTS ====================
  {
    id: "mci-detection-system",
    title: "MCI Detection System",
    description: "Full-stack medical AI application for early Alzheimer's detection through hippocampal MRI analysis. Achieves 80.77% accuracy using Gradient Boosting on 26 volumetric features extracted from 1,213 NIfTI brain scans.",
    icon: "🧠",
    category: "ai-ml",
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
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Gemini AI", "Recharts", "PDF Processing", "Tailwind CSS"],
    // No githubUrl - private project showcased via screenshots only
    status: "Active Development",
    date: "Feb 2026 - Present",
    isPrivate: true,
    isFeatured: true,
    details: "Real client: Municipality of Asuncion, Davao del Norte | 4-role RBAC | AI ensemble ranking | PDS wizard | Training certificates",
    screenshotCategories: jobsyncScreenshots
  },
  {
    id: "e-reserve-v1",
    title: "E-Reserve System v1",
    description: "Enhanced venue reservation platform with dual maps (Google Maps + Leaflet), calendar, 3D visualization, and PDF reports for Libmanan LGU.",
    icon: "🏢",
    category: "web",
    techStack: ["Next.js 15", "React 18", "TypeScript", "Supabase", "Gemini AI", "OpenAI", "Google Maps", "Leaflet", "Three.js"],
    demoUrl: "https://e-reserve-web-based-system-v1.vercel.app/",
    status: "Production",
    date: "Feb-Apr 2025",
    isPrivate: false
  },
  {
    id: "mhealth-web",
    title: "MHealth Web App",
    description: "Healthcare management with multi-channel notifications (Email + SMS), Excel export, and health analytics.",
    icon: "🏥",
    category: "web",
    techStack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Firebase", "Twilio", "Nodemailer", "Recharts"],
    demoUrl: "https://mhealth-web-app-nine.vercel.app/",
    status: "Production",
    date: "Feb 2025",
    isPrivate: false
  },
  {
    id: "procurement-system",
    title: "Procurement Management System",
    description: "Business procurement tracking with email notifications, form validation, and monitoring features.",
    icon: "📊",
    category: "web",
    techStack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Resend", "Radix UI", "Framer Motion"],
    demoUrl: "https://www.procurement-ms.com/",
    status: "Production",
    date: "Jan-Feb 2025",
    isPrivate: false
  },
  {
    id: "nfc-card",
    title: "NFC Card Website",
    description: "NFC card management and digital business card platform with theme support.",
    icon: "📇",
    category: "web",
    techStack: ["Next.js 14", "React 18", "TypeScript", "Supabase", "Radix UI", "Tailwind CSS"],
    status: "Completed",
    date: "Apr 2025",
    isPrivate: false
  },
  {
    id: "v0-hci",
    title: "v0 HCI Control Systems",
    description: "Human-Computer Interaction midterm project for control systems interface design with comprehensive UI components.",
    icon: "🎛️",
    category: "web",
    techStack: ["Next.js 14", "React 18", "TypeScript", "Radix UI", "Recharts", "Tailwind CSS"],
    status: "Completed",
    date: "Sep-Oct 2025",
    isPrivate: true
  },
  {
    id: "hash-table-simulator",
    title: "Hash Table Simulator",
    description: "Interactive educational tool for visualizing hash table collision resolution (Linear Probing & Double Hashing).",
    icon: "🔢",
    category: "web",
    techStack: ["Flutter Web", "Dart", "Provider", "Material Design 3"],
    status: "Completed",
    date: "May 2025",
    isPrivate: false
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
  {
    id: "siena-talk-v2",
    title: "SienaTalk",
    description: "Enhanced student counselor communication platform with improved messaging and scheduling features.",
    icon: "💬",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase", "Supabase"],
    status: "Completed",
    date: "Dec 2024-Jan 2025",
    isPrivate: false
  },
  {
    id: "hotourist",
    title: "Hotourist",
    description: "Tourism and hospitality app for exploring destinations and booking accommodations.",
    icon: "🏖️",
    category: "mobile",
    techStack: ["Flutter", "Dart", "Firebase"],
    status: "Completed",
    date: "Jan-Mar 2024",
    isPrivate: false
  },
  {
    id: "sign-language-v2",
    title: "Sign Language App v2",
    description: "Enhanced sign language recognition with improved gesture detection accuracy.",
    icon: "👐",
    category: "mobile",
    techStack: ["Android Native", "OpenCV", "Java"],
    status: "Completed",
    date: "Mar 2024",
    isPrivate: false
  },
  {
    id: "isda-aqua-gen-tech",
    title: "IsdaAquaGenTech",
    description: "Aquaculture and fisheries management platform for sustainable aquatic farming operations.",
    icon: "🐟",
    category: "mobile",
    techStack: ["Technology TBD", "Environmental Monitoring"],
    status: "Active Development",
    date: "Dec 2024-Apr 2025",
    isPrivate: false
  },
]

// Helper functions for filtering projects
export const getProjectsByCategory = (category: "hybrid" | "web" | "mobile" | "ai-ml") => {
  return projects.filter(p => p.category === category)
}

export const getFeaturedProjects = () => {
  return projects.filter(p => p.isFeatured)
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
