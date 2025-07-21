import { NextRequest, NextResponse } from "next/server";

import { API_ENDPOINTS, HTTP_METHOD } from "./config/api";

const protectedRoutes = ["/dashboard", "/admin", "/settings"];
const publicRoutes = ["/login", "/register", "/"];
const cookieName = "auth-token";

const tokenCache = new Map<string, { valid: boolean; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute

async function validateToken(token: string): Promise<boolean> {
  try {
    const cached = tokenCache.get(token);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.valid;
    }

    const response = await fetch(API_ENDPOINTS.AUTH.VERIFY, {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const isValid = response.ok;

    tokenCache.set(token, { valid: isValid, timestamp: Date.now() });

    if (tokenCache.size > 100) {
      const cutoff = Date.now() - CACHE_DURATION;
      for (const [key, value] of tokenCache.entries()) {
        if (value.timestamp < cutoff) {
          tokenCache.delete(key);
        }
      }
    }

    return isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token =
    req.cookies.get(cookieName)?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  const isAuthRoute = /^\/api\/auth\//.test(path);
  const isPublicApiRoute = /^\/api\/public\//.test(path);

  if (path.startsWith("/api") && !isAuthRoute && !isPublicApiRoute) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isTokenValid = await validateToken(token);
    if (!isTokenValid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  if (protectedRoutes.some((route) => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const isTokenValid = await validateToken(token);
    if (!isTokenValid) {
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));
      response.cookies.delete(cookieName);
      return response;
    }
  }

  if (publicRoutes.includes(path) && token) {
    const isTokenValid = await validateToken(token);
    if (isTokenValid) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    } else {
      const response = NextResponse.next();
      response.cookies.delete(cookieName);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
