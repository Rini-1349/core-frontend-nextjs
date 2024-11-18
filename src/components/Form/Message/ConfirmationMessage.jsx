function ConfirmationMessage({ text, className }) {
  return <p className={`mt-2 text-green-500 text-sm ${className}`}>{text}</p>;
}

export { ConfirmationMessage };
