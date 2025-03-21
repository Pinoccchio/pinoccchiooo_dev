"use client"

import { type FormEvent, useState } from "react"

export function SubscribeForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Subscribing email:", email)
    // Reset form
    setEmail("")
    alert("Thank you for subscribing!")
  }

  return (
    <div className="mt-6 w-full max-w-md">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-r-md hover:bg-blue-500 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

