"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, User, Copy, Check, Loader2, Download } from "lucide-react"
import { getSessionMessages, type ChatMessage } from "@/app/actions/admin-data-actions"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAdminPage } from "@/components/admin/admin-page-context"

export default function SessionDetailPage() {
  useAdminPage("Conversation Details")

  const params = useParams()
  const router = useRouter()
  const sessionId = params.id as string

  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    loadSession()
  }, [sessionId])

  const loadSession = async () => {
    setLoading(true)
    try {
      const result = await getSessionMessages(sessionId)

      if (result.success && result.data) {
        setSession(result.data.session)
        setMessages(result.data.messages)
      } else {
        alert("Failed to load session")
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error loading session:", error)
      alert("Error loading session")
      router.push("/admin")
    } finally {
      setLoading(false)
    }
  }

  const copyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(messageId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportConversation = () => {
    const content = messages
      .map((m) => `[${m.role.toUpperCase()}] ${m.content}`)
      .join("\n\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `conversation-${session.session_id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Session not found</p>
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-2">
            <Link href="/admin">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Conversation Details</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Session {session.session_id.slice(-12)}
          </p>
        </div>
        <Button onClick={exportConversation} variant="outline">
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </div>

      {/* Session Info */}
      <Card>
        <CardHeader>
          <CardTitle>Session Information</CardTitle>
          <CardDescription>Details about this conversation session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Session ID</p>
              <p className="font-mono text-sm font-medium text-gray-900 dark:text-white break-all">
                {session.session_id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Messages</p>
              <Badge variant="secondary" className="font-semibold">
                {messages.length} messages
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Started</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(session.started_at)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Activity</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(session.last_activity)}
              </p>
            </div>
            {session.visitor_ip && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Visitor IP</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {session.visitor_ip}
                </p>
              </div>
            )}
            {session.user_agent && (
              <div className="md:col-span-2 lg:col-span-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">User Agent</p>
                <p className="text-xs font-medium text-gray-900 dark:text-white break-all">
                  {session.user_agent}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation ({messages.length} messages)</CardTitle>
          <CardDescription>Full message history for this session</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] px-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No messages in this conversation</p>
              </div>
            ) : (
              <div className="space-y-6 py-6">
                {messages.map((message, index) => (
                  <div key={message.id}>
                    <div
                      className={`flex gap-4 ${
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        {message.role === "assistant" ? (
                          <AvatarImage src="/pinocchio-avatar.png" alt="Pinoccchiooo" />
                        ) : (
                          <AvatarFallback className="bg-blue-500 text-white">
                            <User size={20} />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      {/* Message Content */}
                      <div
                        className={`flex-1 ${
                          message.role === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-1 ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {message.role === "user" ? "Visitor" : "Pinoccchiooo"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(message.created_at)}
                          </p>
                        </div>

                        <div
                          className={`group relative inline-block max-w-[85%] ${
                            message.role === "user" ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                              {message.content}
                            </p>
                          </div>

                          {/* Copy Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyMessage(message.id, message.content)}
                            className={`absolute top-2 ${
                              message.role === "user" ? "left-2" : "right-2"
                            } opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0`}
                          >
                            {copiedId === message.id ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Separator between messages (except last one) */}
                    {index < messages.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
