import { NextResponse } from "next/server";
import { getSession } from "./utils/session";

export function middleware(req) {
  const token = req.cookies.get("token") ?? null; // Définit token comme null s'il est absent
  const allowedUrls = ["/verify-email", "/resend-validation-email"];

  // If not logged: add some url authorizations
  if (!token) {
    ["/login", "/register", "/reset-password", "/forgot-password"].forEach((url) => {
      allowedUrls.push(url);
    });
  }

  const isAuthorizedPage = allowedUrls.some((url) => req.nextUrl.pathname.startsWith(url));

  // If not logged and not authorized
  if (!isAuthorizedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const session = getSession(token.value);
    console.log(session);
    if (!session.is_verified && !isAuthorizedPage) {
      console.log("redirect to validation page");
      return NextResponse.redirect(new URL("/resend-validation-email", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
