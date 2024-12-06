import React from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { ErrorMessage } from "./ErrorMessage";

/**
 * InputGroup component
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
export const InputGroup = ({ label, type = "text", name, value, onChange, defaultValue, placeholder = "", errorMessage = "", required = false, className = "", disabled = false, title = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <Label label={label} htmlFor={name} errorMessage={errorMessage} className="" />}
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} required={required} className="default-input" title={title} />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};
