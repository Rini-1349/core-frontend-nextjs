import { useEffect, useState } from "react";
import ColumnLabel from "./ColumnLabel";
import FiltersRow from "./FiltersRow";

/**
 * TableHead component
 *
 * @returns {JSX.Element}
 */
const TableHead = ({ columns, filters, onFilterChange, handleSort, handleClearFilters }) => {
  const [addFiltersRow, setAddFiltersRow] = useState(false);

  useEffect(() => {
    const hasFilters = columns.some((col) => col.search);
    if (hasFilters !== addFiltersRow) {
      setAddFiltersRow(hasFilters); // Met à jour l'état si nécessaire
    }
  }, [columns, addFiltersRow, setAddFiltersRow]);

  return (
    <thead className="bg-gray-100">
      <tr key="tableLabelsRow">
        {columns.map((col) => (
          <ColumnLabel key={`label-${col.key}`} col={col} filters={filters} handleSort={handleSort} />
        ))}
      </tr>
      {addFiltersRow ? (
        <tr key="tableSearchRow">
          {columns.map((col) => (
            <FiltersRow key={`filters-${col.key}`} col={col} filters={filters} onFilterChange={onFilterChange} handleClearFilters={handleClearFilters} />
          ))}
        </tr>
      ) : (
        ""
      )}
    </thead>
  );
};

export default TableHead;
