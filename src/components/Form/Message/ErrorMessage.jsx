/**
 * ErrorMessage component
 *
 * @param {{ text: string; className: string; }} param0
 * @param {string} param0.text
 * @param {string} param0.className
 * @returns {JSX.Element}
 */
function ErrorMessage({ text, className }) {
  return <p className={`mt-2 text-red-500 text-sm ${className}`}>{text}</p>;
}

export { ErrorMessage };
