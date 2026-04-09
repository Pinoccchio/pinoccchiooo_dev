"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Maximize2, MessageSquareText, Minimize2, Send, X } from "lucide-react"
import { chatWithPinocchio } from "@/app/actions/chat-action"
import { CONTACT } from "@/data/contact"
import { useTheme } from "./theme-provider"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi there! I'm ${CONTACT.name.full}. How can I help you today?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [isMinimized, isOpen])

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.style.height = "auto"
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
  }, [input])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const chatHistory = [...messages, userMessage]
      const response = await chatWithPinocchio(chatHistory)
      setMessages(prev => [...prev, { role: "assistant", content: response }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(current => !current)
    setIsMinimized(false)
  }

  const launcherClassName =
    "fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface-primary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-colors hover:bg-[var(--surface-secondary)] md:bottom-6 md:right-6"

  const panelClassName = `fixed bottom-4 right-4 z-50 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-[0_20px_48px_rgba(0,0,0,0.12)] transition-all duration-200 md:bottom-6 md:right-6 ${
    isMinimized
      ? "h-[76px] w-[300px] sm:w-[320px]"
      : "h-[min(78vh,640px)] w-[calc(100vw-2rem)] max-w-[440px] sm:w-[420px]"
  }`

  const secondarySurfaceClassName =
    theme === "dark" ? "bg-[var(--surface-secondary)]" : "bg-[var(--surface-secondary)]"

  return (
    <>
      {!isOpen && (
        <button onClick={toggleChat} className={launcherClassName} aria-label="Open chat">
          <MessageSquareText size={18} />
          Ask Jan Miko
        </button>
      )}

      {isOpen && (
        <div className={panelClassName}>
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between border-b border-[var(--border)] px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface-secondary)]">
                  <Image
                    src="/pinocchio-avatar.png"
                    alt={`${CONTACT.name.full} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--text-primary)]">
                    {CONTACT.name.full}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Ask about projects, stack, and contact details
                  </div>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsMinimized(current => !current)}
                  className="border border-[var(--border)] bg-[var(--surface-secondary)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)]"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={toggleChat}
                  className="border border-[var(--border)] bg-[var(--surface-secondary)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)]"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className={`flex-1 overflow-y-auto px-4 py-4 ${secondarySurfaceClassName}`}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[88%] border px-3.5 py-3 text-sm leading-7 ${
                            message.role === "user"
                              ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--surface-primary)]"
                              : "border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-primary)]"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="border border-[var(--border)] bg-[var(--surface-primary)] px-3.5 py-3 text-sm text-[var(--text-secondary)]">
                          Thinking...
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-[var(--border)] bg-[var(--surface-primary)] p-4">
                  <div className="border border-[var(--border)] bg-[var(--surface-secondary)]">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={event => setInput(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="min-h-[52px] w-full resize-none border-0 bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                      rows={1}
                      disabled={isLoading}
                    />
                    <div className="flex items-center justify-between border-t border-[var(--border)] px-3 py-2">
                      <div className="text-xs text-[var(--text-muted)]">Press Enter to send</div>
                      <button
                        type="button"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-medium transition-colors ${
                          input.trim() && !isLoading
                            ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--surface-primary)] hover:opacity-90"
                            : "cursor-not-allowed border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-muted)]"
                        }`}
                        aria-label="Send message"
                      >
                        <Send size={14} />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
