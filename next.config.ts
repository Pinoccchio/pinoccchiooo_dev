import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    const previews: Record<string, string> = {
      incloud: "incloud-system", healthcardgo: "healthcard-go", jobsync: "jobsync",
      mci: "mci-detection-system", "mci-screen": "mci-detection-system",
      yummify: "yummify", "scan-my-soil": "scan-my-soil", fyllens: "fyllens",
      uav: "uav-flood-assessment", sienatalk: "siena-talk",
    }
    return Object.entries(previews).map(([preview, id]) => ({
      source: `/project-previews/${preview}.html`, destination: `/projects/${id}`, permanent: false,
    }))
  },
}

export default nextConfig
