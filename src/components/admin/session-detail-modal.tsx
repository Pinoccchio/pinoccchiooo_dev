"use client"

import { useEffect, useState } from "react"
import { User, Copy, Check, Loader2, Download, MessageCircle } from "lucide-react"
import { getSessionMessages, type ChatMessage } from "@/app/actions/admin-data-actions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SessionDetailModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionId: string | null
}

export function SessionDetailModal({ open, onOpenChange, sessionId }: SessionDetailModalProps) {
  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (open && sessionId) {
      loadSession()
    } else {
      // Reset state when modal closes
      setSession(null)
      setMessages([])
      setCopiedId(null)
    }
  }, [open, sessionId])

  const loadSession = async () => {
    if (!sessionId) return

    setLoading(true)
    try {
      const result = await getSessionMessages(sessionId)

      if (result.success && result.data) {
        setSession(result.data.session)
        setMessages(result.data.messages)
      } else {
        alert("Failed to load session")
        onOpenChange(false)
      }
    } catch (error) {
      console.error("Error loading session:", error)
      alert("Error loading session")
      onOpenChange(false)
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
    if (!session || messages.length === 0) return

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 grid grid-rows-[auto_1fr]">
        {/* Fixed Header */}
        <div className="border-b px-8 py-6 pr-16">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl font-bold">Conversation Details</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {session ? `Session ${session.session_id.slice(-12)}` : "Loading..."}
              </DialogDescription>
            </div>
            {session && messages.length > 0 && (
              <Button onClick={exportConversation} variant="outline" size="sm" className="flex-shrink-0">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full py-12">
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
                <p className="text-gray-600 dark:text-gray-400">Loading conversation...</p>
              </div>
            </div>
          ) : session ? (
            <div className="px-8 py-8 space-y-8">
              {/* Session Info Card */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Messages</p>
                    <Badge variant="secondary" className="font-semibold text-sm px-4 py-1.5">
                      {messages.length}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Started</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(session.started_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Last Activity</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(session.last_activity)}
                    </p>
                  </div>
                  {session.visitor_ip && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Visitor IP</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.visitor_ip}
                      </p>
                    </div>
                  )}
                </div>
                {session.user_agent && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">User Agent</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white break-all leading-relaxed">
                      {session.user_agent}
                    </p>
                  </div>
                )}
              </div>

              {/* Messages Section */}
              <div className="border rounded-lg p-8 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
                  Conversation ({messages.length} messages)
                </h3>

                {messages.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={56} />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No messages in this conversation</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {messages.map((message, index) => (
                      <div key={message.id}>
                        <div
                          className={`flex gap-4 ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          <Avatar className="w-11 h-11 flex-shrink-0">
                            {message.role === "assistant" ? (
                              <AvatarImage src="/pinocchio-avatar.png" alt="Pinoccchiooo" />
                            ) : (
                              <AvatarFallback className="bg-blue-500 text-white">
                                <User size={22} />
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
                              className={`flex items-center gap-2 mb-2 ${
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
                                className={`rounded-2xl px-6 py-5 ${
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
                                } opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md ${
                                  message.role === "user"
                                    ? "hover:bg-blue-400/20"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                              >
                                {copiedId === message.id ? (
                                  <Check size={16} className={message.role === "user" ? "text-white" : "text-green-600"} />
                                ) : (
                                  <Copy size={16} className={message.role === "user" ? "text-white/80" : ""} />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Separator between messages */}
                        {index < messages.length - 1 && <Separator className="my-8" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
