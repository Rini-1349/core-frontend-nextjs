"use client";

import DataTable from "@/components/DataTable";
import { useIsLoading } from "@/context/LoadingContext";
import { getUsersList } from "@/services/users";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
        label: "Modifier",
        href: "#",
        bgColor: "cyan",
        icon: faPenToSquare,
      },
      {
        label: "Supprimer",
        href: "#",
        bgColor: "red",
        icon: faTrashCan,
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

export default function UsersList() {
  const { isLoading, setIsLoading } = useIsLoading();

  return (
    <div>
      <DataTable columns={columns} fetchData={getUsersList} setIsLoading={setIsLoading} isLoading={isLoading} paginationLimits={paginationLimits} defaultFilters={defaultFilters} />
    </div>
  );
}
