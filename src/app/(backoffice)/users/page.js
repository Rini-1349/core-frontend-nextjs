"use client";

import DataTable from "@/components/DataTable";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { deleteUser, getUsersList } from "@/services/users";
import { faTrashCan, faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";

const paginationLimits = [10, 25, 50];
const defaultFilters = {
  search: "",
  lastname: "",
  firstname: "",
  email: "",
  orderBy: "id",
  orderDir: "asc",
  is_verified: "all",
  roles_descriptions: "all",
  page: 1,
  limit: 25,
};

const addAction = {
  key: "add",
  label: "Ajouter utilisateur",
  bgColor: "red",
  href: "/users/new",
  openingType: "popup",
  popupModalStyle: {
    top: "10%",
    height: "73%",
  },
  childDivMaxWidthClass: "max-w-3xl",
};

export default function UsersList() {
  const { isLoading, setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();
  const [rolesList, setRolesList] = useState([]);
  const [getRoles, setGetRoles] = useState(true);

  const columns = useMemo(() => [
    { label: "Nom", key: "lastname", sortable: true, search: "input" },
    { label: "Prénom", key: "firstname", sortable: true, search: "input" },
    { label: "Email", key: "email", sortable: true, search: "input" },
    { label: "Rôles", key: "roles_descriptions", display: "list", search: "select", selectData: { all: "Tous les rôles", ...rolesList } },
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
          href: "/users/[id]?mode=view",
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
          href: "/users/[id]?mode=edit",
          openingType: "popup",
          popupModalStyle: {
            top: "10%",
            height: "68%",
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
          checkPermission: "removeUser",
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
  ]);

  useEffect(() => {
    setTitle("Utilisateurs");
  });

  const loadData = async (filters) => {
    try {
      const response = await getUsersList(filters, getRoles);
      if (response) {
        if (rolesList.length === 0) {
          setRolesList(response.data.roles);
          setGetRoles(false);
        }
        return { message: response.message, data: response.data.users };
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <ClientMeta title={title} description="Liste des utilisateurs" />
      <div>
        <DataTable columns={columns} fetchData={loadData} deleteItem={deleteUser} setIsLoading={setIsLoading} isLoading={isLoading} paginationLimits={paginationLimits} defaultFilters={defaultFilters} addAction={addAction} />
      </div>
    </>
  );
}
