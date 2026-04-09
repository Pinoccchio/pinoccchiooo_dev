import type React from "react"
import type { Metadata, Viewport } from "next"
import { Public_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
    default: "Jan Miko A. Guevarra | AI, Software, Web & App Developer",
    template: "%s | Jan Miko A. Guevarra",
  },
  description:
    "Portfolio of Jan Miko A. Guevarra, a software developer building web, mobile, and AI-supported applications through client and freelance projects.",
  keywords: [
    "AI developer",
    "software developer",
    "web developer",
    "app developer",
    "Mobile app developer",
    "Philippines developer",
    "React developer",
    "TypeScript",
    "Supabase",
    "AI integration",
    "Jan Miko A. Guevarra",
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
    siteName: "Jan Miko A. Guevarra - Portfolio",
    title: "Jan Miko A. Guevarra | AI, Software, Web & App Developer",
    description:
      "Software developer building web, mobile, and AI-supported applications through client and freelance projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jan Miko A. Guevarra - AI, Software, Web & App Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Miko A. Guevarra | AI, Software, Web & App Developer",
    description:
      "Software developer building web, mobile, and AI-supported applications through client and freelance projects.",
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
      <body className={`${publicSans.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

