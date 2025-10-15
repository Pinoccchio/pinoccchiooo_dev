"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { isAuthenticated } from "./admin-auth-actions"

/**
 * Server-side logging utility for terminal output
 * All logs will appear in the terminal where `npm run dev` is running
 */
function log(functionName: string, level: "INFO" | "WARN" | "ERROR" | "SUCCESS", message: string, data?: any) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19)
  const prefix = `[${timestamp}] [${functionName}] [${level}]`

  if (data) {
    console.log(`${prefix} ${message}`, data)
  } else {
    console.log(`${prefix} ${message}`)
  }
}

export type ChatSession = {
  id: string
  session_id: string
  visitor_ip: string | null
  user_agent: string | null
  started_at: string
  last_activity: string
  message_count: number
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

/**
 * Get all chat sessions with message counts
 */
export async function getAllChatSessions(limit = 50, offset = 0) {
  const functionName = "getAllChatSessions"

  try {
    log(functionName, "INFO", `Fetching chat sessions (limit: ${limit}, offset: ${offset})`)

    // Verify user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const supabase = createAdminClient()

    // Get sessions with message counts
    log(functionName, "INFO", "Querying chat_sessions table with message counts")
    const { data: sessions, error } = await supabase
      .from("chat_sessions")
      .select(
        `
        id,
        session_id,
        visitor_ip,
        user_agent,
        started_at,
        last_activity,
        chat_messages(count)
      `
      )
      .order("last_activity", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      log(functionName, "ERROR", "Failed to fetch sessions", { error, code: error.code, message: error.message })
      return { success: false, error: "Failed to fetch sessions" }
    }

    // Format the data
    const formattedSessions: ChatSession[] = sessions.map((session: any) => ({
      id: session.id,
      session_id: session.session_id,
      visitor_ip: session.visitor_ip,
      user_agent: session.user_agent,
      started_at: session.started_at,
      last_activity: session.last_activity,
      message_count: session.chat_messages[0]?.count || 0,
    }))

    log(functionName, "SUCCESS", `Fetched ${formattedSessions.length} chat sessions`)
    return { success: true, data: formattedSessions }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error in getAllChatSessions", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Get messages for a specific session
 */
export async function getSessionMessages(sessionId: string) {
  const functionName = "getSessionMessages"

  try {
    log(functionName, "INFO", `Fetching messages for session ID: ${sessionId}`)

    // Verify user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const supabase = createAdminClient()

    // Get session details
    log(functionName, "INFO", "Querying chat_sessions table")
    const { data: session, error: sessionError } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("id", sessionId)
      .single()

    if (sessionError || !session) {
      log(functionName, "ERROR", "Session not found", { sessionId, error: sessionError })
      return { success: false, error: "Session not found" }
    }

    log(functionName, "SUCCESS", "Session found", { session_id: session.session_id })

    // Get messages for this session
    log(functionName, "INFO", "Fetching messages from chat_messages table")
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })

    if (messagesError) {
      log(functionName, "ERROR", "Failed to fetch messages", { error: messagesError, code: messagesError.code })
      return { success: false, error: "Failed to fetch messages" }
    }

    log(functionName, "SUCCESS", `Fetched ${messages.length} messages for session`)
    return {
      success: true,
      data: {
        session,
        messages: messages as ChatMessage[],
      },
    }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error in getSessionMessages", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  const functionName = "getDashboardStats"

  try {
    log(functionName, "INFO", "Fetching dashboard statistics")

    // Verify user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const supabase = createAdminClient()

    // Get total sessions
    log(functionName, "INFO", "Querying total sessions count")
    const { count: totalSessions } = await supabase
      .from("chat_sessions")
      .select("*", { count: "exact", head: true })
    log(functionName, "INFO", `Total sessions: ${totalSessions || 0}`)

    // Get total messages
    log(functionName, "INFO", "Querying total messages count")
    const { count: totalMessages } = await supabase
      .from("chat_messages")
      .select("*", { count: "exact", head: true })
    log(functionName, "INFO", `Total messages: ${totalMessages || 0}`)

    // Get sessions from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    log(functionName, "INFO", `Querying today's sessions (since ${today.toISOString()})`)
    const { count: todaySessions } = await supabase
      .from("chat_sessions")
      .select("*", { count: "exact", head: true })
      .gte("started_at", today.toISOString())
    log(functionName, "INFO", `Today's sessions: ${todaySessions || 0}`)

    // Get average messages per session
    const avgMessages = totalSessions && totalSessions > 0 ? Math.round((totalMessages || 0) / totalSessions) : 0
    log(functionName, "INFO", `Average messages per session: ${avgMessages}`)

    const stats = {
      totalSessions: totalSessions || 0,
      totalMessages: totalMessages || 0,
      todaySessions: todaySessions || 0,
      avgMessages,
    }

    log(functionName, "SUCCESS", "Dashboard stats fetched successfully", stats)
    return {
      success: true,
      data: stats,
    }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error in getDashboardStats", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Delete a chat session and its messages
 */
export async function deleteSession(sessionId: string) {
  const functionName = "deleteSession"

  try {
    log(functionName, "INFO", `Starting delete operation for session ID: ${sessionId}`)

    // Verify user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const supabase = createAdminClient()

    // Delete session (messages will be cascade deleted)
    log(functionName, "INFO", "Deleting session from chat_sessions table (messages will cascade)")
    const { error } = await supabase.from("chat_sessions").delete().eq("id", sessionId)

    if (error) {
      log(functionName, "ERROR", "Failed to delete session", { error, code: error.code, message: error.message, sessionId })
      return { success: false, error: "Failed to delete session" }
    }

    log(functionName, "SUCCESS", `Successfully deleted session ID: ${sessionId}`)
    return { success: true }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error in deleteSession", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Search sessions by message content
 */
export async function searchSessions(query: string) {
  const functionName = "searchSessions"

  try {
    log(functionName, "INFO", `Searching sessions with query: "${query}"`)

    // Verify user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const supabase = createAdminClient()

    // Search messages
    log(functionName, "INFO", "Searching chat_messages table for matching content")
    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("session_id")
      .ilike("content", `%${query}%`)

    if (error) {
      log(functionName, "ERROR", "Failed to search messages", { error, code: error.code, message: error.message })
      return { success: false, error: "Failed to search" }
    }

    // Get unique session IDs
    const sessionIds = [...new Set(messages.map((m) => m.session_id))]
    log(functionName, "INFO", `Found ${messages.length} matching messages in ${sessionIds.length} unique sessions`)

    if (sessionIds.length === 0) {
      log(functionName, "SUCCESS", "No sessions found matching search query")
      return { success: true, data: [] }
    }

    // Get session details
    log(functionName, "INFO", `Fetching details for ${sessionIds.length} sessions`)
    const { data: sessions, error: sessionsError } = await supabase
      .from("chat_sessions")
      .select(
        `
        id,
        session_id,
        visitor_ip,
        user_agent,
        started_at,
        last_activity,
        chat_messages(count)
      `
      )
      .in("id", sessionIds)
      .order("last_activity", { ascending: false })

    if (sessionsError) {
      log(functionName, "ERROR", "Failed to fetch sessions", { error: sessionsError, code: sessionsError.code })
      return { success: false, error: "Failed to fetch sessions" }
    }

    // Format the data
    const formattedSessions: ChatSession[] = sessions.map((session: any) => ({
      id: session.id,
      session_id: session.session_id,
      visitor_ip: session.visitor_ip,
      user_agent: session.user_agent,
      started_at: session.started_at,
      last_activity: session.last_activity,
      message_count: session.chat_messages[0]?.count || 0,
    }))

    log(functionName, "SUCCESS", `Search completed: ${formattedSessions.length} sessions found`)
    return { success: true, data: formattedSessions }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error in searchSessions", error)
    return { success: false, error: "An error occurred" }
  }
}
