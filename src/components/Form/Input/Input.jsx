/**
 * Input component
 *
 * @param {{ label: string; type?: string; name: string; value: any; onChange: function; defaultValue: any; placeholder?: string; errorMessage?: string; required?: boolean; disabled?: boolean; className?: string; }} param0
 * @param {string} param0.label
 * @param {string} [param0.type="text"]
 * @param {string} param0.name
 * @param {any} param0.value
 * @param {function} param0.onChange
 * @param {any} param0.defaultValue
 * @param {string} [param0.placeholder=""]
 * @param {string} [param0.errorMessage=""]
 * @param {boolean} [param0.required=false]
 * @param {boolean} [param0.disabled=false]
 * @param {string\} [param0.className=""]
 * @returns
 */
export const Input = ({ type = "text", name, value, onChange, defaultValue, placeholder = "", errorMessage = "", required = false, className = "", disabled = false, title = "" }) => {
  return <input id={name} name={name} type={type} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} required={required} className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${errorMessage ? "bg-red-50 border text-red-900 placeholder-red-700 border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"} ${className ? className : ""}`} disabled={disabled} title={title} />;
};
