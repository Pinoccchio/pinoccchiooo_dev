"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type AdminPageContextType = {
  pageTitle: string
  setPageTitle: (title: string) => void
}

const AdminPageContext = createContext<AdminPageContextType | undefined>(undefined)

export function AdminPageProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState("Admin Panel")

  return (
    <AdminPageContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </AdminPageContext.Provider>
  )
}

export function useAdminPage(title?: string) {
  const context = useContext(AdminPageContext)

  if (!context) {
    throw new Error("useAdminPage must be used within AdminPageProvider")
  }

  useEffect(() => {
    if (title) {
      context.setPageTitle(title)
    }
  }, [title, context])

  return context
}
