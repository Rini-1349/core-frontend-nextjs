import slugMapping from "./slugMapping";

/**
 * getFrenchSlug function
 * Traduire un slug anglais en slug français
 *
 * @export
 * @param {string} englishSlug
 * @returns {string}
 */
export function getFrenchSlug(englishSlug) {
  // Séparer la base de l'URL et les paramètres de requête
  const urlParts = englishSlug.split("?");
  const baseSlug = urlParts[0]; // Partie avant le '?' (ex: /users/view/person/2)
  const queryParams = urlParts[1] ? urlParts[1] : ""; // Partie après '?' (ex: mode=view&modal=true)

  // Traduction de la baseSlug (segment d'URL avant '?')
  const frenchBaseSlug = baseSlug
    .split("/")
    .map((segment) => slugMapping[segment] || segment)
    .join("/");

  // Traduction des paramètres de requête
  let queryParamsArr = [];
  if (queryParams) {
    queryParamsArr = queryParams.split("&").map((param) => {
      const [key, value] = param.split("=");
      return `${key}=${slugMapping[value] || value}`; // Traduit uniquement la valeur du paramètre
    });
  }

  // Reconstruire l'URL avec la base traduite et les paramètres traduits
  return `${frenchBaseSlug}${queryParamsArr.length ? "?" + queryParamsArr.join("&") : ""}`;
}

export function getEnglishSlug(frenchSlug) {
  // Séparer la base de l'URL et les paramètres de requête
  const urlParts = frenchSlug.split("?");
  const baseSlug = urlParts[0]; // Partie avant le '?' (ex: /utilisateurs/voir/personne/2)
  const queryParams = urlParts[1] ? urlParts[1] : ""; // Partie après '?' (ex: mode=voir&modale=oui)

  // Traduction de la baseSlug (segment d'URL avant '?')
  const englishBaseSlug = baseSlug
    .split("/")
    .map((segment) => {
      const englishSegment = Object.keys(slugMapping).find((key) => slugMapping[key] === segment);
      return englishSegment || segment; // Trouve la traduction en anglais ou garde le segment original
    })
    .join("/");

  // Traduction des paramètres de requête
  let queryParamsArr = [];
  if (queryParams) {
    queryParamsArr = queryParams.split("&").map((param) => {
      if (!queryParams) {
        return;
      }
      const [key, value] = param.split("=");
      const englishValue = Object.keys(slugMapping).find((key) => slugMapping[key] === value);
      return `${key}=${englishValue || value}`; // Traduit uniquement la valeur du paramètre
    });
  }

  // Reconstruire l'URL avec la base traduite et les paramètres traduits
  return `${englishBaseSlug}${queryParamsArr.length ? "?" + queryParamsArr.join("&") : ""}`;
}

export function isFrenchSlugValid(frenchSlug) {
  // Séparer la base de l'URL et les paramètres de requête
  const urlParts = frenchSlug.split("?");
  const frenchBaseSlug = urlParts[0]; // Partie avant le '?' (ex: /utilisateurs/voir/personne/2)
  const queryParams = urlParts[1] ? urlParts[1] : ""; // Partie après '?' (ex: mode=voir&modale=oui)

  // Vérifier si chaque segment de la base de l'URL française a une correspondance en anglais
  const frenchSegments = frenchBaseSlug.split("/");

  // Fonction pour vérifier si un segment est un chiffre
  const isNumber = (str) => /^\d+$/.test(str);

  const englishSegments = frenchSegments.map((segment) => {
    // Ignorer les segments contenant des chiffres
    if (isNumber(segment)) {
      return segment; // Ne pas toucher aux segments numériques
    }

    // Rechercher la correspondance inverse dans slugMapping pour les segments non numériques
    const englishSegment = Object.keys(slugMapping).find((key) => slugMapping[key] === segment);
    return englishSegment || segment; // Si pas de correspondance, garder le segment original
  });

  // Si un segment non numérique n'a pas de correspondance, l'URL n'est pas valide en anglais
  const isBaseValid = !frenchSegments.some((segment, index) => {
    // Ne comparer que les segments non numériques
    return !isNumber(segment) && !Object.values(slugMapping).includes(segment);
  });

  // Vérifier les paramètres de requête (query parameters)
  let queryParamsArr = [];
  if (queryParams) {
    queryParamsArr = queryParams.split("&").map((param) => {
      const [key, value] = param.split("=");
      // Vérifier si chaque valeur a une correspondance dans slugMapping
      return slugMapping[value] ? `${key}=${slugMapping[value]}` : param;
    });
  }

  // Si un paramètre n'a pas de correspondance, l'URL n'est pas valide
  const isQueryValid = queryParamsArr.every((param) => param.includes("="));

  // L'URL est valide si la base et les paramètres sont valides
  return isBaseValid && isQueryValid;
}
