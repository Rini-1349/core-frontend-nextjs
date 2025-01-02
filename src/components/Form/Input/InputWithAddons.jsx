import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "./ErrorMessage";

/**
 * InputWithAddons component
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
export const InputWithAddons = ({ icon, type = "text", name, value, onChange, defaultValue, placeholder = "", errorMessage = "", required = false, className = "", disabled = false, title = "", label, maxLength, minLength }) => {
  return (
    <>
      <div className={`flex rounded-none rounded-lg ${errorMessage ? "border border-red-500" : ""}`} title={title}>
        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ${errorMessage ? "bg-red-200" : ""}`}>{icon ? <FontAwesomeIcon icon={icon} className="w-4 h-4 text-gray-500" /> : label}</span>
        <input id={name} name={name} type={type} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} required={required} className={`p-2 border rounded-none rounded-e-lg focus:outline-none focus:ring-2 block flex-1 min-w-0 w-full ${errorMessage ? "bg-red-50 border text-red-900 placeholder-red-700 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"} ${className ? className : ""}`} disabled={disabled} maxLength={maxLength} minLength={minLength} />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};
