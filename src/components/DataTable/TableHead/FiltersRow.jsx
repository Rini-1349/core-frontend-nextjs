/**
 * FiltersRow component
 *
 * @returns {JSX.Element}
 */
const FiltersRow = ({ col, filters, onFilterChange, handleClearFilters }) => {
  let content = "";
  switch (col.search) {
    case "input":
      content = <input type="text" value={filters[col.key]} onChange={(e) => onFilterChange(col.key, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200" />;
      break;
    case "select":
      content = (
        <select value={filters.is_verified} onChange={(e) => onFilterChange(col.key, e.target.value)} className="relative z-20 inline-flex bg-transparent px-0 font-medium text-gray-500 outline-2 outline-transparent outline-offset-2 border border-gray-400 rounded-md p-1">
          {Object.keys(col.selectData).map((key) => (
            <option key={key} value={key}>
              {col.selectData[key]}
            </option>
          ))}
        </select>
      );
      break;
    case "clearFilters":
      content = (
        <button onClick={handleClearFilters} className="ml-2 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center text-white bg-amber-500 hover:bg-amber-600 focus:ring-amber-200">
          Réinitialiser les filtres
        </button>
      );
      break;
  }

  return (
    <th key={`filters-${col.key}`} className="px-2 pb-3 text-left text-xs font-medium text-gray-500 uppercase">
      {content}
    </th>
  );
};

export default FiltersRow;
