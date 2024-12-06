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
export const Toggle = ({ name, defaultChecked, className = "", disabled = false, label, value, onChange }) => {
  // Si 'value' et 'onChange' sont définis, on gère un champ contrôlé
  const isControlled = value !== undefined && onChange !== undefined;

  // Fonction de gestion du changement d'état
  const handleChange = (e) => {
    const newValue = e.target.checked ? 1 : 0;
    onChange({ target: { name, value: newValue } }); // Formate l'événement pour être compatible avec handleChange
  };

  return (
    <label className="inline-flex items-center cursor-pointer my-2">
      {isControlled ? <input type="checkbox" name={name} checked={value} onChange={handleChange} disabled={disabled} className={`sr-only peer ${className}`} /> : <input type="checkbox" name={name} defaultChecked={defaultChecked} onChange={handleChange} disabled={disabled} className={`sr-only peer ${className}`} />}
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
};
