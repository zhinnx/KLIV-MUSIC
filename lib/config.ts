// =============================================
// KLIV - OAuth Redirect Domain Configuration
// =============================================

/**
 * CRITICAL FIX for "Login redirects to localhost"
 * 
 * Supabase OAuth `redirectTo` MUST point to the production domain.
 * We hardcode it here so it never falls back to window.location.origin.
 */

// ✅ Always use this domain for login redirects
export const AUTH_REDIRECT_DOMAIN = 'https://kliv.web.id';

/**
 * Returns the redirect URL passed to Supabase signInWithOAuth.
 * This is the URL the user will be sent back to after Google/GitHub login.
 */
export function getAuthRedirectUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${AUTH_REDIRECT_DOMAIN}${cleanPath}`;
}

// For non-auth links (you can use this for general site links)
export const SITE_URL = AUTH_REDIRECT_DOMAIN;

// Optional: Allow override via environment variable (recommended for Vercel)
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || AUTH_REDIRECT_DOMAIN;
}
