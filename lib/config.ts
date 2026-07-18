// =============================================
// KLIV - Smart OAuth Redirect URL
// =============================================

/**
 * Returns the correct `redirectTo` URL for Supabase signInWithOAuth.
 *
 * This is the CORRECT implementation:
 * - In browser → use current origin (window.location.origin)
 *   This allows login to work on localhost, Vercel previews, and kliv.web.id
 * - Only falls back to production domain on server/build time
 *
 * This fixes the bug where clicking login was redirecting to kliv.web.id
 * instead of starting the real OAuth flow.
 */
export function getAuthRedirectUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Best practice: respect explicit env var if provided
  const envSite = process.env.NEXT_PUBLIC_SITE_URL;
  if (envSite) {
    return `${envSite.replace(/\/$/, '')}${cleanPath}`;
  }

  // Browser: use whatever domain the user is currently visiting
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${cleanPath}`;
  }

  // Server / build-time fallback
  return `https://kliv.web.id${cleanPath}`;
}

export const SITE_URL = 'https://kliv.web.id';
