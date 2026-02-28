"use client"

import { useState, useRef } from "react"
import { Upload, X, Loader2, CheckCircle2, Image as ImageIcon, Trash2 } from "lucide-react"
import { uploadFile, createUpload } from "@/app/actions/admin-upload-actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

type UploadDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type FileWithPreview = {
  file: File
  preview?: string
  id: string
  status: "pending" | "uploading" | "success" | "error"
  error?: string
}

type UploadResult = {
  fileName: string
  success: boolean
  error?: string
}

export function UploadDialog({ open, onOpenChange, onSuccess }: UploadDialogProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploadType, setUploadType] = useState<string>("testimony")
  const [titlePrefix, setTitlePrefix] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>("")
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 🔒 MUTEX PATTERN: Ensure only ONE upload session can run at a time
  const uploadMutexRef = useRef<Promise<void> | null>(null)
  const isSubmittingRef = useRef<boolean>(false)
  const uploadSessionIdRef = useRef<string>("")

  // 📋 PROCESSING TRACKER: Track which files are currently being processed
  // Key format: "filename_uploadtype" (e.g., "image1.jpg_testimony")
  const processingFilesRef = useRef<Set<string>>(new Set())

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesChange(Array.from(e.dataTransfer.files))
    }
  }

  const handleFilesChange = (selectedFiles: File[]) => {
    setError("")

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    const newFiles: FileWithPreview[] = []
    const errors: string[] = []

    selectedFiles.forEach((selectedFile) => {
      // Validate file size
      if (selectedFile.size > maxSize) {
        errors.push(`${selectedFile.name}: File size exceeds 10MB`)
        return
      }

      // Validate file type
      if (!validTypes.includes(selectedFile.type)) {
        errors.push(`${selectedFile.name}: Invalid file type`)
        return
      }

      const fileWithPreview: FileWithPreview = {
        file: selectedFile,
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
        status: "pending",
      }

      // Generate preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileWithPreview.id
                ? { ...f, preview: reader.result as string }
                : f
            )
          )
        }
        reader.readAsDataURL(selectedFile)
      }

      newFiles.push(fileWithPreview)
    })

    if (errors.length > 0) {
      setError(errors.join("; "))
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const clearAllFiles = () => {
    setFiles([])
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 📊 NOTE: Server logs in terminal show detailed upload tracking

    // 🔒 MUTEX GUARD: Ensure only ONE upload session runs at a time
    // If an upload is already in progress, wait for it OR block if it's from a different submission
    if (uploadMutexRef.current !== null) {
      console.warn("⚠️ BLOCKED: Upload mutex locked - another session in progress")
      return
    }

    // 🚨 SUBMISSION GUARD: Double-check with ref
    if (isSubmittingRef.current) {
      console.warn("⚠️ BLOCKED: Submission guard active")
      return
    }

    // Set BOTH guards immediately
    isSubmittingRef.current = true

    // Validation: Check if files are selected
    if (files.length === 0) {
      setError("Please select at least one file")
      isSubmittingRef.current = false
      return
    }

    // Validation: Check uploading state
    if (uploading) {
      console.warn("⚠️ BLOCKED: Upload state active")
      isSubmittingRef.current = false
      return
    }

    // Generate unique session ID
    const sessionId = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    uploadSessionIdRef.current = sessionId

    console.log(`🚀 Starting upload session: ${sessionId} with ${files.length} files`)
    console.log(`📋 Upload type: ${uploadType}`)

    // Create the mutex promise for this session
    const uploadPromise = (async () => {
      setUploading(true)
      setError("")
      setUploadResults([])

      const results: UploadResult[] = []

      try {
        // Process each file sequentially
        for (let i = 0; i < files.length; i++) {
          const fileWithPreview = files[i]
          const file = fileWithPreview.file

          // Create unique processing key: "filename_uploadtype"
          const processingKey = `${file.name}_${uploadType}`

          // CHECK: Is this file already being processed?
          if (processingFilesRef.current.has(processingKey)) {
            console.warn(`⚠️ SKIPPED: ${file.name} already being processed`)
            results.push({
              fileName: file.name,
              success: false,
              error: "File is already being uploaded",
            })
            // Update file status
            setFiles((prev) =>
              prev.map((f) => (f.id === fileWithPreview.id ? { ...f, status: "error", error: "Already processing" } : f))
            )
            continue
          }

          // Mark file as being processed
          processingFilesRef.current.add(processingKey)
          console.log(`📤 [${i + 1}/${files.length}] Processing: ${file.name}`)

          // Update file status to "uploading"
          setFiles((prev) =>
            prev.map((f) => (f.id === fileWithPreview.id ? { ...f, status: "uploading" } : f))
          )

          // Update progress
          setUploadProgress(`Uploading ${i + 1} of ${files.length} files...`)

          try {
            // Step 1: Upload file to storage
            const formData = new FormData()
            formData.append("file", file)

            const uploadResult = await uploadFile(formData)

            if (!uploadResult.success || !uploadResult.data) {
              throw new Error(uploadResult.error || "Storage upload failed")
            }

            // Step 2: Generate title
            let fileTitle: string
            if (titlePrefix.trim()) {
              fileTitle = files.length === 1 ? titlePrefix : `${titlePrefix} - ${i + 1}`
            } else {
              fileTitle = file.name.split(".").slice(0, -1).join(".")
            }

            // Step 3: Create database record
            const createResult = await createUpload({
              upload_type: uploadType,
              title: fileTitle,
              description,
              file_url: uploadResult.data.file_url,
              file_name: uploadResult.data.file_name,
              file_size: uploadResult.data.file_size,
              mime_type: uploadResult.data.mime_type,
              is_visible: true,
            })

            if (!createResult.success) {
              throw new Error(createResult.error || "Database record creation failed")
            }

            // SUCCESS!
            results.push({ fileName: file.name, success: true })
            setFiles((prev) =>
              prev.map((f) => (f.id === fileWithPreview.id ? { ...f, status: "success" } : f))
            )
            console.log(`✅ [${i + 1}/${files.length}] Success: ${file.name}`)
          } catch (err) {
            // ERROR
            const errorMsg = err instanceof Error ? err.message : "Upload failed"
            results.push({ fileName: file.name, success: false, error: errorMsg })
            setFiles((prev) =>
              prev.map((f) => (f.id === fileWithPreview.id ? { ...f, status: "error", error: errorMsg } : f))
            )
            console.error(`❌ [${i + 1}/${files.length}] Failed: ${file.name} - ${errorMsg}`)
          } finally {
            // Always remove from processing set
            processingFilesRef.current.delete(processingKey)
          }
        }

        // Show results
        setUploadResults(results)
        const successCount = results.filter((r) => r.success).length
        const failCount = results.filter((r) => !r.success).length

        console.log(`📊 Upload session ${sessionId} completed: ${successCount} success, ${failCount} failed`)

        if (failCount === 0) {
          // All successful
          onSuccess()
          setTimeout(() => handleClose(), 500)
        } else if (successCount > 0) {
          // Partial success
          setError(`${successCount} uploaded, ${failCount} failed. See details below.`)
          onSuccess()
        } else {
          // All failed
          setError("All uploads failed. Check the errors below.")
        }
      } catch (err) {
        console.error("💥 Bulk upload error:", err)
        setError("An unexpected error occurred")
      } finally {
        setUploading(false)
        setUploadProgress("")
      }
    })()

    // Store the mutex promise
    uploadMutexRef.current = uploadPromise

    // Wait for completion and clean up
    try {
      await uploadPromise
    } finally {
      uploadMutexRef.current = null
      isSubmittingRef.current = false
      console.log(`🔓 Upload session ${sessionId} mutex released`)
    }
  }

  const handleClose = () => {
    // Prevent closing during active upload
    if (uploading || uploadMutexRef.current !== null) {
      console.warn("⚠️ Cannot close dialog during active upload")
      return
    }

    // Clear all state
    setFiles([])
    setTitlePrefix("")
    setDescription("")
    setUploadType("testimony")
    setError("")
    setUploadProgress("")
    setUploadResults([])

    // Clear all refs
    isSubmittingRef.current = false
    uploadSessionIdRef.current = ""
    processingFilesRef.current.clear()

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:w-auto sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload multiple testimonies, payment proofs, or screenshots at once
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" data-uploading={uploading}>
          {/* Fieldset wrapper to disable all form interactions during upload */}
          <fieldset disabled={uploading} className={`space-y-6 ${uploading ? "pointer-events-none opacity-60" : ""}`}>
          {/* File Upload Area */}
          <div>
            <Label>Files {files.length > 0 && `(${files.length} selected)`}</Label>
            <div
              onDragEnter={uploading ? undefined : handleDrag}
              onDragLeave={uploading ? undefined : handleDrag}
              onDragOver={uploading ? undefined : handleDrag}
              onDrop={uploading ? undefined : handleDrop}
              onClick={uploading ? undefined : () => fileInputRef.current?.click()}
              className={`mt-2 border-2 border-dashed rounded-lg p-6 transition-colors ${
                uploading
                  ? "cursor-not-allowed opacity-50"
                  : dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer"
                    : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer"
              }`}
            >
              <div className="text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag & drop or click to upload multiple files
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PNG, JPG, GIF, WebP, PDF (max 10MB each)
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={(e) => e.target.files && handleFilesChange(Array.from(e.target.files))}
              className="hidden"
            />
          </div>

          {/* Selected Files List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Selected Files</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={clearAllFiles}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <Trash2 size={12} className="mr-1" />
                  Clear All
                </Button>
              </div>
              <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2 space-y-2">
                {files.map((fileWithPreview) => {
                  // Determine status color and icon
                  const getStatusColor = () => {
                    switch (fileWithPreview.status) {
                      case "uploading":
                        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      case "success":
                        return "border-green-500 bg-green-50 dark:bg-green-900/20"
                      case "error":
                        return "border-red-500 bg-red-50 dark:bg-red-900/20"
                      default:
                        return "bg-gray-50 dark:bg-gray-800"
                    }
                  }

                  const getStatusIcon = () => {
                    switch (fileWithPreview.status) {
                      case "uploading":
                        return <Loader2 size={16} className="animate-spin text-blue-600" />
                      case "success":
                        return <CheckCircle2 size={16} className="text-green-600" />
                      case "error":
                        return <X size={16} className="text-red-600" />
                      default:
                        return null
                    }
                  }

                  return (
                    <div
                      key={fileWithPreview.id}
                      className={`flex items-center gap-3 p-2 rounded-lg border-2 transition-all ${getStatusColor()}`}
                    >
                      {fileWithPreview.preview ? (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={fileWithPreview.preview}
                            alt={fileWithPreview.file.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                          <ImageIcon size={20} className="text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {fileWithPreview.file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(fileWithPreview.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {fileWithPreview.error && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1 truncate">
                            {fileWithPreview.error}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getStatusIcon()}
                        {fileWithPreview.status === "pending" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(fileWithPreview.id)}
                            disabled={uploading}
                          >
                            <X size={14} />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Upload Type */}
          <div>
            <Label htmlFor="upload-type">Type (applies to all files)</Label>
            <Select value={uploadType} onValueChange={setUploadType} disabled={uploading}>
              <SelectTrigger id="upload-type" className="mt-2" disabled={uploading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="testimony">Testimony</SelectItem>
                <SelectItem value="payment_proof">Payment Proof</SelectItem>
                <SelectItem value="screenshot">Screenshot</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title Prefix */}
          <div>
            <Label htmlFor="title">Title Prefix (optional)</Label>
            <Input
              id="title"
              value={titlePrefix}
              onChange={(e) => setTitlePrefix(e.target.value)}
              placeholder="e.g., Project Screenshots"
              disabled={uploading}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {files.length > 1
                ? "Files will be titled: Prefix - 1, Prefix - 2, etc. If empty, original filenames will be used."
                : "If empty, original filename will be used."}
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (applies to all files)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
              disabled={uploading}
              className="mt-2"
            />
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress && (
            <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={16} />
                <p className="text-sm text-blue-600 dark:text-blue-400">{uploadProgress}</p>
              </div>
            </div>
          )}

          {/* Upload Results */}
          {uploadResults.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {uploadResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md text-sm ${
                    result.success
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {result.success ? (
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={16} className="flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.fileName}</p>
                      {result.error && <p className="text-xs mt-0.5">{result.error}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          </fieldset>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-800 dark:border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="bg-gradient-to-r from-blue-500 to-blue-600"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2" size={16} />
                  Upload {files.length > 0 && `(${files.length})`}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
