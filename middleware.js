import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.pathname;

  // Public routes
  if (url === "/login" || url === "/request-access") {
    return NextResponse.next();
  }

  // Protected routes — needs token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/request-access"],
};
