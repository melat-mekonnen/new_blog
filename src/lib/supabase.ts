
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: number
          title: string
          excerpt: string
          content: string
          image: string
          date: string
          author: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          excerpt: string
          content: string
          image: string
          date: string
          author: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          excerpt?: string
          content?: string
          image?: string
          date?: string
          author?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: number
          title: string
          subtitle: string
          mission: string
          quote: string
          hero_image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          subtitle: string
          mission: string
          quote: string
          hero_image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          subtitle?: string
          mission?: string
          quote?: string
          hero_image?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
