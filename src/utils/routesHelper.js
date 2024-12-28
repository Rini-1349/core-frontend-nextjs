import { routesPermissions } from "@/lib/routesPermissions";

/**
 * Vérifie si une route est autorisée pour l'utilisateur
 * @param {string} pathname - La route demandée
 * @param {string[]} userPermissions - Les actions autorisées depuis l'API Symfony
 * @returns {boolean}
 */
export function matchAuthorizedRoutes(pathname, userPermissions) {
  // Parcours chaque clé de userPermissions
  return Object.keys(userPermissions).some((key) => {
    const actions = userPermissions[key];
    return actions.some((action) => {
      // On cherche les routes associées à cette action dans routesPermissions
      const userAuthorizedNextjsRoutes = routesPermissions[action] || [];
      // Vérifie si le pathname correspond à l'une des routes autorisées pour cette action
      return matchPathname(pathname, userAuthorizedNextjsRoutes);
    });
  });
}

/**
 * Vérifie si une valeur correspond exactement à une liste d'éléments ou à des expressions régulières
 *
 * @param {string} pathname - La valeur à vérifier
 * @param {(string|RegExp)[]} urlsList - Liste de chaînes ou de regex à tester
 * @returns {boolean} - `true` si la valeur correspond à un élément de la liste
 */
export function matchPathname(pathname, urlsList) {
  return urlsList.some((url) => {
    if (typeof url === "string") {
      return pathname === url; // Correspondance exacte pour les chaînes
    }
    if (url instanceof RegExp) {
      return url.test(pathname); // Teste avec la regex
    }
    return false; // Par défaut, aucune correspondance
  });
}
