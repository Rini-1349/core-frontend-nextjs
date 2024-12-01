import React, { useState, useEffect, useCallback } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { debounce } from "@/utils/miscellaneousFunctions";

// Maximum 5 pagination page buttons
function setPaginationButtons(pagination) {
  if (pagination.currentPage < 3) {
    pagination.firstPageButton = 1;
  } else {
    pagination.firstPageButton = pagination.currentPage - 2;
  }
  if (pagination.firstPageButton + 4 > pagination.totalPages) {
    pagination.lastPageButton = pagination.totalPages;
  } else {
    pagination.lastPageButton = pagination.firstPageButton + 4;
  }

  return pagination;
}

const DataTable = ({ columns, fetchData, setIsLoading, isLoading, paginationLimits, defaultFilters }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [tempFilters, setTempFilters] = useState(defaultFilters); // État temporaire pour les entrées utilisateur

  // Fonction pour récupérer les données
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(filters);
      if (response) {
        let updatedPagination = { ...response.pagination };
        updatedPagination = setPaginationButtons(updatedPagination);

        setPagination(updatedPagination);
        setItems(response.items);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  // Charger les données au montage ou lors d'un changement des filtres
  useEffect(() => {
    loadData();
  }, [filters]);

  // Fonction de gestion de la recherche avec debounce (500ms)
  const debouncedUpdateFilters = useCallback(
    debounce((updatedFilters) => {
      setFilters(updatedFilters);
    }, 600),
    [] // Création d'une seule fois pour toute la durée du composant
  );

  // Fonction pour gérer les changements de filtre
  const handleFilterChange = (key, value) => {
    setTempFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: value };
      console.log(value);
      // Appelle immédiatement la fonction debounced avec les filtres mis à jour
      debouncedUpdateFilters(updatedFilters);

      return updatedFilters; // Met à jour `tempFilters`
    });
  };

  // Gestion du tri
  const handleSort = (column) => {
    let previousFilters = filters;
    const isSameColumn = previousFilters.orderBy === column;
    const newOrderDir = isSameColumn && previousFilters.orderDir === "asc" ? "desc" : "asc";

    setTempFilters({ ...filters, orderBy: column, orderDir: newOrderDir });
    setFilters({ ...filters, orderBy: column, orderDir: newOrderDir });
  };

  // Gestion de la page de pagination souhaitée
  const handlePageChange = (newPage) => {
    setTempFilters({ ...filters, page: newPage });
    setFilters({ ...filters, page: newPage });
  };

  // Gestion du nombre de résultats dans la pagination
  const handlePaginationLimit = (newLimit) => {
    setTempFilters({ ...filters, limit: newLimit });
    setFilters({ ...filters, limit: newLimit });
  };

  const handleClearFilters = () => {
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <>
      <div>
        <Filters filters={tempFilters} onFilterChange={handleFilterChange} paginationLimits={paginationLimits} currentLimit={filters.limit} handlePaginationLimit={handlePaginationLimit} />
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <TableHead columns={columns} filters={tempFilters} onFilterChange={handleFilterChange} handleSort={handleSort} handleClearFilters={handleClearFilters} />
                  <TableBody items={items} columns={columns} isLoading={isLoading} />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination pagination={pagination} isLoading={isLoading} handlePageChange={handlePageChange} />
    </>
  );
};

export default DataTable;
