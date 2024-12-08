"use client";

import DataTable from "@/components/DataTable";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { deleteUser, getUsersList } from "@/services/users";
import { faTrashCan, faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const columns = [
  { label: "Nom", key: "lastname", sortable: true, search: "input" },
  { label: "Prénom", key: "firstname", sortable: true, search: "input" },
  { label: "Email", key: "email", sortable: true, search: "input" },
  {
    label: "Vérifié",
    key: "is_verified",
    search: "select",
    selectData: { all: "Tout", 0: "Non", 1: "Oui" },
    boolean: {
      true: "Oui",
      false: "Non",
    },
  },
  {
    label: "Actions",
    key: "id",
    search: "clearFilters",
    actions: [
      {
        key: "view",
        label: "Voir",
        href: `/${getFrenchSlug("users/new")}/[id]?mode=view`,
        openingType: "popup",
        popupModalStyle: {
          top: "15%",
          height: "65%",
        },
        childDivMaxWidthClass: "max-w-3xl",
        bgColor: "cyan",
        icon: faEye,
        replacePatterns: [
          {
            pattern: /\[id\]/,
            field: "id",
          },
        ],
      },
      {
        key: "edit",
        label: "Modifier",
        href: `/${getFrenchSlug("users/new")}/[id]?mode=edit`,
        openingType: "popup",
        popupModalStyle: {
          top: "15%",
          height: "65%",
        },
        childDivMaxWidthClass: "max-w-3xl",
        bgColor: "indigo",
        icon: faPenToSquare,
        replacePatterns: [
          {
            pattern: /\[id\]/,
            field: "id",
          },
        ],
      },
      {
        key: "delete",
        label: "Supprimer",
        bgColor: "red",
        icon: faTrashCan,
        itemDescription: 'l\'utilisateur "[firstname] [lastname]"',
        replacePatterns: [
          {
            pattern: /\[firstname\]/,
            field: "firstname",
          },
          {
            pattern: /\[lastname\]/,
            field: "lastname",
          },
        ],
      },
    ],
  },
];
const paginationLimits = [10, 25, 50];
const defaultFilters = {
  search: "",
  lastname: "",
  firstname: "",
  email: "",
  orderBy: "id",
  orderDir: "asc",
  is_verified: "all",
  page: 1,
  limit: 25,
};

const addAction = {
  key: "add",
  label: "Ajouter utilisateur",
  bgColor: "red",
  href: `/${getFrenchSlug("users/new")}`,
  openingType: "popup",
  popupModalStyle: {
    top: "15%",
    height: "65%",
  },
  childDivMaxWidthClass: "max-w-3xl",
};

export default function UsersList() {
  const { isLoading, setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Utilisateurs");
  });

  return (
    <>
      <ClientMeta title={title} description="Liste des utilisateur" />
      <div>
        <DataTable columns={columns} fetchData={getUsersList} deleteItem={deleteUser} setIsLoading={setIsLoading} isLoading={isLoading} paginationLimits={paginationLimits} defaultFilters={defaultFilters} addAction={addAction} />
      </div>
    </>
  );
}
