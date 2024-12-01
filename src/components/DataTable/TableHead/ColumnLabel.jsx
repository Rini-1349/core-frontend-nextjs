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
 * ColumnLabel component
 *
 * @returns {JSX.Element}
 */
const ColumnLabel = ({ col, filters, handleSort }) => {
  const sortable = col.sortable;
  const icon = defineIcon(col, sortable, filters);
  const onClick = sortable ? () => handleSort(col.key) : null;

  return (
    <th key={`label-${col.key}`} onClick={onClick} scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
      {col.label}
      {sortable && <FontAwesomeIcon className="ml-2" icon={icon} />}
    </th>
  );
};

export default ColumnLabel;
