"use client"

import { useEffect, useState } from "react"
import { Upload, Eye, EyeOff, Trash2, Edit, Loader2, Plus, Image as ImageIcon, CheckSquare, Square } from "lucide-react"
import {
  getAllUploads,
  toggleUploadVisibility,
  deleteUpload,
  bulkDeleteUploads,
  type AdminUpload,
} from "@/app/actions/admin-upload-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { UploadDialog } from "@/components/admin/upload-dialog"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { ImageLightbox } from "@/components/admin/image-lightbox"
import { useAdminPage } from "@/components/admin/admin-page-context"
import { supabase } from "@/lib/supabase/client"

export default function UploadsPage() {
  useAdminPage("Uploads")

  const [uploads, setUploads] = useState<AdminUpload[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [uploadToDelete, setUploadToDelete] = useState<{ id: string; fileUrl: string } | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<AdminUpload | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)

  // Helper function to deduplicate uploads by ID
  const deduplicateUploads = (uploads: AdminUpload[]): AdminUpload[] => {
    const seen = new Map<string, AdminUpload>()
    uploads.forEach((upload) => {
      if (!seen.has(upload.id)) {
        seen.set(upload.id, upload)
      }
    })
    return Array.from(seen.values())
  }

  useEffect(() => {
    loadUploads()

    // Subscribe to realtime changes for instant UI updates
    // Note: We skip INSERT events to prevent race conditions with manual refresh
    const channel = supabase
      .channel('admin-uploads-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'admin_uploads'
        },
        (payload) => {
          console.log('Realtime change detected:', payload)

          if (payload.eventType === 'INSERT') {
            // Skip INSERT events - handled by manual refresh after upload
            // This prevents duplication from race conditions
            console.log('Skipping INSERT event to prevent duplicates')
            return
          } else if (payload.eventType === 'UPDATE') {
            // Update existing upload in the list with deduplication
            setUploads((prev) => {
              const updated = prev.map((u) =>
                u.id === (payload.new as AdminUpload).id ? payload.new as AdminUpload : u
              )
              return deduplicateUploads(updated)
            })
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted upload from the list
            setUploads((prev) => prev.filter((u) => u.id !== (payload.old as AdminUpload).id))
          }
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadUploads = async () => {
    setLoading(true)
    try {
      const result = await getAllUploads()
      if (result.success && result.data) {
        // Apply deduplication when loading data
        setUploads(deduplicateUploads(result.data))
      }
    } catch (error) {
      console.error("Error loading uploads:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    const result = await toggleUploadVisibility(id, !currentVisibility)
    if (result.success) {
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, is_visible: !currentVisibility } : u))
      )
    }
  }

  const handleDeleteClick = (id: string, fileUrl: string) => {
    setUploadToDelete({ id, fileUrl })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!uploadToDelete) return

    setDeletingId(uploadToDelete.id)
    const result = await deleteUpload(uploadToDelete.id, uploadToDelete.fileUrl)

    if (result.success) {
      setUploads((prev) => prev.filter((u) => u.id !== uploadToDelete.id))
      setDeleteDialogOpen(false)
      setUploadToDelete(null)
    } else {
      // Keep dialog open to show error or retry
      console.error("Failed to delete upload")
    }

    setDeletingId(null)
  }

  const handleImageClick = (upload: AdminUpload) => {
    if (upload.mime_type?.startsWith("image/")) {
      setSelectedImage(upload)
      setLightboxOpen(true)
    }
  }

  const toggleSelectUpload = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredUploads.length) {
      // Deselect all
      setSelectedIds(new Set())
    } else {
      // Select all filtered uploads
      setSelectedIds(new Set(filteredUploads.map((u) => u.id)))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return

    // 📊 NOTE: Check your terminal (npm run dev) for detailed server-side logs
    // You'll see step-by-step progress: storage deletion, database deletion, and any errors

    const uploadsToDelete = uploads
      .filter((u) => selectedIds.has(u.id))
      .map((u) => ({ id: u.id, fileUrl: u.file_url }))

    console.log(`🗑️ Starting bulk delete for ${uploadsToDelete.length} uploads`)

    setBulkDeleting(true)

    const result = await bulkDeleteUploads(uploadsToDelete)

    if (result.success) {
      // Remove deleted uploads from state
      setUploads((prev) => prev.filter((u) => !selectedIds.has(u.id)))
      setSelectedIds(new Set())
    } else {
      console.error("Failed to bulk delete uploads:", result.error)
      alert(`Failed to delete uploads: ${result.error}`)
    }

    setBulkDeleting(false)
  }

  const filteredUploads = uploads.filter((upload) => {
    if (filter === "all") return true
    return upload.upload_type === filter
  })

  const stats = {
    total: uploads.length,
    testimony: uploads.filter((u) => u.upload_type === "testimony").length,
    payment_proof: uploads.filter((u) => u.upload_type === "payment_proof").length,
    screenshot: uploads.filter((u) => u.upload_type === "screenshot").length,
    visible: uploads.filter((u) => u.is_visible).length,
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading uploads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Uploads</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage testimonies, payment proofs, and screenshots
          </p>
        </div>
        <div className="flex gap-2">
          {filteredUploads.length > 0 && (
            <Button
              onClick={toggleSelectAll}
              className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-900 border-2 border-gray-800 dark:border-gray-200"
            >
              {selectedIds.size === filteredUploads.length && filteredUploads.length > 0 ? (
                <>
                  <CheckSquare size={16} className="mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <Square size={16} className="mr-2" />
                  Select All
                </>
              )}
            </Button>
          )}
          <Button onClick={() => setUploadDialogOpen(true)} className="bg-gradient-to-r from-blue-500 to-blue-600">
            <Plus size={16} className="mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <Card className="border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare className="text-blue-600 dark:text-blue-400" size={20} />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedIds.size} item{selectedIds.size !== 1 ? "s" : ""} selected
                </span>
              </div>
              <Button
                onClick={handleBulkDelete}
                disabled={bulkDeleting}
                className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
              >
                {bulkDeleting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2" size={16} />
                    Delete Selected
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Testimonies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.testimony}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Payment Proofs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.payment_proof}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Screenshots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.screenshot}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Visible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.visible}</div>
          </CardContent>
        </Card>
      </div>

      {/* Uploads List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Uploads ({filteredUploads.length})</CardTitle>
          <CardDescription>Gallery of uploaded files</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="mb-6 bg-gray-200 dark:bg-gray-800 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white font-semibold"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="testimony"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white font-semibold"
              >
                Testimonies
              </TabsTrigger>
              <TabsTrigger
                value="payment_proof"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white font-semibold"
              >
                Payment Proofs
              </TabsTrigger>
              <TabsTrigger
                value="screenshot"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white font-semibold"
              >
                Screenshots
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter}>
              {filteredUploads.length === 0 ? (
                <div className="text-center py-12">
                  <Upload className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                  <p className="text-gray-600 dark:text-gray-400">
                    {filter === "all" ? "No uploads yet. Click 'Upload File' to get started." : `No ${filter.replace("_", " ")}s found.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUploads.map((upload) => {
                    // Get type badge color
                    const getTypeBadgeColor = (type: string) => {
                      switch (type) {
                        case "testimony":
                          return "bg-purple-600/90 dark:bg-purple-600/90"
                        case "payment_proof":
                          return "bg-emerald-600/90 dark:bg-emerald-600/90"
                        case "screenshot":
                          return "bg-blue-600/90 dark:bg-blue-600/90"
                        default:
                          return "bg-orange-600/90 dark:bg-orange-600/90"
                      }
                    }

                    const isSelected = selectedIds.has(upload.id)

                    return (
                      <Card
                        key={upload.id}
                        className={`overflow-hidden group hover:shadow-lg transition-shadow ${
                          !upload.is_visible ? "border-2 border-red-300 dark:border-red-800" : ""
                        } ${isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}`}
                      >
                        <div
                          className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden"
                        >
                          {/* Selection Checkbox Overlay */}
                          <div
                            className="absolute top-2 left-2 z-10 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSelectUpload(upload.id)
                            }}
                          >
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                isSelected
                                  ? "bg-blue-600 border-blue-600"
                                  : "bg-white/90 dark:bg-gray-800/90 border-gray-300 dark:border-gray-600 hover:border-blue-500"
                              }`}
                            >
                              {isSelected && (
                                <CheckSquare size={14} className="text-white" strokeWidth={3} />
                              )}
                            </div>
                          </div>

                          {/* Image Area */}
                          <div
                            className="relative w-full h-full cursor-pointer"
                            onClick={() => handleImageClick(upload)}
                          >
                            {upload.mime_type?.startsWith("image/") ? (
                              <Image
                                src={upload.file_url}
                                alt={upload.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                                  !upload.is_visible ? "opacity-50 grayscale" : ""
                                }`}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <ImageIcon className="text-gray-400" size={48} />
                              </div>
                            )}
                          </div>

                          {/* Hidden Overlay */}
                          {!upload.is_visible && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-none">
                              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-xl">
                                HIDDEN
                              </div>
                            </div>
                          )}

                          {/* Badges */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1.5 items-end">
                            <Badge
                              className={`text-xs font-semibold shadow-lg backdrop-blur-sm text-white border-none ${
                                upload.is_visible
                                  ? "bg-green-600/90 dark:bg-green-600/90"
                                  : "bg-red-600/90 dark:bg-red-600/90"
                              }`}
                            >
                              {upload.is_visible ? "Visible" : "Hidden"}
                            </Badge>
                            <Badge
                              className={`text-xs font-semibold shadow-lg backdrop-blur-sm text-white border-none ${getTypeBadgeColor(
                                upload.upload_type
                              )}`}
                            >
                              {upload.upload_type.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {upload.title}
                          </h3>
                          {upload.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                              {upload.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Uploaded {formatDate(upload.uploaded_at)}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleVisibility(upload.id, upload.is_visible)}
                            className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 border-none cursor-pointer"
                            title={upload.is_visible ? "Hide upload" : "Show upload"}
                          >
                            {upload.is_visible ? (
                              <EyeOff size={18} strokeWidth={2.5} className="text-white" />
                            ) : (
                              <Eye size={18} strokeWidth={2.5} className="text-white" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(upload.id, upload.file_url)}
                            disabled={deletingId === upload.id}
                            className="h-9 w-9 p-0 flex items-center justify-center rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-sm hover:shadow-md transition-all duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete upload"
                          >
                            {deletingId === upload.id ? (
                              <Loader2 size={18} strokeWidth={2.5} className="animate-spin text-white" />
                            ) : (
                              <Trash2 size={18} strokeWidth={2.5} className="text-white" />
                            )}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSuccess={loadUploads}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={!!deletingId}
      />

      {/* Image Lightbox */}
      {selectedImage && (
        <ImageLightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          imageUrl={selectedImage.file_url}
          title={selectedImage.title}
          description={selectedImage.description}
          uploadType={selectedImage.upload_type}
          uploadDate={formatDate(selectedImage.uploaded_at)}
          fileName={selectedImage.file_name}
        />
      )}
    </div>
  )
}
