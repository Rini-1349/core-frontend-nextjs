import { jwtDecode } from "jwt-decode";

export function setSession(token) {
  console.log("set : ", token);
  document.cookie = `token=${token}; path=/`;
}
export function getSession(token) {
  console.log("Token reçu :", token);
  // Vérifie que le token est une chaîne non vide avant de le décoder
  return typeof token === "string" && token.length > 0 ? jwtDecode(token) : null;
}

export function clearSession() {
  console.log("clear : ", document.cookie);
  document.cookie = "token=; Max-Age=0; path=/";
}

export function getCookieClientSide() {
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  return match ? match[2] : null;
}
