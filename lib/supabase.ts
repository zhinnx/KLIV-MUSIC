import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time or if not set, return a dummy client to avoid crashes
    if (process.env.NODE_ENV === 'production' && !supabaseUrl) {
      console.warn('⚠️ Supabase env vars missing during build. Using dummy client.')
    }
    // Return a minimal dummy client that won't throw on auth calls during prerender
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
      },
    } as any
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  }
  return supabaseInstance
}

// For backward compatibility (some files may still import { supabase })
export const supabase = getSupabase()

// Types
export type User = {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  provider?: string
}
