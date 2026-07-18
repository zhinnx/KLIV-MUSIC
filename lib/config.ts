// =============================================
// KLIV - Forced Production Domain for OAuth
// =============================================

/**
 * This is the CRITICAL fix for "redirects to localhost".
 * 
 * Supabase OAuth will ALWAYS redirect users back to this domain.
 * We are hardcoding it so it never uses window.location.origin.
 */

// ✅ PRODUCTION DOMAIN - This is the only URL that should be used for login redirects
export const AUTH_REDIRECT_DOMAIN = 'https://kliv.web.id';

/**
 * Returns the full redirect URL for Supabase Google/GitHub login.
 * Always points to kliv.web.id (production domain).
 */
export function getAuthRedirectUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${AUTH_REDIRECT_DOMAIN}${cleanPath}`;
}

// For other links (not auth)
export const SITE_URL = AUTH_REDIRECT_DOMAIN;
