import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await req.nextUrl.clone().searchParams.get("session");

  if (session) {
    const parsedSession = JSON.parse(session);

    if (parsedSession.user.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (parsedSession.user.role === "user") {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  // If no session or invalid role, redirect to login
  return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
  matcher: ["/noting now"], // Match the root path
};
