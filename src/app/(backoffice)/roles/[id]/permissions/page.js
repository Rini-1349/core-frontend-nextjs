"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import TableBody from "@/components/DataTable/TableBody/TableBody";
import TableBodyTd from "@/components/DataTable/TableBody/TableBodyTd";
import TableBodyTr from "@/components/DataTable/TableBody/TableBodyTr";
import TableHead from "@/components/DataTable/TableHead/TableHead";
import TableHeadTh from "@/components/DataTable/TableHead/TableHeadTh";
import TableHeadThContent from "@/components/DataTable/TableHead/TableHeadThContent";
import { Checkbox } from "@/components/Form/Input/Checkbox";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useAlert } from "@/context/AlertContext";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { getRolePermissions, updateRolePermissions } from "@/services/roles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function setCheckboxesFromRolePermissionsData(rolePermissionsData) {
  const checkboxes = {};

  // Parcourez les propriétés de l'objet principal (ici "users")
  for (const [entity, entityData] of Object.entries(rolePermissionsData)) {
    // Créez un objet pour chaque entité
    const actions = entityData.actions;
    const newEntityData = {};
    // Parcourez les actions de l'entité (read, write, etc.)
    for (const [permission, permissionData] of Object.entries(actions)) {
      // Récupérez la valeur de "is_authorized" et assignez-la à l'entité et permission
      newEntityData[permission] = permissionData.is_authorized;
    }
    // Ajoutez l'entité transformée à l'objet final
    checkboxes[entity] = newEntityData;
  }

  return checkboxes;
}

