/**
 * Label component
 *
 * @param {{ label: string; htmlFor: string; errorMessage?: className?: string; }} param0
 * @param {string} param0.label
 * @param {string} param0.htmlFor
 * @param {string} [param0.errorMessage=""]
 * @param {string\} [param0.className=""]
 * @returns
 */
export const Label = ({ label, htmlFor, errorMessage = "", className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`mb-2 text-sm font-medium ${errorMessage ? "text-red-500" : "text-gray-700"} ${className ? className : ""}`}>
      {label}
    </label>
  );
};
