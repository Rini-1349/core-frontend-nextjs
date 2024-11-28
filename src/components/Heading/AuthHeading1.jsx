/**
 * AuthHeading1 component
 *
 * @param {{ title: string; className: string; }} param0
 * @param {string} param0.title
 * @param {string} param0.className
 * @returns {JSX.Element}
 */
function AuthHeading1({ title, className }) {
  return <h1 className={`text-center text-3xl font-semibold leading-tight text-gray-900 ${className}`}>{title}</h1>;
}

export { AuthHeading1 };
