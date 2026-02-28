/**
 * Geolocation utility for IP address lookup
 * Uses ip-api.com (free, 15,000 requests/hour, no API key required)
 * Includes in-memory caching to reduce API calls and avoid rate limits
 */

export type GeolocationData = {
  country: string | null
  city: string | null
  region: string | null
  latitude: number | null
  longitude: number | null
  countryCode: string | null
  timezone: string | null
}

// Cache configuration
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours (IP locations rarely change)
const MAX_CACHE_SIZE = 1000 // Maximum number of cached IPs

type CacheEntry = {
  data: GeolocationData
  timestamp: number
}

// In-memory cache for geolocation data
const geolocationCache = new Map<string, CacheEntry>()

/**
 * Clean up expired cache entries
 */
function cleanExpiredCache(): void {
  const now = Date.now()
  for (const [ip, entry] of geolocationCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      geolocationCache.delete(ip)
    }
  }
}

/**
 * Get geolocation data from IP address
 * Results are cached for 24 hours to avoid rate limits
 * @param ip - IP address to lookup
 * @returns Geolocation data or null values if failed
 */
export async function getGeolocationFromIP(ip: string | null): Promise<GeolocationData> {
  // Default response for invalid or missing IP
  const defaultResponse: GeolocationData = {
    country: null,
    city: null,
    region: null,
    latitude: null,
    longitude: null,
    countryCode: null,
    timezone: null,
  }

  // Skip if no IP provided or localhost
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.includes("localhost")) {
    return defaultResponse
  }

  // Check cache first
  const cached = geolocationCache.get(ip)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  try {
    // Call ip-api.com (free service, no API key needed)
    // Rate limit: 45 requests/minute, 15,000/hour
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // Set a timeout of 5 seconds
        signal: AbortSignal.timeout(5000),
      }
    )

    if (!response.ok) {
      return defaultResponse
    }

    const data = await response.json()

    // Check if request was successful
    if (data.status === "fail") {
      return defaultResponse
    }

    // Extract and return location data
    const locationData: GeolocationData = {
      country: data.country || null,
      countryCode: data.countryCode || null,
      city: data.city || null,
      region: data.regionName || data.region || null,
      latitude: typeof data.lat === "number" ? data.lat : null,
      longitude: typeof data.lon === "number" ? data.lon : null,
      timezone: data.timezone || null,
    }

    // Cache the result
    if (geolocationCache.size >= MAX_CACHE_SIZE) {
      cleanExpiredCache()
      // If still at max, remove oldest entry
      if (geolocationCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = geolocationCache.keys().next().value
        if (oldestKey) geolocationCache.delete(oldestKey)
      }
    }
    geolocationCache.set(ip, { data: locationData, timestamp: Date.now() })

    return locationData
  } catch {
    return defaultResponse
  }
}

/**
 * Format location as a readable string
 * @param data - Geolocation data
 * @returns Formatted string like "Manila, Philippines" or "Unknown"
 */
export function formatLocation(data: GeolocationData): string {
  if (data.city && data.country) {
    return `${data.city}, ${data.country}`
  }
  if (data.country) {
    return data.country
  }
  return "Unknown"
}

/**
 * Get Google Maps URL for coordinates
 * @param latitude
 * @param longitude
 * @returns Google Maps URL or null
 */
export function getGoogleMapsUrl(latitude: number | null, longitude: number | null): string | null {
  if (latitude === null || longitude === null) {
    return null
  }
  return `https://www.google.com/maps?q=${latitude},${longitude}`
}

/**
 * Get country flag emoji from country code
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "PH" for Philippines)
 * @returns Flag emoji or empty string
 */
export function getCountryFlagEmoji(countryCode: string | null): string {
  if (!countryCode || countryCode.length !== 2) {
    return ""
  }

  // Convert country code to regional indicator symbols
  // A = 🇦 (U+1F1E6), B = 🇧 (U+1F1E7), etc.
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}
