"use client"

import { useState, useRef, FormEvent } from "react"
import { X, Lock, User, Loader2, Eye, EyeOff } from "lucide-react"
import { loginAdmin } from "@/app/actions/admin-auth-actions"
import { useRouter } from "next/navigation"
import { useTheme } from "./theme-provider"

type AdminLoginDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function AdminLoginDialog({ isOpen, onClose }: AdminLoginDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { theme } = useTheme()

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!formRef.current) return

      const formData = new FormData(formRef.current)
      const result = await loginAdmin(formData)

      if (result.success) {
        // Redirect to admin dashboard
        router.push("/admin")
        onClose()
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setEmail("")
      setPassword("")
      setError("")
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md mx-4 p-6 rounded-lg shadow-2xl ${
          theme === "dark" ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
            theme === "dark"
              ? "hover:bg-gray-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            <Lock className={theme === "dark" ? "text-blue-400" : "text-blue-600"} size={24} />
          </div>
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Admin Access</h2>
          <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Enter your credentials to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className={theme === "dark" ? "text-gray-500" : "text-gray-400"} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="admin@pinoccchiooo.dev"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className={theme === "dark" ? "text-gray-500" : "text-gray-400"} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className={`w-full pl-10 pr-12 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : theme === "dark" ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className={`w-full py-2.5 px-4 rounded-md font-medium transition-all flex items-center justify-center ${
              isLoading || !email || !password
                ? theme === "dark"
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                : theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className={`text-xs text-center mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  )
}
