"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { createServerClient } from "@/lib/supabase/server"
import { getGeolocationFromIP } from "@/lib/geolocation"
import { z } from "zod"
import { CHATBOT_SYSTEM_PROMPT } from "@/data/chatbot-system-prompt"
import { CONTACT } from "@/data/contact"

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(10000),
})

const chatInputSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(100),
  sessionId: z.string().min(1).max(100),
  visitorInfo: z
    .object({
      ip: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
})

export async function chatWithPinocchio(
  messages: { role: string; content: string }[],
  sessionId: string,
  visitorInfo?: { ip?: string; userAgent?: string }
) {
  // Validate input
  const validationResult = chatInputSchema.safeParse({
    messages,
    sessionId,
    visitorInfo,
  })

  if (!validationResult.success) {
    return "Sorry, there was an issue with your message. Please try again."
  }

  const validatedData = validationResult.data

  try {
    const supabase = await createServerClient()

    // Ensure chat session exists in database
    const { data: existingSession } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("session_id", validatedData.sessionId)
      .single()

    let dbSessionId: string

    if (!existingSession) {
      // Get geolocation data from IP
      const locationData = await getGeolocationFromIP(validatedData.visitorInfo?.ip || null)

      // Create new session with IP and geolocation data
      const { data: newSession, error: sessionError } = await supabase
        .from("chat_sessions")
        .insert({
          session_id: validatedData.sessionId,
          visitor_ip: validatedData.visitorInfo?.ip,
          user_agent: validatedData.visitorInfo?.userAgent,
          visitor_country: locationData.country,
          visitor_country_code: locationData.countryCode,
          visitor_city: locationData.city,
          visitor_region: locationData.region,
          visitor_latitude: locationData.latitude,
          visitor_longitude: locationData.longitude,
        })
        .select("id")
        .single()

      if (sessionError || !newSession) {
        throw new Error("Failed to create session")
      }

      dbSessionId = newSession.id
    } else {
      dbSessionId = existingSession.id

      // Update last activity
      await supabase
        .from("chat_sessions")
        .update({ last_activity: new Date().toISOString() })
        .eq("id", dbSessionId)
    }

    // Initialize the Google Generative AI with your API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured")
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Get the generative model (Gemini)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    // Convert messages to proper format for Gemini
    const chatHistory: { role: string; parts: { text: string }[] }[] = []

    // Add system message
    chatHistory.push({
      role: "user",
      parts: [{ text: CHATBOT_SYSTEM_PROMPT }],
    })

    chatHistory.push({
      role: "model",
      parts: [
        {
          text: "I understand! I'm Jan Miko (Pinoccchiooo), and I'll provide detailed, helpful responses about my projects and experience. I'll always mention my Facebook as the primary contact since I'm most active there.",
        },
      ],
    })

    // Add conversation history
    validatedData.messages.forEach((message, index) => {
      // Skip the first message if it's just a greeting to avoid duplication
      if (
        index === 0 &&
        (message.content.toLowerCase().includes("hi") || message.content.toLowerCase().includes("hello"))
      ) {
        return
      }

      chatHistory.push({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })
    })

    // Get the latest user message
    const latestMessage = validatedData.messages[validatedData.messages.length - 1]

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory.slice(0, -1), // All messages except the latest
    })

    // Send the latest message
    const result = await chat.sendMessage(latestMessage.content)
    const response = await result.response
    const text = response.text()

    // Save user message and assistant response to database
    try {
      const messagesToSave = [
        {
          session_id: dbSessionId,
          role: "user",
          content: latestMessage.content,
        },
        {
          session_id: dbSessionId,
          role: "assistant",
          content: text,
        },
      ]

      await supabase.from("chat_messages").insert(messagesToSave)
    } catch {
      // Silently continue if saving fails - don't break the chat experience
    }

    return text
  } catch {
    return `Sorry, I'm having trouble connecting right now. Please try again later. You can always reach me directly on Facebook at ${CONTACT.social.facebook} where I'm most active!`
  }
}
