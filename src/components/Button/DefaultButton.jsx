/**
 * DefaultButton component
 *
 * @param {{ type: string; title: string; onClick: function; className: string; disabled: boolean; }} param0
 * @param {string} param0.type
 * @param {string} param0.title
 * @param {function} param0.onClick
 * @param {string} param0.className
 * @param {boolean} param0.disabled
 * @returns {JSX.Element}
 */
function DefaultButton({ type, title, onClick, className, disabled }) {
  return (
    <button onClick={onClick} type={type} className={`w-full cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 ${className}`} disabled={disabled}>
      {title}
    </button>
  );
}

export { DefaultButton };
