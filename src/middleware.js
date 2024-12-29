import { NextResponse } from "next/server";
import { getSession, hasSessionExpired, isUserSuperadmin } from "./utils/session";
import { getEnglishSlug, getFrenchSlug, isFrenchSlugValid } from "@/lib/slugUtils";
import { matchAuthorizedRoutes, matchPathname } from "./utils/routesHelper";
import { allowedUrls } from "./lib/allowedUrls";

/**
 * Asynchronious Middleware
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {NextResponse}
 */
export async function middleware(req) {
  const url = req.nextUrl.clone();
  let pathname = req.nextUrl.pathname;
  const cookies = req.cookies; // Accède aux cookies du middleware
  const token = cookies.get("token")?.value ?? null; // Récupère le token de manière asynchrone

  // Transforme le frenchSlug en englishSlug pour vérifier les autorisations et permissions
  const frenchSlug = url.pathname.substring(1);
  if (isFrenchSlugValid(frenchSlug)) {
    pathname = `/${getEnglishSlug(frenchSlug)}`;
  }

  // Pages autorisées quelles que soient les permissions de l'utilisateur
  let userAllowedRoutes = {};
  if (token) {
    userAllowedRoutes = allowedUrls["loggedUsers"];
  } else {
    userAllowedRoutes = allowedUrls["unloggedUsers"];
  }
  const isRouteAllowed = matchPathname(pathname, userAllowedRoutes);

  if (token) {
    try {
      const session = await getSession(token);
      if (!session || !session.is_verified) {
        console.log(`[Middleware] Session unverified, redirecting to validation`);
        return NextResponse.redirect(new URL(getFrenchSlug("/resend-validation-email"), req.url));
      }
      if (hasSessionExpired(session)) {
        const response = NextResponse.redirect(new URL(getFrenchSlug("/login"), req.url));
        response.cookies.delete("token"); // Supprime le cookie token
        return response;
      }

      // Toutes les routes sont autorisées pour le ROLE_SUPERADMIN
      const isRouteAuthorized = isUserSuperadmin(session) ? true : matchAuthorizedRoutes(pathname, session.permissions);
      // Vérifie les autorisations et permissions de l'utilisateur
      if (!isRouteAllowed && !isRouteAuthorized) {
        console.log(`[Middleware] Unauthorized access to ${pathname}`);
        return NextResponse.redirect(new URL("/403", req.url)); // Page d'erreur 403
      }
    } catch (error) {
      console.error("[Middleware] Error in session handling:", error);
      return NextResponse.redirect(new URL(getFrenchSlug("/login"), req.url));
    }
  } else {
    // Si non connecté et page non autorisée
    if (!isRouteAllowed) {
      console.log(`[Middleware] Unauthorized access to ${req.nextUrl.pathname}`);
      return NextResponse.redirect(new URL(getFrenchSlug("/login"), req.url));
    }
  }

  /* Gestion des URLs françaises */
  if (isFrenchSlugValid(frenchSlug)) {
    const englishSlug = getEnglishSlug(frenchSlug);
    url.pathname = `/${englishSlug}`;
    return NextResponse.rewrite(url);
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
