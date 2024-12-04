import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils/miscellaneousFunctions";
import { usePopup } from "@/context/PopupContext";
import DeletePopup from "../Popup/DeletePopup";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import TableTr from "./TableBody/TableBodyTr";
import TableTd from "./TableBody/TableBodyTd";
import TableTdContent from "./TableBody/TableBodyTdContent";
import TableHeadTh from "./TableHead/TableHeadTh";
import TableHeadThContent from "./TableHead/TableHeadThContent";
import Pagination from "./Pagination";
import Filters from "./Filters";

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

const DataTable = ({ columns, fetchData, deleteItem, setIsLoading, isLoading, paginationLimits, defaultFilters }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [tempFilters, setTempFilters] = useState(defaultFilters); // État temporaire pour les entrées utilisateur
  const { openPopup, closePopup } = usePopup();
  const [addFiltersRow, setAddFiltersRow] = useState(false);

  useEffect(() => {
    const hasFilters = columns.some((col) => col.search);
    if (hasFilters !== addFiltersRow) {
      setAddFiltersRow(hasFilters); // Met à jour l'état si nécessaire
    }
  }, [columns, addFiltersRow, setAddFiltersRow]);

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

  // Ouvre la pop-up de suppression avec l'élément sélectionné
  const handleDeleteClick = (item, itemDescription) => {
    openPopup(<DeletePopup item={item} itemDescription={itemDescription} onDeleteConfirm={handleDeleteConfirm} closePopup={closePopup} />);
  };

  // Fonction pour supprimer un item
  const handleDeleteConfirm = async (itemId) => {
    setIsLoading(true);
    try {
      const response = await deleteItem(itemId);
      if (response) {
        // Mettre à jour localement la liste après suppression
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        closePopup();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

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
                  <TableHead>
                    <tr key="tableLabelsRow">
                      {columns.map((col) => (
                        <TableHeadTh key={col.key} onClick={col.sortable ? () => handleSort(col.key) : null}>
                          <TableHeadThContent thType="label" col={col} filters={tempFilters} />
                        </TableHeadTh>
                      ))}
                    </tr>
                    {addFiltersRow ? (
                      <tr key="tableSearchRow">
                        {columns.map((col) => (
                          <TableHeadTh key={col.key}>
                            <TableHeadThContent thType="filter" col={col} filters={tempFilters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
                          </TableHeadTh>
                        ))}
                      </tr>
                    ) : (
                      ""
                    )}
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableTr key="loadingDataTr">
                        <TableTd colSpan={columns.length} key="loadingDataTd">
                          Chargement...
                        </TableTd>
                      </TableTr>
                    ) : items.length > 0 ? (
                      items.map((item) => (
                        <TableTr key={item.id}>
                          {columns.map((col) => (
                            <TableTd key={col.key}>
                              <TableTdContent col={col} item={item} onDeleteClick={handleDeleteClick} />
                            </TableTd>
                          ))}
                        </TableTr>
                      ))
                    ) : (
                      <TableTr key="noResultsTr">
                        <TableTd colSpan={columns.length} key="noResultsTd">
                          Aucun résultat trouvé
                        </TableTd>
                      </TableTr>
                    )}
                  </TableBody>
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
