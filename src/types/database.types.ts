/**
 * Database Types for Supabase
 *
 * To auto-generate these types from your Supabase schema:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Login: npx supabase login
 * 3. Generate types: npx supabase gen types typescript --project-id okssgpkseqewpzdkmsmo > src/types/database.types.ts
 *
 * Or manually define your types below as you create tables in Supabase
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_sessions: {
        Row: {
          id: string
          session_id: string
          visitor_ip: string | null
          visitor_country: string | null
          visitor_country_code: string | null
          visitor_city: string | null
          visitor_region: string | null
          visitor_latitude: number | null
          visitor_longitude: number | null
          user_agent: string | null
          started_at: string
          last_activity: string
        }
        Insert: {
          id?: string
          session_id: string
          visitor_ip?: string | null
          visitor_country?: string | null
          visitor_country_code?: string | null
          visitor_city?: string | null
          visitor_region?: string | null
          visitor_latitude?: number | null
          visitor_longitude?: number | null
          user_agent?: string | null
          started_at?: string
          last_activity?: string
        }
        Update: {
          id?: string
          session_id?: string
          visitor_ip?: string | null
          visitor_country?: string | null
          visitor_country_code?: string | null
          visitor_city?: string | null
          visitor_region?: string | null
          visitor_latitude?: number | null
          visitor_longitude?: number | null
          user_agent?: string | null
          started_at?: string
          last_activity?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: "user" | "assistant"
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: "user" | "assistant"
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: "user" | "assistant"
          content?: string
          created_at?: string
        }
      }
      admin_uploads: {
        Row: {
          id: string
          upload_type: "testimony" | "payment_proof" | "screenshot" | "other"
          title: string
          description: string | null
          file_url: string
          file_name: string
          file_size: number | null
          mime_type: string | null
          is_visible: boolean
          display_order: number
          uploaded_by: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          upload_type: "testimony" | "payment_proof" | "screenshot" | "other"
          title: string
          description?: string | null
          file_url: string
          file_name: string
          file_size?: number | null
          mime_type?: string | null
          is_visible?: boolean
          display_order?: number
          uploaded_by?: string | null
          uploaded_at?: string
        }
        Update: {
          id?: string
          upload_type?: "testimony" | "payment_proof" | "screenshot" | "other"
          title?: string
          description?: string | null
          file_url?: string
          file_name?: string
          file_size?: number | null
          mime_type?: string | null
          is_visible?: boolean
          display_order?: number
          uploaded_by?: string | null
          uploaded_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
