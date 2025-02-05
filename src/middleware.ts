import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    // otherwise, let them through
    return setHeaders(req, NextResponse.next())
}
 
export const config = {
  // recommended by clerk?
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
}

// would much prefer to do this in Nginx...
function setHeaders(req: NextRequest, resp: NextResponse) {
  // always headers
  for (const k in ourHeaders) {
    resp.headers.set(k, ourHeaders[k])
  }

  // content based headers
}

// Content Security Policy settings
const CSP_DEFAULT_SRC = "default-src 'self'";
const CSP_SCRIPT_SRC = "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com";
const CSP_CONNECT_SRC = "connect-src 'self' cdn.bsky.app www.google-analytics.com analytics.google.com";
const CSP_WORKER_SRC = "worker-src blob: 'self' 'unsafe-inline'";
const CSP_IMG_SRC = "img-src 'self' cdn.bsky.app img.clerk.com avatars.githubusercontent.com data: www.googletagmanager.com www.google-analytics.com";
const CSP_FORM_ACTION = "form-action 'self'";
const CSP_FRAME_SRC = "frame-src youtube.com www.youtube.com";
const CSP_STYLE_SRC = "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com";
const CSP_FONT_SRC = "font-src 'self' https://fonts.gstatic.com";

// all fixed headers
const ourHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer-when-downgrade",
  "Content-Security-Policy": `${CSP_DEFAULT_SRC}; ${CSP_SCRIPT_SRC}; ${CSP_STYLE_SRC}; ${CSP_FONT_SRC}; ${CSP_IMG_SRC}; ${CSP_CONNECT_SRC}; ${CSP_FORM_ACTION}; ${CSP_FRAME_SRC}; ${CSP_WORKER_SRC};`
}
