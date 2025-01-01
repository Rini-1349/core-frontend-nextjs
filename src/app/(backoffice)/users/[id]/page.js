"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ModalHeading from "@/components/Heading/ModalHeading";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useSession } from "@/context/SessionContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { createUser, getRolesList, getUserDetails, updateUser } from "@/services/users";
import { isAuthorizedRoute } from "@/utils/routesHelper";
import { hasSessionExpired } from "@/utils/session";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faAt, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function UserDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const { session } = useSession();

  const [user, setUser] = useState(null);
  const [rolesList, setRolesList] = useState([]);
  const [mode, setMode] = useState(id === "new" ? "add" : searchParams.get("mode") === "edit" ? "edit" : "view");
  const [isModal] = useState(searchParams.get("modal") === "true" ? true : false);
  const isReadOnly = mode === "view"; // Mode lecture seule si 'view'

  const validate = (data) => {
    const errors = {};
    if (!data.lastname) errors.lastname = "Le nom est obligatoire.";
    if (!data.firstname) errors.firstname = "Le prénom est obligatoire.";
    if (!data.email) errors.email = "L'adresse email est obligatoire.";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (!data.roles) errors.roles = "Vous devez sélectionner au moins un rôle.";
    return errors;
  };

  const { title, setTitle } = useTitle();

  // Générer formFields dynamiquement
  const formFields = useMemo(() => [
    { name: "lastname", label: "Nom", type: "text", icon: faUser },
    { name: "firstname", label: "Prénom", type: "text", icon: faUserRegular },
    { name: "email", label: "Email", type: "email", icon: faAt },
    { name: "is_verified", label: "Adresse email vérifiée", type: "toggle" },
    ...(mode === "add"
      ? [
          { name: "password", label: "Mot de passe", type: "password", icon: faKey },
          { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", icon: faKey },
        ]
      : []),
    {
      name: "roles",
      label: "Rôles",
      type: "checkbox-multiple",
      options: { ...rolesList }, // Synchro directe avec rolesList
      breakAfter: true,
    },
  ]);

  // Définir le titre de la page en fonction du mode
  useEffect(() => {
    if (mode === "view") {
      setTitle("Détails utilisateur");
    } else if (mode === "edit") {
      setTitle("Modifier utilisateur");
    } else if (mode === "add") {
      setTitle("Ajouter utilisateur");
    }
  }, [mode]);

  // Récupération des données utilisateur
  useEffect(() => {
    if (id && id !== "new") {
      // Fonction pour récupérer les données
      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await getUserDetails(id);
          if (response) {
            setUser(response.data.user);
            setRolesList(response.data.roles);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false); // Désactiver le loader
        }
      };

      loadData();
    } else if (mode === "add") {
      // Récupère la liste des rôles
      const loadRolesList = async () => {
        setIsLoading(true);
        try {
          const response = await getRolesList();
          console.log(response);
          if (response) {
            setRolesList(response.data);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false); // Désactiver le loader
        }
      };

      loadRolesList();
      setUser({ lastname: "", firstname: "", email: "", is_verified: 0, roles: [] }); // Formulaire vide pour ajout
    }
  }, [id, mode]);

  if (!user) return <div></div>;

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
        response = await updateUser({ id, data: values });
      } else if (mode === "add") {
        response = await createUser(values);
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
      return { type: "success", text: response.message, redirectUrl: mode === "add" && !isModal ? `/${getFrenchSlug("users")}/${response.id}` : "" };
    } catch (error) {
      console.log(error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div>
      <ClientMeta title={title} />
      <ModalHeading title={title} isModal={isModal} />
      <Form fields={formFields} item={user} validate={validate} onSubmit={handleSubmit} isReadOnly={isReadOnly} setMode={setMode}>
        {mode === "edit" && isAuthorizedRoute({ pathname: `/users/${user.id}/edit-password` }, session) && (
          <div className="flex">
            <DefaultButton
              type="button"
              title="Modifier mot de passe"
              onClick={() => {
                window.location.href = getFrenchSlug(`/users/${user.id}/edit-password${isModal ? "?modal=true" : ""}`);
              }}
              btnStyle="warning"
            />
          </div>
        )}
      </Form>
    </div>
  );
}
