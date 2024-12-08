import { getEnglishSlug, getFrenchSlug } from "@/lib/slugUtils";
import { jwtDecode } from "jwt-decode";

/**
 * setSession function
 * Gère la session : enregistre le token dans les cookies
 *
 * @export
 * @param {string} token
 */
export function setSession(token) {
  document.cookie = `token=${token}; path=/`;
}

/**
 * getSession
 * Récupère et décode le token JWT côté client
 *
 * @export
 * @param {string} [token=null]
 * @returns {{}}
 */
export function getSession(token = null) {
  // Si aucun token n'est fourni, essaie de le récupérer des cookies
  if (!token) {
    token = getTokenClientSide();
  }

  // Vérifie que le token est valide avant de le décoder
  return typeof token === "string" && token.length > 0 ? jwtDecode(token) : null;
}

/**
 * clearSession
 * Supprime le token des cookies
 *
 * @export
 */
export function clearSession() {
  document.cookie = "token=; Max-Age=0; path=/";
}

/**
 * getTokenClientSide
 * Récupère le token dans les cookies côté client
 *
 * @export
 * @returns {string}
 */
export function getTokenClientSide() {
  // Vérifie si l'exécution est côté client
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  }
  console.log("getTokenClientSide appelé côté serveur !");
  return null;
}

export function redirectToLogin() {
  if (typeof window !== "undefined") {
    const currentUrl = getEnglishSlug(window.location.pathname);
    const excludedUrls = ["/login", "/register", "/reset-password", "/forgot-password", "/verify-email", "/resend-validation-email"]; // Liste des URL à exclure

    // Si l'URL actuelle fait partie des exclusions, on ignore la redirection
    if (excludedUrls.some((url) => currentUrl.includes(url))) {
      return;
    }
  }

  clearSession();
  if (typeof window !== "undefined") {
    console.log("Redirecting to login.");
    window.location.href = `/${getFrenchSlug("login")}`;
  }
}
