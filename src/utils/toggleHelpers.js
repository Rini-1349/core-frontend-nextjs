export function updateToggleInputs(fields, currentToggleInputs) {
  const newInputs = fields.filter((field) => field.type === "toggle").map((field) => field.name);
  return [...currentToggleInputs, ...newInputs.filter((name) => !currentToggleInputs.includes(name))];
}

/**
 * Formate les champs spécifiés en booléens (0 ou 1) dans un objet donné.
 *
 * @param {Object} data - L'objet à modifier.
 * @param {Array<string>} booleanFields - Les noms des champs à formater.
 */
export function formatToogleValueIntoBoolean(data, booleanFields) {
  booleanFields.forEach((field) => {
    data[field] = data[field] ? 1 : 0;
  });
}
