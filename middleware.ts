import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth is handled fully client-side via zustand + localStorage.
// Middleware is a passthrough — the dashboard layout redirects
// unauthenticated users before rendering.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
