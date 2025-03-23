"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { chatWithPinocchio } from "@/app/actions/chat-action"
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
      content: "Hi there! I'm Pinoccchiooo, your friendly developer assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isMinimized])

  // Auto-resize textarea as user types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 100)}px`
    }
  }, [input])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Format all messages for the AI
      const chatHistory = [...messages, userMessage]

      // Get AI response
      const response = await chatWithPinocchio(chatHistory)

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error in chat:", error)
      setMessages((prev) => [
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 ${
            theme === "dark" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed z-50 transition-all duration-300 overflow-hidden
            ${
              isMinimized
                ? "w-[280px] h-14 bottom-4 right-4 md:bottom-6 md:right-6"
                : "w-[90%] sm:w-[350px] md:w-[400px] h-[500px] max-h-[80vh] bottom-4 right-4 md:bottom-6 md:right-6"
            } ${
              theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
            } rounded-lg shadow-xl border`}
        >
          {/* Chat header */}
          <div
            className={`flex items-center justify-between p-3 border-b ${
              theme === "dark" ? "bg-blue-700 border-gray-700" : "bg-blue-500 border-gray-200"
            } text-white`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 relative overflow-hidden rounded-full mr-2 bg-white">
                <Image
                  src="/pinocchio-avatar.png"
                  alt="Pinoccchiooo Bot"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-sm sm:text-base">Pinoccchiooo (Bot)</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={toggleMinimize}
                className={`p-1 rounded ${theme === "dark" ? "hover:bg-blue-800" : "hover:bg-blue-600"}`}
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleChat}
                className={`p-1 rounded ${theme === "dark" ? "hover:bg-blue-800" : "hover:bg-blue-600"}`}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages area */}
              <div
                className={`p-4 h-[calc(100%-110px)] overflow-y-auto ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 relative overflow-hidden rounded-full mr-2 flex-shrink-0 bg-white hidden sm:block">
                        <Image
                          src="/pinocchio-avatar.png"
                          alt="Pinoccchiooo Bot"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm break-words ${
                        message.role === "user"
                          ? theme === "dark"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-blue-500 text-white rounded-tr-none"
                          : theme === "dark"
                            ? "bg-gray-700 text-gray-100 rounded-tl-none"
                            : "bg-gray-200 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 relative overflow-hidden rounded-full ml-2 flex-shrink-0 bg-gray-300 hidden sm:flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-xs">You</span>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="w-8 h-8 relative overflow-hidden rounded-full mr-2 flex-shrink-0 bg-white hidden sm:block">
                      <Image
                        src="/pinocchio-avatar.png"
                        alt="Pinoccchiooo Bot"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl rounded-tl-none ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div className="flex space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            theme === "dark" ? "bg-gray-500" : "bg-gray-400"
                          }`}
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            theme === "dark" ? "bg-gray-500" : "bg-gray-400"
                          }`}
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            theme === "dark" ? "bg-gray-500" : "bg-gray-400"
                          }`}
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div
                className={`p-3 border-t ${
                  theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center rounded-full overflow-hidden shadow-sm border border-gray-300 dark:border-gray-600">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className={`flex-1 py-2 px-4 resize-none focus:outline-none ${
                      theme === "dark"
                        ? "bg-gray-800 text-white placeholder-gray-400"
                        : "bg-white text-gray-900 placeholder-gray-500"
                    } border-none`}
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={`p-2 h-full flex items-center justify-center ${
                      input.trim() && !isLoading
                        ? theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

