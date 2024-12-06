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
import { useRouter } from "next/navigation";
import { definePopupParams, removeOneItemFromPagination, setPaginationButtons } from "@/utils/dataTableHelpers";
import PopupContainer from "../Popup/PopupContainer";

const DataTable = ({ columns, fetchData, deleteItem, setIsLoading, isLoading, paginationLimits, defaultFilters }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [tempFilters, setTempFilters] = useState(defaultFilters); // État temporaire pour les entrées utilisateur
  const { openPopup, closePopup } = usePopup();
  const [addFiltersRow, setAddFiltersRow] = useState(false);
  const router = useRouter();

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

  // Ecoute des messages envoyés depuis la pop-up (en iframe)
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN) return;
      // Vérifiez le type de message et l'origine pour éviter les problèmes de sécurité
      if (event.data?.type === "formSubmissionSuccess") {
        if (event.data.mode === "edit") {
          const updatedData = event.data.data; // Données reçues (id, firstname, lastname, email, is_verified)

          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === updatedData.id
                ? { ...item, ...updatedData } // Met à jour l'élément si l'ID correspond
                : item
            )
          );
        }
        console.log("Données reçues de l'iframe :", event.data);
        closePopup();
      }
    };

    // Écoutez les messages venant de l'iframe
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [closePopup]);

  // Ouvre la pop-up de suppression avec l'élément sélectionné
  const handleDeleteClick = (item, itemDescription) => {
    openPopup(<DeletePopup item={item} itemDescription={itemDescription} onDeleteConfirm={handleDeleteConfirm} closePopup={closePopup} />);
  };

  // Ouvre le lien dans une autre page ou ouvre la pop-up avec le contenu d'une autre page
  const handleLinkClick = (url, action) => {
    if (action.openingType === "popup") {
      const popupParams = definePopupParams(action);
      openPopup(
        <PopupContainer>
          <iframe src={`${url}${url.includes("?") ? "&" : "?"}modal=true`} style={{ width: "100%", height: "100%" }} />
        </PopupContainer>,
        popupParams
      );
    } else {
      router.push(url);
    }
  };

  // Fonction pour supprimer un item
  const handleDeleteConfirm = async (itemId) => {
    setIsLoading(true);
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        // Mettre à jour localement la liste après suppression
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        const updatedPagination = removeOneItemFromPagination(pagination);
        setPagination(updatedPagination);
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
    <div className="flex flex-col">
      <Filters filters={tempFilters} onFilterChange={handleFilterChange} paginationLimits={paginationLimits} currentLimit={filters.limit} handlePaginationLimit={handlePaginationLimit} />
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table divide-y divide-gray-200">
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
              ) : null}
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
                        <TableTdContent col={col} item={item} onDeleteClick={handleDeleteClick} onLinkClick={handleLinkClick} />
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
      <Pagination pagination={pagination} isLoading={isLoading} handlePageChange={handlePageChange} />
    </div>
  );
};

export default DataTable;
