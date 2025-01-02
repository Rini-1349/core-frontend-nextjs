import { ErrorMessage } from "../Message/ErrorMessage";

/**
 * CheckboxMultiple component
 *
 * @param {{ options: Array<{ label: string, value: string }>; name: string; selectedValues: Array<string>; onChange: function; className?: string; disabled?: boolean; }} param0
 * @param {Array<{ label: string, value: string }>} param0.options - Liste des options (label et valeur).
 * @param {string} param0.name - Nom du groupe de checkbox.
 * @param {Array<string>} param0.selectedValues - Valeurs actuellement sélectionnées.
 * @param {function} param0.onChange - Fonction appelée lors d'un changement.
 * @param {string} [param0.className=""] - Classes CSS supplémentaires.
 * @param {boolean} [param0.disabled=false] - Désactive toutes les checkbox si `true`.
 * @returns
 */
export const CheckboxMultiple = ({ options, name, selectedValues, onChange, className = "", disabled = false, label = "", errorMessage }) => {
  // Fonction pour gérer le changement d'une checkbox
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    const newSelectedValues = checked
      ? [...selectedValues, value] // Ajoute la valeur si cochée
      : selectedValues.filter((v) => v !== value); // Supprime si décochée

    // Appelle la fonction de gestion avec la nouvelle liste
    onChange({ target: { name: name, value: newSelectedValues } });
  };
  const mappedOptions = Object.entries(options).map(([value, label]) => ({ value, label }));

  return (
    <>
      {label && <h3 className="mb-1 font-semibold text-gray-900">{label}</h3>}
      {options !== undefined && (
        <ul className={`items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ${className}`}>
          {mappedOptions.map((option) => (
            <li key={option.value} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
              <div className="flex items-center ps-3">
                <input type="checkbox" name={name} value={option.value} defaultChecked={selectedValues.includes(option.value)} onChange={handleCheckboxChange} disabled={disabled} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label htmlFor={`${name}-${option.value}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                  {option.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ErrorMessage text={errorMessage} />
    </>
  );
};
