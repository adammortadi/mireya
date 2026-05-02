import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const cookieName = "mireya_admin_session";

async function hasAdminSession(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value;
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret) return false;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "ADMIN";
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = await hasAdminSession(request);

  if (pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = isAuthed ? "/mireya-studio/dashboard" : "/mireya-studio";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/mireya-studio/dashboard") && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/mireya-studio";
    return NextResponse.redirect(url);
  }

  if (pathname === "/mireya-studio" && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/mireya-studio/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mireya-studio", "/mireya-studio/dashboard/:path*", "/admin", "/admin/:path*"],
};
