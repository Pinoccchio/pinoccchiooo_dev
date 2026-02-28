import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://pinoccchiooo.dev"),
  title: {
    default: "Jan Miko Guevarra | Flutter & Next.js Developer",
    template: "%s | Jan Miko Guevarra",
  },
  description:
    "Portfolio of Jan Miko A. Guevarra (Pinoccchiooo), a full-stack developer specializing in Flutter mobile apps and Next.js web applications. 31+ projects including AI-powered systems, government platforms, and enterprise solutions.",
  keywords: [
    "Flutter developer",
    "Next.js developer",
    "Full-stack developer",
    "Mobile app developer",
    "Web developer",
    "Philippines developer",
    "React developer",
    "TypeScript",
    "Supabase",
    "AI integration",
    "Jan Miko Guevarra",
    "Pinoccchiooo",
  ],
  authors: [{ name: "Jan Miko A. Guevarra", url: "https://pinoccchiooo.dev" }],
  creator: "Jan Miko A. Guevarra",
  publisher: "Jan Miko A. Guevarra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pinoccchiooo.dev",
    siteName: "Jan Miko Guevarra - Portfolio",
    title: "Jan Miko Guevarra | Flutter & Next.js Developer",
    description:
      "Full-stack developer specializing in Flutter mobile apps and Next.js web applications. 31+ projects including AI-powered systems and enterprise solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jan Miko Guevarra - Flutter & Next.js Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Miko Guevarra | Flutter & Next.js Developer",
    description:
      "Full-stack developer specializing in Flutter mobile apps and Next.js web applications. 31+ projects.",
    images: ["/og-image.png"],
    creator: "@pinoccchiooo",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  alternates: {
    canonical: "https://pinoccchiooo.dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

