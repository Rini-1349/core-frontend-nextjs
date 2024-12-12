import { NextResponse } from "next/server";
import { getSession, hasSessionExpired } from "./utils/session";
import { getEnglishSlug, getFrenchSlug, isFrenchSlugValid } from "@/lib/slugUtils";

/**
 * Asynchronious Middleware
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {NextResponse}
 */
export async function middleware(req) {
  /* Gestion des URLs */
  const url = req.nextUrl.clone();
  const frenchSlug = url.pathname.substring(1); // Extrait le slug sans "/"

  // Vérifie si le slug en français existe dans le mapping
  if (isFrenchSlugValid(frenchSlug)) {
    const englishSlug = getEnglishSlug(frenchSlug);
    console.log(`[Middleware] Rewriting ${frenchSlug} to ${englishSlug}`);
    url.pathname = `/${englishSlug}`;
    return NextResponse.rewrite(url); // Réécrit l'URL pour servir la bonne page
  }

  /* Gestion des autorisations */
  const cookies = req.cookies; // Accède aux cookies du middleware
  const token = cookies.get("token")?.value ?? null; // Récupère le token de manière asynchrone
  const allowedUrls = ["/verify-email", "/resend-validation-email"];

  // Pages accessibles sans token
  if (!token) {
    ["/login", "/register", "/reset-password", "/forgot-password"].forEach((url) => {
      allowedUrls.push(url);
    });
  }

  const isAuthorizedPage = allowedUrls.some((url) => req.nextUrl.pathname.startsWith(url));

  // Si non connecté et page non autorisée
  if (!isAuthorizedPage && !token) {
    console.log(`[Middleware] Unauthorized access to ${req.nextUrl.pathname}`);
    return NextResponse.redirect(new URL(`/${getFrenchSlug("login")}`, req.url));
  }

  if (token) {
    const session = getSession(token);
    if (!session || !session.is_verified) {
      console.log(`[Middleware] Session unverified, redirecting to validation`);
      return NextResponse.redirect(new URL("/resend-validation-email", req.url));
    } else if (hasSessionExpired(session)) {
      return NextResponse.redirect(new URL(`/${getFrenchSlug("login")}`, req.url));
    }
  }

  return NextResponse.next(); // Poursuit normalement si aucune condition bloquante
}

/**
 * config
 *
 * @type {{ matcher: {}; \}\}
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclut les ressources statiques et API
};
