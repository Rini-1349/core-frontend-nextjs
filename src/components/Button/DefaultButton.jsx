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
function DefaultButton({ type, title, onClick, className, disabled, widthClass = "w-full", color = "white", btnStyle = "primary" }) {
  return (
    <button onClick={onClick} type={type} className={`${widthClass} cursor-pointer rounded-lg border border-${btnStyle} bg-${btnStyle} px-4 py-2 text-${color} transition hover:bg-opacity-90 ${className}`} disabled={disabled}>
      {title}
    </button>
  );
}

export { DefaultButton };
