/**
 * InputWithEmbeddedLabel component
 *
 * @param {{ label: string; name: string; value: any; onChange: function; placeholder: string; type?: string; disabled: boolean; }} param0
 * @param {string} param0.label
 * @param {string} param0.name
 * @param {any} param0.value
 * @param {function} param0.onChange
 * @param {string} param0.placeholder
 * @param {string} [param0.type="text"]
 * @param {boolean} param0.disabled
 * @returns {JSX.Element}
 */
function InputWithEmbeddedLabel({ label, name, value, onChange, placeholder, type = "text", disabled }) {
  return (
    <div className="relative flex flex-col-reverse w-full">
      <input id={name} name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} aria-label={label} className={`peer w-full pb-1 pt-6 px-3 text-base rounded-lg border border-gray-400 focus:border-red-400 text-gray-600 bg-white focus:outline-none focus:ring-0 appearance-none transition-colors duration-300 ${disabled ? "bg-gray-200" : ""}`} disabled={disabled} />
      <label htmlFor={name} className="absolute top-0 items-center px-3 pt-2 text-xs peer-focus:font-semibold peer-focus:text-red-400 uppercase text-gray-600 bg-transparent transition-colors duration-300">
        {label}
      </label>
    </div>
  );
}

export { InputWithEmbeddedLabel };
