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
      // Example table structure - replace with your actual tables
      // chat_messages: {
      //   Row: {
      //     id: string
      //     user_id: string | null
      //     message: string
      //     role: 'user' | 'assistant'
      //     created_at: string
      //   }
      //   Insert: {
      //     id?: string
      //     user_id?: string | null
      //     message: string
      //     role: 'user' | 'assistant'
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     user_id?: string | null
      //     message?: string
      //     role?: 'user' | 'assistant'
      //     created_at?: string
      //   }
      // }
      [key: string]: {
        Row: { [key: string]: any }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
    }
    Views: {
      [key: string]: {
        Row: { [key: string]: any }
      }
    }
    Functions: {
      [key: string]: {
        Args: { [key: string]: any }
        Returns: any
      }
    }
    Enums: {
      [key: string]: string
    }
  }
}
