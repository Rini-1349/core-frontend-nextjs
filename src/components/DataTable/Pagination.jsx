/**
 * Pagination component
 *
 * @returns {JSX.Element}
 */
const Pagination = ({ pagination, isLoading, handlePageChange }) => {
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-sm font-normal text-gray-500">
              Résultats{" "}
              <span className="text-gray-900 font-semibold">
                {pagination.startItem ?? "0"}-{pagination.endItem ?? "0"}
              </span>{" "}
              sur <span className="text-gray-900 font-semibold">{pagination.totalItems ?? "0"}</span>
            </span>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button disabled={pagination.currentPage === 1} onClick={() => handlePageChange(pagination.currentPage - 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Précédent
                </button>
              </li>
              {Array.from({ length: pagination.lastPageButton - pagination.firstPageButton + 1 }, (_, i) => {
                const currentNumber = pagination.firstPageButton + i; // Calcul du numéro exact dans la boucle
                const colorClasses = currentNumber === pagination.currentPage ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
                return (
                  <li key={currentNumber}>
                    <button onClick={() => handlePageChange(currentNumber)} aria-current={currentNumber === pagination.currentPage ? "page" : undefined} className={`flex items-center justify-center px-3 h-8 leading-tight ${colorClasses}`}>
                      {currentNumber}
                    </button>
                  </li>
                );
              })}
              <li>
                <button disabled={pagination.currentPage === pagination.totalPages} onClick={() => handlePageChange(pagination.currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Pagination;
