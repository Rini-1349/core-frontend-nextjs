"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useSession } from "@/context/SessionContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { createRole, getRoleDetails, updateRole } from "@/services/roles";
import { hasSessionExpired } from "@/utils/session";
import { faCode, faSignature } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoleDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const { session } = useSession();

  const [role, setRole] = useState(null);
  const [mode, setMode] = useState(id === "new" ? "add" : searchParams.get("mode") === "edit" ? "edit" : "view");
  const [isModal, setIsModal] = useState(searchParams.get("modal") === "true" ? true : false);
  const isReadOnly = mode === "view"; // Mode lecture seule si 'view'
  const [formFields, setFormFields] = useState();

  const validate = (data) => {
    const errors = {};
    if (!data.description) errors.description = "Le nom du rôle est obligatoire.";
    if (mode === "add") {
      if (!data.id || data.id.length < 1 || data.id.length > 15) {
        errors.id = "La clef doit contenir entre 1 et 15 caractères.";
      }
    }
    return errors;
  };

  const { title, setTitle } = useTitle();

  // Définir le titre de la page en fonction du mode
  useEffect(() => {
    setFormFields([{ name: "description", label: "Nom", type: "text", icon: faSignature }]);
    if (mode === "view") {
      setTitle("Détails rôle");
    } else if (mode === "edit") {
      setTitle("Modifier rôle");
    } else if (mode === "add") {
      setTitle("Ajouter rôle");
      setFormFields((prev) => [...prev, { name: "id", label: "Clef (15 caractères maximum)", type: "text", minLength: 1, maxLength: 15, icon: faCode }]);
    }
  }, [mode]);

  // Récupération des données utilisateur
  useEffect(() => {
    if (id && id !== "new") {
      // Fonction pour récupérer les données
      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await getRoleDetails(id);
          if (response) {
            setRole(response.data);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false); // Désactiver le loader
        }
      };

      loadData();
    } else if (mode === "add") {
      setRole({ key: "", description: "" }); // Formulaire vide pour ajout
    }
  }, [id, mode]);

  if (!role) return <div></div>;

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader
    if (isModal && hasSessionExpired(session)) {
      window.parent.postMessage({
        type: "expiredSession",
      });
      return {};
    }

    try {
      let response;
      if (mode === "edit") {
        response = await updateRole({ id, data: values });
      } else if (mode === "add") {
        response = await createRole(values);
      }
      // Si ouverture en modale : envoi des informations à la page parente
      if (isModal) {
        window.parent.postMessage({
          type: "formSubmissionSuccess",
          data: response.data,
          mode: mode,
          showAlert: false,
          closePopupTimeout: 2000,
        });
      }
      return { type: "success", text: response.message, redirectUrl: mode === "add" && !isModal ? `/${getFrenchSlug("roles")}/${response.id}` : "" };
    } catch (error) {
      console.log(error);
      console.log("Signup failed", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div>
      <ClientMeta title={title} />
      {isModal && (
        <div className="flex justify-center items-center pb-3 mb-3 border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
      )}
      <Form fields={formFields} item={role} validate={validate} onSubmit={handleSubmit} isReadOnly={isReadOnly} setMode={setMode}>
        {mode === "edit" && !isModal && (
          <div className="flex">
            <DefaultButton
              type="button"
              title="Modifier permissions"
              onClick={() => {
                window.location.href = `/${getFrenchSlug("roles/")}/${role.id}/${getFrenchSlug("permissions")}`;
              }}
              btnStyle="warning"
            />
          </div>
        )}
      </Form>
    </div>
  );
}
