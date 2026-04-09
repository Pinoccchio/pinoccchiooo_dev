"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { z } from "zod"
import { CHATBOT_SYSTEM_PROMPT } from "@/data/chatbot-system-prompt"
import { CONTACT } from "@/data/contact"

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(10000),
})

const chatInputSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(100),
})

export async function chatWithPinocchio(messages: { role: string; content: string }[]) {
  const validationResult = chatInputSchema.safeParse({
    messages,
  })

  if (!validationResult.success) {
    return "Sorry, there was an issue with your message. Please try again."
  }

  const validatedData = validationResult.data

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured")
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    const chatHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [
      {
        role: "user",
        parts: [{ text: CHATBOT_SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand. I'll answer as Jan Miko A. Guevarra and help with projects, experience, and contact details.",
          },
        ],
      },
    ]

    validatedData.messages.forEach((message, index) => {
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

    const latestMessage = validatedData.messages[validatedData.messages.length - 1]

    const chat = model.startChat({
      history: chatHistory.slice(0, -1),
    })

    const result = await chat.sendMessage(latestMessage.content)
    const response = await result.response
    return response.text()
  } catch {
    return `Sorry, I'm having trouble connecting right now. Please try again later. You can always reach me directly on Facebook at ${CONTACT.social.facebook}.`
  }
}
