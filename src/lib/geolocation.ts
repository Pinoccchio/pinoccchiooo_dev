/**
 * Geolocation utility for IP address lookup
 * Uses ip-api.com (free, 15,000 requests/hour, no API key required)
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

/**
 * Get geolocation data from IP address
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
    console.log("[Geolocation] Skipping geolocation for localhost/development")
    return defaultResponse
  }

  try {
    console.log(`[Geolocation] Looking up IP: ${ip}`)

    // Call ip-api.com (free service, no API key needed)
    // Rate limit: 45 requests/minute, 15,000/hour
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      // Set a timeout of 5 seconds
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.error(`[Geolocation] API request failed with status: ${response.status}`)
      return defaultResponse
    }

    const data = await response.json()

    // Check if request was successful
    if (data.status === "fail") {
      console.error(`[Geolocation] API returned failure: ${data.message}`)
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

    console.log(`[Geolocation] Success: ${locationData.city}, ${locationData.country}`)
    return locationData
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[Geolocation] Request timeout after 5 seconds")
    } else {
      console.error("[Geolocation] Error fetching geolocation:", error)
    }
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
