import { NextRequest, NextResponse } from "next/server"

/**
 * API Route to get client IP address from server-side headers
 * This is necessary because browsers cannot access their own IP address
 */
export async function GET(request: NextRequest) {
  try {
    // Try to get IP from various headers (Vercel, Cloudflare, nginx, etc.)
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const cfConnectingIp = request.headers.get("cf-connecting-ip")

    let clientIp: string | null = null

    // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2, ...)
    // We want the first one (the client)
    if (forwardedFor) {
      clientIp = forwardedFor.split(",")[0].trim()
    } else if (realIp) {
      clientIp = realIp
    } else if (cfConnectingIp) {
      clientIp = cfConnectingIp
    }

    // Return IP address or null if not available (localhost/development)
    return NextResponse.json({
      success: true,
      ip: clientIp,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error getting client IP:", error)
    return NextResponse.json(
      {
        success: false,
        ip: null,
        error: "Failed to get IP address",
      },
      { status: 500 }
    )
  }
}
