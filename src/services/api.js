import client from "@/services/client";
import { redirectToLogin } from "@/utils/session";
import { Axios } from "axios";

/**
 * apiFetch function
 *
 * @async
 * @param {string} endpoint
 * @param {{}} [options={\}]
 * @returns {Axios}
 */
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await client({
      url: endpoint, // L'URL de base est déjà gérée par le client
      method: options.method || "GET", // Par défaut, on utilise la méthode GET
      headers: {
        ...options.headers, // Ajoute les headers supplémentaires si besoin
      },
      data: options.body, // `data` dans Axios est équivalent à `body` dans fetch
      ...options, // Passe les autres options (comme `timeout`, etc.)
    });

    return response.data; // Axios convertit automatiquement la réponse en JSON
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("[API] Unauthorized. Redirecting to login.");
        redirectToLogin();
      }
      // Si l'erreur provient de la réponse du serveur
      console.log(error.response.data);
      const errorMessage = error.response.data.message || "Une erreur est apparue";
      throw new Error(errorMessage);
    } else {
      // Pour les erreurs réseau ou autres
      throw new Error(error.message || "Une erreur est apparue");
    }
  }
}

export default apiFetch;