export default function Permissions() {
  const { setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const { showAlert } = useAlert();

  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [rolePermissionsMode, setRolePermissionsMode] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});

  const { title, setTitle } = useTitle();
  // Définir le titre de la page en fonction du mode
  useEffect(() => {
    setTitle(`Permissions rôle`);
  }, []);

  // Récupération des données du rôle + permissions
  useEffect(() => {
    if (id) {
      // Fonction pour récupérer les données
      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await getRolePermissions(id);
          if (response) {
            setRole(response.data.role);
            setPermissions(response.data.rolePermissions);
            setRolePermissionsMode(response.data.rolePermissionsMode);
            setCheckboxes(setCheckboxesFromRolePermissionsData(response.data.rolePermissions));
            setTitle(`Permissions rôle "${response.data.role.description}"`);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false); // Désactiver le loader
        }
      };

      loadData();
    }
  }, [id]);

  if (!role || !permissions) return <div></div>;

  const handleToggleColumn = (columnNumber, isChecked) => {
    const rows = document.querySelectorAll("table tbody tr"); // Sélectionne toutes les lignes du tableau dans le tbody
    console.log(isChecked);
    rows.forEach((row) => {
      const checkbox = row.querySelector(`td:nth-child(${columnNumber}) input[type="checkbox"]`); // Cible la cellule correspondante et trouve l'input
      if (checkbox) {
        checkbox.checked = isChecked; // Modifie l'état de la checkbox
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    const structuredData = Object.keys(checkboxes).reduce((acc, entity) => {
      acc[entity] = {};
      Object.keys(checkboxes[entity]).forEach((permission) => {
        const checkboxName = `${entity}[${permission}]`; // Nom attendu dans FormData
        acc[entity][permission] = entries[checkboxName] === "on"; // Vérifie si coché
      });
      return acc;
    }, {});

    setIsLoading(true); // Activer le loader
    try {
      let response;
      response = await updateRolePermissions({ id: id, data: structuredData });
      showAlert({ type: "success", text: response.message });
    } catch (error) {
      console.log(error);
      console.log("Edit role permissions failed", error);
      showAlert({ type: "error", text: error.message });
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div className="flex flex-col">
      <ClientMeta title={title} />
      <div className="flex">
        <DefaultButton
          type="button"
          title="< Retour à la liste des rôles"
          onClick={() => {
            window.location.href = `/${getFrenchSlug("roles")}`;
          }}
          btnStyle="primary"
          widthClass=""
          className="text-xs mb-5"
        />
      </div>
      <div className="table-container">
        <form onSubmit={handleSubmit}>
          <div className="table-wrapper">
            <table className="table divide-y divide-gray-200">
              <TableHead>
                <tr>
                  <TableHeadTh className="pb-1 px-4 p4-4 text-left text-xs font-medium text-gray-500 uppercase">
                    <TableHeadThContent thType="label" col={{ label: "Fonctionnalité" }} />
                  </TableHeadTh>
                  {rolePermissionsMode === "read-write" ? (
                    <>
                      <TableHeadTh className="pb-1 px-4 p4-4 text-left text-xs font-medium text-gray-500 uppercase">
                        <TableHeadThContent thType="label" col={{ label: "Lecture" }} />
                      </TableHeadTh>
                      <TableHeadTh className="pb-1 px-4 p4-4 text-left text-xs font-medium text-gray-500 uppercase">
                        <TableHeadThContent thType="label" col={{ label: "Écriture" }} />
                      </TableHeadTh>
                    </>
                  ) : (
                    <TableHeadTh className="pb-1 px-4 p4-4 text-left text-xs font-medium text-gray-500 uppercase">
                      <TableHeadThContent thType="label" col={{ label: "Droit d'accès" }} />
                    </TableHeadTh>
                  )}
                </tr>
                <tr>
                  <TableHeadTh className="pt-1 px-4 pb-4 text-left text-xs font-medium text-gray-500">(Tout cocher/décocher)</TableHeadTh>
                  {rolePermissionsMode === "read-write" ? (
                    <>
                      <TableHeadTh className="pt-1 px-4 pb-4 text-left text-xs font-medium text-gray-500 uppercase">
                        <Checkbox onChange={(e) => handleToggleColumn(2, e.target.checked)} label="" />
                      </TableHeadTh>
                      <TableHeadTh className="pt-1 px-4 pb-4 text-left text-xs font-medium text-gray-500 uppercase">
                        <Checkbox onChange={(e) => handleToggleColumn(3, e.target.checked)} label="" />
                      </TableHeadTh>
                    </>
                  ) : (
                    <TableHeadTh className="pt-1 px-4 pb-4 text-left text-xs font-medium text-gray-500 uppercase">
                      <Checkbox onChange={(e) => handleToggleColumn(2, e.target.checked)} label="" />
                    </TableHeadTh>
                  )}
                </tr>
              </TableHead>
              <TableBody>
                {Object.entries(permissions).map(([entity, entityParams]) =>
                  rolePermissionsMode === "read-write" ? (
                    // Cas "read-write" : trois colonnes qui intègrent read/write
                    <TableBodyTr key={entity}>
                      <TableBodyTd>{entityParams["description"]}</TableBodyTd>
                      <TableBodyTd>
                        <Checkbox name={`${entity}[read]`} onChange={() => {}} defaultChecked={entityParams["actions"]["read"]["is_authorized"] ? 1 : 0} label="" />
                      </TableBodyTd>
                      <TableBodyTd>
                        <Checkbox name={`${entity}[write]`} onChange={() => {}} defaultChecked={entityParams["actions"]["write"]["is_authorized"] ? 1 : 0} label="" />
                      </TableBodyTd>
                    </TableBodyTr>
                  ) : (
                    // Cas par défaut : deux colonnes pour chaque action
                    Object.entries(entityParams["actions"]).map(([action, actionParams]) => (
                      <TableBodyTr key={`${entity}-${action}`}>
                        <TableBodyTd>{actionParams["description"]}</TableBodyTd>
                        <TableBodyTd>
                          <Checkbox name={`${entity}[${action}]`} onChange={() => {}} defaultChecked={actionParams["is_authorized"] ? 1 : 0} label="" />
                        </TableBodyTd>
                      </TableBodyTr>
                    ))
                  )
                )}
              </TableBody>
            </table>
          </div>
          <div className="mt-4 flex justify-center gap-2 px-2">
            <DefaultButton type="submit" title="Enregistrer" widthClass="" btnStyle="success" />
          </div>
        </form>
      </div>
    </div>
  );
}
