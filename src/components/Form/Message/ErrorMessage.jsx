function ErrorMessage({ text, className }) {
  return <p className={`mt-2 text-red-500 text-sm ${className}`}>{text}</p>;
}

export { ErrorMessage };
