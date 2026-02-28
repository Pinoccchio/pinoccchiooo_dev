"use client"

import { useEffect, useState } from "react"
import { User, Copy, Check, Download, MessageCircle, MapPin, ExternalLink } from "lucide-react"
import { ModalMessageSkeleton } from "@/components/admin/skeletons"
import { getSessionMessages, type ChatMessage } from "@/app/actions/admin-data-actions"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatLocation, getCountryFlagEmoji, getGoogleMapsUrl } from "@/lib/geolocation"

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
      <DialogContent className="w-[95vw] sm:w-[90vw] max-w-7xl h-[85vh] sm:h-[90vh] p-0 gap-0 grid grid-rows-[auto_1fr]">
        {/* Fixed Header */}
        <div className="border-b px-4 sm:px-6 md:px-8 py-4 sm:py-6 pr-12 sm:pr-16">
          <div className="flex items-start justify-between gap-3 sm:gap-6">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl sm:text-2xl font-bold">Conversation Details</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm mt-1 truncate">
                {session ? `Session ${session.session_id.slice(-12)}` : "Loading..."}
              </DialogDescription>
            </div>
            {session && messages.length > 0 && (
              <Button onClick={exportConversation} variant="outline" size="sm" className="flex-shrink-0">
                <Download size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto">
          {loading ? (
            <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-6">
              {/* Session info skeleton */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 animate-pulse">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Messages skeleton */}
              <div className="border rounded-lg p-6 space-y-6 bg-white dark:bg-gray-900">
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                {[...Array(3)].map((_, i) => (
                  <ModalMessageSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : session ? (
            <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
              {/* Session Info Card */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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

                {/* Location Information */}
                {(session.visitor_city || session.visitor_country) && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-blue-500" />
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.visitor_country_code && (
                            <span className="text-xl">{getCountryFlagEmoji(session.visitor_country_code)}</span>
                          )}
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatLocation({
                              country: session.visitor_country,
                              city: session.visitor_city,
                              region: session.visitor_region,
                              latitude: session.visitor_latitude,
                              longitude: session.visitor_longitude,
                              countryCode: session.visitor_country_code,
                              timezone: null,
                            })}
                          </p>
                        </div>
                        {session.visitor_region && session.visitor_region !== session.visitor_city && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                            {session.visitor_region}
                          </p>
                        )}
                      </div>
                      {session.visitor_latitude && session.visitor_longitude && (
                        <a
                          href={getGoogleMapsUrl(session.visitor_latitude, session.visitor_longitude) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                        >
                          View Map
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {session.user_agent && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">User Agent</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white break-all leading-relaxed">
                      {session.user_agent}
                    </p>
                  </div>
                )}
              </div>

              {/* Messages Section */}
              <div className="border rounded-lg p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
                  Conversation ({messages.length} messages)
                </h3>

                {messages.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 md:py-16">
                    <MessageCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">No messages in this conversation</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6 md:space-y-10">
                    {messages.map((message, index) => (
                      <div key={message.id}>
                        <div
                          className={`flex gap-2 sm:gap-3 md:gap-4 ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0">
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
                              className={`flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap ${
                                message.role === "user" ? "justify-end" : "justify-start"
                              }`}
                            >
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {message.role === "user" ? "Visitor" : "Pinoccchiooo"}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(message.created_at)}
                              </p>
                            </div>

                            <div
                              className={`group relative inline-block max-w-[95%] sm:max-w-[90%] md:max-w-[85%] ${
                                message.role === "user" ? "ml-auto" : "mr-auto"
                              }`}
                            >
                              <div
                                className={`rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 ${
                                  message.role === "user"
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                }`}
                              >
                                <p className="text-xs sm:text-sm whitespace-pre-wrap break-words leading-relaxed">
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
                        {index < messages.length - 1 && <Separator className="my-3 sm:my-5 md:my-8" />}
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
