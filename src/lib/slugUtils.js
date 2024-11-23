import slugMapping from "./slugMapping";

// Traduire un slug anglais en slug français
export function getFrenchSlug(englishSlug) {
  return slugMapping[englishSlug] || englishSlug; // Si pas de traduction, retourne le slug original
}

// Traduire un slug français en slug anglais
export function getEnglishSlug(frenchSlug) {
  return Object.keys(slugMapping).find((key) => slugMapping[key] === frenchSlug) || frenchSlug;
}
