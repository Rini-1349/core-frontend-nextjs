// Fonction utilitaire debounce
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Remplace les occurrences du pattern dans un texte avec la valeur d'un champ d'un item.
 * @param {string} text - Le texte dans lequel effectuer les remplacements.
 * @param {string} pattern - Le pattern à rechercher dans le texte (exprimé en regex).
 * @param {Object} item - L'élément contenant les valeurs à utiliser pour les remplacements.
 * @param {string} key - La clé du champ à utiliser dans l'item pour le remplacement.
 * @returns {string} - Le texte avec les remplacements effectués.
 */
export function replacePatternWithItemField(text, pattern, item, field) {
  if (!pattern) return text;

  return text.replace(pattern, item[field]);
}

export function replaceMultiplePatternsWithItemField(text, patterns, item) {
  if (!patterns) return text;

  patterns.forEach((pattern) => {
    text = text.replace(pattern.pattern, item[pattern.field]);
  });

  return text;
}
