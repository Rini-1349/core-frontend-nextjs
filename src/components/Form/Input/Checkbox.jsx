/**
 * Toggle component
 *
 * @param {{ name: string; defaultValue: any; className?: string; disabled?: boolean; label: string; value: any; onChange: function; }} param0
 * @param {string} param0.name
 * @param {any} param0.defaultChecked
 * @param {string\} [param0.className=""]
 * @param {boolean} [param0.disabled=false]
 * @param {string} param0.label
 * @param {any} param0.value
 * @param {function} param0.onChange
 * @returns
 */
export const Checkbox = ({ name, defaultChecked, className = "", disabled = false, label, value, onChange }) => {
  // Si 'value' et 'onChange' sont définis, on gère un champ contrôlé
  const isControlled = value !== undefined && onChange !== undefined;

  // Fonction de gestion du changement d'état
  const handleChange = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    onChange({ target: { name, value: newValue } }); // Formate l'événement pour être compatible avec handleChange
  };

  return (
    <div className="flex items-center">
      {isControlled ? <input type="checkbox" name={name} checked={value} onChange={handleChange} disabled={disabled} className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${className}`} /> : <input type="checkbox" name={name} defaultChecked={defaultChecked} onChange={handleChange} disabled={disabled} className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ${className}`} />}
      <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};
