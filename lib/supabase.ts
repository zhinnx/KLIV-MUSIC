import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Supabase client with strong session persistence.
 * This uses localStorage + cookies so users stay logged in
 * after refresh or returning to the site.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Custom storage key for Kliv
    storageKey: 'kliv-auth-token',
  },
})

// Helper for components that need the client
export function getSupabase() {
  return supabase
}
