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
  return slugMapping[englishSlug] || englishSlug; // Si pas de traduction, retourne le slug original
}

/**
 * getEnglishSlug function
 * Traduire un slug français en slug anglais
 *
 * @export
 * @param {string} frenchSlug
 * @returns {string}
 */
export function getEnglishSlug(frenchSlug) {
  return Object.keys(slugMapping).find((key) => slugMapping[key] === frenchSlug) || frenchSlug;
}
