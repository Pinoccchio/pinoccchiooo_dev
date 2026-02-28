"use client"

import { useEffect, useState } from "react"
import { MessageCircle, Clock, User, Search, Trash2, TrendingUp, Eye, Loader2 } from "lucide-react"
import { getAllChatSessions, getDashboardStats, deleteSession, type ChatSession } from "@/app/actions/admin-data-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminPage } from "@/components/admin/admin-page-context"
import { DashboardSkeleton } from "@/components/admin/skeletons"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { SessionDetailModal } from "@/components/admin/session-detail-modal"

export default function AdminDashboardPage() {
  useAdminPage("Dashboard")

  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [stats, setStats] = useState({ totalSessions: 0, totalMessages: 0, todaySessions: 0, avgMessages: 0 })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [sessionsResult, statsResult] = await Promise.all([getAllChatSessions(), getDashboardStats()])

      if (sessionsResult.success && sessionsResult.data) {
        setSessions(sessionsResult.data)
      }

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewClick = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setViewModalOpen(true)
  }

  const handleDeleteClick = (sessionId: string) => {
    setSessionToDelete(sessionId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!sessionToDelete) return

    setDeletingId(sessionToDelete)
    const result = await deleteSession(sessionToDelete)

    if (result.success) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete))
      await loadData() // Reload to update stats
      setDeleteDialogOpen(false)
      setSessionToDelete(null)
    } else {
      alert("Failed to delete session")
    }

    setDeletingId(null)
  }

  const filteredSessions = sessions.filter((session) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      session.session_id.toLowerCase().includes(query) ||
      session.visitor_ip?.toLowerCase().includes(query) ||
      session.user_agent?.toLowerCase().includes(query)
    )
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const diffMinutes = Math.floor((endTime - startTime) / (1000 * 60))

    if (diffMinutes < 1) return "< 1 min"
    if (diffMinutes < 60) return `${diffMinutes} min`
    const hours = Math.floor(diffMinutes / 60)
    const mins = diffMinutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor chatbot conversations and visitor interactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Sessions</CardDescription>
              <MessageCircle className="text-blue-500" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSessions}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All time conversations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Messages</CardDescription>
              <TrendingUp className="text-green-500" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Messages exchanged</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Today&apos;s Sessions</CardDescription>
              <Clock className="text-purple-500" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.todaySessions}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Avg Messages</CardDescription>
              <User className="text-orange-500" size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgMessages}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Per session</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Chat Sessions</CardTitle>
              <CardDescription>View and manage visitor conversations</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSessions.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? "No sessions found matching your search" : "No chat sessions yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Visitor IP</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="text-blue-600 dark:text-blue-400" size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              Session {session.session_id.slice(-8)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate md:hidden">
                              {session.visitor_ip || "Unknown IP"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-semibold">
                          {session.message_count}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(session.started_at)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDuration(session.started_at, session.last_activity)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-gray-600 dark:text-gray-400">
                        {session.visitor_ip || "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewClick(session.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            <Eye size={16} className="mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(session.id)}
                            disabled={deletingId === session.id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            {deletingId === session.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <>
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={!!deletingId}
        title="Delete Chat Session"
        description="Are you sure you want to delete this chat session? All messages will be permanently deleted. This action cannot be undone."
      />

      {/* Session Detail Modal */}
      <SessionDetailModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        sessionId={selectedSessionId}
      />
    </div>
  )
}
