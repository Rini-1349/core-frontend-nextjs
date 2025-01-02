/**
 * Filters component
 *
 * @returns {JSX.Element}
 */
const Filters = ({ filters, onFilterChange, paginationLimits, currentLimit, handlePaginationLimit }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-md sm:flex-1 overflow-hidden rounded-md">
        <input type="text" placeholder="Rechercher..." value={filters.search} onChange={(e) => onFilterChange("search", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200" />
      </div>

      <div className="flex items-center gap-2 font-medium text-gray-800 sm:ml-4">
        <label>
          <select value={currentLimit} onChange={(e) => handlePaginationLimit(e.target.value)} className="relative z-20 inline-flex bg-transparent px-0 font-medium text-gray-500 outline-2 outline-transparent outline-offset-2 border border-gray-400 rounded-md p-1">
            {paginationLimits.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
          <span className="ml-2">résultats par page</span>
        </label>
      </div>
    </div>
  );
};

export default Filters;
