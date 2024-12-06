/**
 * ErrorMessage component
 *
 * @param {{ errorMessage: string; }} param0
 * @param {string} param0.errorMessage
 * @returns
 */
export const ErrorMessage = ({ errorMessage }) => {
  return errorMessage && <span className="mt-1 text-sm text-red-500">{errorMessage}</span>;
};
