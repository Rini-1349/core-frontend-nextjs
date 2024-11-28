/**
 * Loader component
 *
 * @returns {JSX.Element}
 */
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 dark:bg-white/25">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
