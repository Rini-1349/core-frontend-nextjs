import { jwtDecode } from "jwt-decode";

// Gère la session : enregistre le token dans les cookies
export function setSession(token) {
  console.log("set : ", token);
  document.cookie = `token=${token}; path=/`;
}

// Récupère et décode le token JWT côté client
export function getSession(token = null) {
  console.log("Token reçu :", token);

  // Si aucun token n'est fourni, essaie de le récupérer des cookies
  if (!token) {
    token = getTokenClientSide();
  }

  // Vérifie que le token est valide avant de le décoder
  return typeof token === "string" && token.length > 0 ? jwtDecode(token) : null;
}

// Supprime le token des cookies
export function clearSession() {
  console.log("clear : ", document.cookie);
  document.cookie = "token=; Max-Age=0; path=/";
}

// Récupère le token dans les cookies côté client
export function getTokenClientSide() {
  // Vérifie si l'exécution est côté client
  if (typeof window !== "undefined") {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  }
  console.log("getTokenClientSide appelé côté serveur !");
  return null;
}
