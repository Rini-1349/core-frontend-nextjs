function DefaultButton({ type, title, onClick, className, disabled }) {
  return (
    <button onClick={onClick} type={type} className={`w-full cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-opacity-90 ${className}`} disabled={disabled}>
      {title}
    </button>
  );
}

export { DefaultButton };
