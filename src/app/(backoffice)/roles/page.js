"use client";

import DataTable from "@/components/DataTable";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getRolesList } from "@/services/roles";
import { faPenToSquare, faEye, faKey } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const columns = [
  { label: "Rôle", key: "description", sortable: true },
  {
    label: "Actions",
    key: "id",
    actions: [
      {
        key: "view",
        label: "Voir",
        href: "/roles/[id]?mode=view",
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
        href: "/roles/[id]?mode=edit",
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
        key: "editRolePermissions",
        label: "Permissions",
        href: "/roles/[id]/permissions",
        bgColor: "pink",
        icon: faKey,
        replacePatterns: [
          {
            pattern: /\[id\]/,
            field: "id",
          },
        ],
      },
    ],
  },
];
const paginationLimits = [10, 25, 50];
const defaultFilters = {
  orderBy: "id",
  orderDir: "asc",
  page: 1,
  limit: 25,
};

const addAction = {
  key: "add",
  label: "Ajouter rôle",
  bgColor: "red",
  href: "/roles/new",
  openingType: "popup",
  popupModalStyle: {
    top: "15%",
    height: "65%",
  },
  childDivMaxWidthClass: "max-w-3xl",
};

export default function RolesList() {
  const { isLoading, setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Rôles");
  });

  return (
    <>
      <ClientMeta title={title} description="Liste des rôles" />
      <div>
        <DataTable columns={columns} fetchData={getRolesList} setIsLoading={setIsLoading} isLoading={isLoading} paginationLimits={paginationLimits} defaultFilters={defaultFilters} addAction={addAction} />
      </div>
    </>
  );
}
