function DefaultButton({ type, title, onClick, className, disabled }) {
  return (
    <button onClick={onClick} type={type} className={`w-full mt-3 inline-flex justify-center items-center px-4 py-2 text-md font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`} disabled={disabled}>
      {title}
    </button>
  );
}

export { DefaultButton };
