import React from "react";
import PropTypes from "prop-types";

/**
 * Input component
 *
 * @param {{ label: string; type?: string; name: string; value: any; onChange: function; placeholder?: string; errorMessage?: string; required?: boolean; className?: string; }} param0
 * @param {string} param0.label
 * @param {string} [param0.type="text"]
 * @param {string} param0.name
 * @param {any} param0.value
 * @param {function} param0.onChange
 * @param {string} [param0.placeholder=""]
 * @param {string} [param0.errorMessage=""]
 * @param {boolean} [param0.required=false]
 * @param {string\} [param0.className=""]
 * @returns
 */
export const Input = ({ label, type = "text", name, value, onChange, placeholder = "", errorMessage = "", required = false, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${errorMessage ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`} />
      {errorMessage && <span className="mt-1 text-sm text-red-500">{errorMessage}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
};
