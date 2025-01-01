import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function defineIcon(col, sortable, filters) {
  let icon = null;
  if (sortable) {
    if (filters.orderBy === col.key) {
      icon = filters.orderDir === "asc" ? faSortUp : faSortDown;
    } else {
      icon = faSort;
    }
  }

  return icon;
}

/**
 * TableHeadThContent component
 *
 * @returns {JSX.Element}
 */
const TableHeadThContent = ({ col, filters, thType, onFilterChange, onClearFilters }) => {
  let content = "";
  if (thType === "label") {
    const sortable = col.sortable;
    const icon = defineIcon(col, sortable, filters);
    content = (
      <>
        {col.label}
        {sortable && <FontAwesomeIcon className="ml-2" icon={icon} />}
      </>
    );
  } else if (thType === "filter") {
    switch (col.search) {
      case "input":
        content = <input type="text" value={filters[col.key]} onChange={(e) => onFilterChange(col.key, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200" />;
        break;
      case "select":
        content = (
          <select value={filters[col.key]} onChange={(e) => onFilterChange(col.key, e.target.value)} className="relative z-20 inline-flex px-0 font-medium text-gray-500 outline-2 outline-transparent outline-offset-2 border border-gray-400 rounded-md p-1">
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
          <button onClick={onClearFilters} className="ml-2 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center text-white bg-amber-500 hover:bg-amber-600 focus:ring-amber-200">
            Réinitialiser les filtres
          </button>
        );
        break;
    }
  }

  return <>{content}</>;
};

export default TableHeadThContent;
