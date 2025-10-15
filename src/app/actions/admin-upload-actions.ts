"use server"

import { createServerClient, createAdminClient } from "@/lib/supabase/server"
import { isAuthenticated } from "./admin-auth-actions"

/**
 * Server-side logging utility for terminal output
 * All logs will appear in the terminal where `npm run dev` is running
 */
function log(functionName: string, level: "INFO" | "WARN" | "ERROR" | "SUCCESS", message: string, data?: any) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19)
  const prefix = `[${timestamp}] [${functionName}] [${level}]`

  if (data) {
    console.log(`${prefix} ${message}`, data)
  } else {
    console.log(`${prefix} ${message}`)
  }
}

export type AdminUpload = {
  id: string
  upload_type: "testimony" | "payment_proof" | "screenshot" | "other"
  title: string
  description: string | null
  file_url: string
  file_name: string
  file_size: number | null
  mime_type: string | null
  is_visible: boolean
  uploaded_at: string
  updated_at: string
}

/**
 * Get all uploads with optional filtering
 */
export async function getAllUploads(type?: string) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for SELECT to properly set service_role context
    const supabase = createAdminClient()

    let query = supabase
      .from("admin_uploads")
      .select("*")
      .order("uploaded_at", { ascending: false })

    if (type) {
      query = query.eq("upload_type", type)
    }

    const { data: uploads, error } = await query

    if (error) {
      console.error("Error fetching uploads:", error)
      return { success: false, error: "Failed to fetch uploads" }
    }

    return { success: true, data: uploads as AdminUpload[] }
  } catch (error) {
    console.error("Error in getAllUploads:", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Get upload by ID
 */
export async function getUploadById(id: string) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for SELECT to properly set service_role context
    const supabase = createAdminClient()

    const { data: upload, error } = await supabase
      .from("admin_uploads")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !upload) {
      return { success: false, error: "Upload not found" }
    }

    return { success: true, data: upload as AdminUpload }
  } catch (error) {
    console.error("Error in getUploadById:", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Create new upload record
 */
export async function createUpload(data: {
  upload_type: string
  title: string
  description?: string
  file_url: string
  file_name: string
  file_size?: number
  mime_type?: string
  is_visible?: boolean
}) {
  const functionName = "createUpload"

  try {
    log(functionName, "INFO", `Creating upload record for: ${data.file_name}`, {
      upload_type: data.upload_type,
      title: data.title,
    })

    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for INSERT to properly set service_role context
    const supabase = createAdminClient()

    // Check for duplicate upload (same original file_name and upload_type)
    // This prevents uploading the same file multiple times even if it gets different URLs
    log(functionName, "INFO", `Checking for duplicate upload by filename: ${data.file_name}`)
    const { data: existingUpload } = await supabase
      .from("admin_uploads")
      .select("id, title, upload_type, file_name, uploaded_at")
      .eq("file_name", data.file_name)
      .eq("upload_type", data.upload_type)
      .maybeSingle()

    if (existingUpload) {
      log(functionName, "WARN", `Duplicate upload detected: "${data.file_name}" already exists as ${data.upload_type}`, {
        existing_id: existingUpload.id,
        existing_title: existingUpload.title,
        existing_filename: existingUpload.file_name,
        uploaded_at: existingUpload.uploaded_at,
      })
      return {
        success: false,
        error: `File "${data.file_name}" has already been uploaded as a ${data.upload_type.replace("_", " ")}. Uploaded on ${new Date(existingUpload.uploaded_at).toLocaleDateString()}.`,
      }
    }

    log(functionName, "INFO", "No duplicate found. Inserting new record...")
    const { data: upload, error } = await supabase
      .from("admin_uploads")
      .insert({
        upload_type: data.upload_type,
        title: data.title,
        description: data.description || null,
        file_url: data.file_url,
        file_name: data.file_name,
        file_size: data.file_size || null,
        mime_type: data.mime_type || null,
        is_visible: data.is_visible ?? true,
      })
      .select()
      .single()

    if (error || !upload) {
      log(functionName, "ERROR", "Failed to create upload record", {
        error,
        code: error?.code,
        message: error?.message,
      })

      // Check if error is due to unique constraint violation
      if (error?.code === "23505") {
        return {
          success: false,
          error: "This file has already been uploaded with this type",
        }
      }

      return { success: false, error: `Failed to create upload: ${error?.message || "Unknown error"}` }
    }

    log(functionName, "SUCCESS", `Created upload record with ID: ${upload.id}`, {
      id: upload.id,
      title: upload.title,
      type: upload.upload_type,
    })
    return { success: true, data: upload as AdminUpload }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error during upload creation", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Update upload
 */
export async function updateUpload(
  id: string,
  data: {
    title?: string
    description?: string
    is_visible?: boolean
  }
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for UPDATE to properly set service_role context
    const supabase = createAdminClient()

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.is_visible !== undefined) updateData.is_visible = data.is_visible

    const { data: upload, error } = await supabase
      .from("admin_uploads")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error || !upload) {
      console.error("Error updating upload:", error)
      return { success: false, error: "Failed to update upload" }
    }

    return { success: true, data: upload as AdminUpload }
  } catch (error) {
    console.error("Error in updateUpload:", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Delete upload (also removes file from storage)
 */
export async function deleteUpload(id: string, fileUrl: string) {
  const functionName = "deleteUpload"

  try {
    log(functionName, "INFO", `Starting delete operation for upload ID: ${id}`)

    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for both storage and database operations
    const supabase = createAdminClient()

    // Extract file path from URL
    const urlParts = fileUrl.split("/admin-uploads/")
    if (urlParts.length > 1) {
      const filePath = urlParts[1]
      log(functionName, "INFO", `Deleting file from storage: ${filePath}`)

      // Delete file from storage using admin client
      const { error: storageError } = await supabase.storage
        .from("admin-uploads")
        .remove([filePath])

      if (storageError) {
        log(functionName, "ERROR", "Failed to delete file from storage", storageError)
      } else {
        log(functionName, "SUCCESS", `Deleted file from storage: ${filePath}`)
      }
    }

    // Delete record from database
    log(functionName, "INFO", `Deleting database record for ID: ${id}`)
    const { error } = await supabase
      .from("admin_uploads")
      .delete()
      .eq("id", id)

    if (error) {
      log(functionName, "ERROR", "Database deletion failed", {
        error,
        code: error.code,
        message: error.message,
        id,
      })
      return { success: false, error: `Failed to delete upload: ${error.message}` }
    }

    log(functionName, "SUCCESS", `Successfully deleted upload ID: ${id}`)
    return { success: true }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error during delete", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Toggle upload visibility
 */
export async function toggleUploadVisibility(id: string, isVisible: boolean) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return { success: false, error: "Unauthorized" }
    }

    // Use admin client for UPDATE to properly set service_role context
    const supabase = createAdminClient()

    const { data: upload, error } = await supabase
      .from("admin_uploads")
      .update({ is_visible: isVisible })
      .eq("id", id)
      .select()
      .single()

    if (error || !upload) {
      console.error("Error toggling visibility:", error)
      return { success: false, error: "Failed to update visibility" }
    }

    return { success: true, data: upload as AdminUpload }
  } catch (error) {
    console.error("Error in toggleUploadVisibility:", error)
    return { success: false, error: "An error occurred" }
  }
}

/**
 * Bulk delete uploads (deletes multiple files from storage and database)
 */
export async function bulkDeleteUploads(uploads: { id: string; fileUrl: string }[]) {
  const functionName = "bulkDeleteUploads"

  try {
    log(functionName, "INFO", "Starting bulk delete operation")

    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    if (uploads.length === 0) {
      log(functionName, "WARN", "No uploads provided for deletion")
      return { success: false, error: "No uploads to delete" }
    }

    log(functionName, "INFO", `Total uploads to delete: ${uploads.length}`)
    log(functionName, "INFO", "Upload IDs:", uploads.map((u) => u.id))

    // 🔧 FIX: Use createAdminClient() instead of createServerClient()
    // This ensures proper service_role context for DELETE operations
    const supabase = createAdminClient()

    const filePaths: string[] = []

    // Extract file paths for bulk storage deletion
    for (const upload of uploads) {
      const urlParts = upload.fileUrl.split("/admin-uploads/")
      if (urlParts.length > 1) {
        filePaths.push(urlParts[1])
      }
    }

    log(functionName, "INFO", `Extracted ${filePaths.length} file paths from URLs`)

    // Bulk delete files from storage
    if (filePaths.length > 0) {
      log(functionName, "INFO", "Deleting files from storage...", filePaths)
      const { error: storageError } = await supabase.storage
        .from("admin-uploads")
        .remove(filePaths)

      if (storageError) {
        log(functionName, "ERROR", "Failed to delete files from storage", storageError)
        // Continue with database deletion even if storage deletion fails
      } else {
        log(functionName, "SUCCESS", `Deleted ${filePaths.length} files from storage`)
      }
    }

    // Bulk delete records from database
    const ids = uploads.map((u) => u.id)
    log(functionName, "INFO", `Attempting database deletion for ${ids.length} records`)

    const { error: dbError, count } = await supabase
      .from("admin_uploads")
      .delete({ count: "exact" })
      .in("id", ids)

    if (dbError) {
      log(functionName, "ERROR", "Database deletion failed", {
        error: dbError,
        code: dbError.code,
        message: dbError.message,
        ids: ids,
      })
      return {
        success: false,
        error: `Failed to delete uploads from database: ${dbError.message}`,
      }
    }

    log(functionName, "SUCCESS", `Deleted ${count ?? ids.length} records from database`)
    log(functionName, "SUCCESS", `Bulk delete completed: ${uploads.length} items deleted`)

    return {
      success: true,
      data: {
        deletedCount: uploads.length,
        deletedIds: ids,
      },
    }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error during bulk delete", error)
    return { success: false, error: "An error occurred during bulk delete" }
  }
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(formData: FormData) {
  const functionName = "uploadFile"

  try {
    log(functionName, "INFO", "Starting file upload to storage")

    const authenticated = await isAuthenticated()
    if (!authenticated) {
      log(functionName, "WARN", "Unauthorized access attempt")
      return { success: false, error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    if (!file) {
      log(functionName, "WARN", "No file provided in request")
      return { success: false, error: "No file provided" }
    }

    log(functionName, "INFO", `File details: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB, ${file.type})`)

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      log(functionName, "WARN", `File size exceeds limit: ${(file.size / 1024 / 1024).toFixed(2)} MB`)
      return { success: false, error: "File size exceeds 10MB limit" }
    }

    // Use admin client for storage operations to properly set service_role context
    const supabase = createAdminClient()

    // Generate unique file name
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = fileName

    log(functionName, "INFO", `Generated storage path: ${filePath}`)

    // Upload to storage
    log(functionName, "INFO", "Uploading file to Supabase Storage...")
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("admin-uploads")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      log(functionName, "ERROR", "Storage upload failed", {
        error: uploadError,
        message: uploadError.message,
        filePath,
      })
      return { success: false, error: `Failed to upload file: ${uploadError.message}` }
    }

    log(functionName, "SUCCESS", `File uploaded successfully to storage: ${filePath}`)

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("admin-uploads")
      .getPublicUrl(filePath)

    log(functionName, "INFO", `Generated public URL: ${publicUrl}`)

    return {
      success: true,
      data: {
        file_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      },
    }
  } catch (error) {
    log(functionName, "ERROR", "Unexpected error during file upload", error)
    return { success: false, error: "An error occurred" }
  }
}
