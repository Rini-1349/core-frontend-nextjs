import { allowedUrls } from "@/lib/allowedUrls";
import { getEnglishSlug, getFrenchSlug } from "@/lib/slugUtils";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

/**
 * getSession
 * Récupère et décode le token JWT côté client
 *
 * @export
 * @param {string} [token=null]
 * @returns {{} | null}
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
 * setSession
 * Enregistre le token JWT dans les cookies
 *
 * @export
 * @param {string} token
 */
export function setSession(token) {
  Cookies.set("token", token, { path: "/" });
}

/**
 * getTokenClientSide
 * Récupère le token depuis les cookies côté client
 *
 * @export
 * @returns {string | undefined}
 */
export function getTokenClientSide() {
  return Cookies.get("token");
}

/**
 * clearSession
 * Supprime le token des cookies
 *
 * @export
 */
export function clearSession() {
  Cookies.remove("token", { path: "/" });
}

/**
 * hasSessionExpired
 * Vérifie si une session est expirée
 *
 * @export
 * @param {object} session
 * @returns {boolean}
 */
export function hasSessionExpired(session) {
  const currentTime = Math.floor(Date.now() / 1000);
  return session.exp && session.exp < currentTime;
}

/**
 * redirectToLogin
 * Redirige l'utilisateur vers la page de connexion
 *
 * @export
 */
export function redirectToLogin() {
  if (typeof window !== "undefined") {
    const currentUrl = getEnglishSlug(window.location.pathname);
    const excludedUrls = allowedUrls["unloggedUsers"];

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

/**
 * isUserSuperadmin
 * Vérifie si un utilisateur a le rôle super administrateur
 *
 * @export
 * @param {object} session
 * @returns {boolean}
 */
export function isUserSuperadmin(session) {
  return session.roles.includes("ROLE_SUPERADMIN");
}
