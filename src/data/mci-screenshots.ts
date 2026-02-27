// MCI Detection System Screenshots - Organized by Category
// Each category has a title and array of screenshots

export interface ScreenshotCategory {
  title: string
  description: string
  screenshots: string[]
}

export const mciScreenshots: ScreenshotCategory[] = [
  {
    title: "Landing Page",
    description: "Public-facing marketing pages showcasing the system's capabilities",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 214858.png", // Hero section
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 214915.png", // ML-Powered Analysis features
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215038.png", // How it Works (steps 1-3)
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215057.png", // How it Works (steps 3-5)
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215113.png", // User roles section
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215134.png", // About MCI Detection
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215151.png", // Stats & Technology
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215202.png", // Footer
    ]
  },
  {
    title: "Authentication",
    description: "Secure login, registration, and password recovery flows",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215215.png", // Login modal
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215232.png", // Registration form
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215245.png", // Forgot password
    ]
  },
  {
    title: "Admin Dashboard",
    description: "System overview for administrators with stats and quick actions",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215502.png", // Admin dashboard main
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221346.png", // Clinician dashboard
    ]
  },
  {
    title: "Patient Management",
    description: "HIPAA-compliant patient records and information management",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215514.png", // Patients list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215531.png", // Add new patient form
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215556.png", // Patient details view
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215614.png", // Edit patient form
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215629.png", // Delete patient confirmation
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221400.png", // Patients list (clinician view)
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221413.png", // Patient details expanded
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221451.png", // Patient info
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221512.png", // Patient cases view
    ]
  },
  {
    title: "MRI Scan Management",
    description: "Upload, view, and manage NIfTI brain scan files",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215645.png", // MRI Scans list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215659.png", // T1-weighted scan details
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215718.png", // Delete scan confirmation
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215742.png", // Upload MRI - patient selection
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215804.png", // Upload MRI form
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221524.png", // Scan details
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221540.png", // Scan info
    ]
  },
  {
    title: "MCI Analysis",
    description: "ML-powered analysis workflow for cognitive impairment detection",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215825.png", // Analysis page - start
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222711.png", // Analysis setup
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221603.png", // Analysis results - MCI detected
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220011.png", // Results with brain visualization
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215949.png", // Cognitively Normal result
    ]
  },
  {
    title: "Manual Tracing",
    description: "Hippocampal segmentation review and correction tools",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215904.png", // Mask review & correction
    ]
  },
  {
    title: "Analysis Results",
    description: "Detailed prediction results with confidence scores",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 215921.png", // Analysis results list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221632.png", // Result detail
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221645.png", // Brain visualization
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221658.png", // Confidence scores
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221713.png", // Feature analysis
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221727.png", // Detailed results
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221738.png", // MCI Research Report view
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221751.png", // Report details
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222919.png", // Research report summary
    ]
  },
  {
    title: "Analytics Dashboard",
    description: "Performance metrics, trends, and model statistics",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220027.png", // Analytics main
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220055.png", // Confusion matrix & ROC
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220115.png", // Model discrimination
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220128.png", // Feature importance chart
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220145.png", // Full feature list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222752.png", // Analytics (researcher view)
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222809.png", // Metrics detail
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222823.png", // Trends
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222837.png", // Analysis
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222848.png", // Statistics
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222858.png", // Detailed stats
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222906.png", // More analytics
    ]
  },
  {
    title: "Reports",
    description: "PDF report generation and management",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220240.png", // Reports list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220300.png", // PDF preview page 1
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220326.png", // PDF preview page 2
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220350.png", // MCI Clinical Report PDF
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220411.png", // Clinical report page 2 with disclaimer
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 221615.png", // Reports list (additional view)
    ]
  },
  {
    title: "User Management",
    description: "Role-based access control and user settings",
    screenshots: [
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220431.png", // User Management main page
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220444.png", // Create New User modal
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220501.png", // User Management with filters
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220516.png", // Delete User confirmation
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 220532.png", // Profile settings page
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222646.png", // User management (researcher view)
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222658.png", // User list
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222737.png", // User details
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222930.png", // User settings
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222941.png", // Profile
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 222954.png", // Settings page
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223006.png", // Preferences
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223019.png", // Account
      "/repo_screenshots/mci/Screenshots/Screenshot 2026-02-27 223031.png", // Security
    ]
  }
]

// Helper to get all screenshots as flat array
export const getAllMciScreenshots = (): string[] => {
  return mciScreenshots.flatMap(cat => cat.screenshots)
}

// Helper to get total count
export const getMciScreenshotCount = (): number => {
  return mciScreenshots.reduce((sum, cat) => sum + cat.screenshots.length, 0)
}
