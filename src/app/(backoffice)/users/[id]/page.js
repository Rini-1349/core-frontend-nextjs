"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useSession } from "@/context/SessionContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { createUser, getUserDetails, updateUser } from "@/services/users";
import { hasSessionExpired } from "@/utils/session";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faAt, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const { session } = useSession();

  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(id === "new" ? "add" : searchParams.get("mode") === "edit" ? "edit" : "view");
  const [isModal, setIsModal] = useState(searchParams.get("modal") === "true" ? true : false);
  const isReadOnly = mode === "view"; // Mode lecture seule si 'view'
  const [formFields, setFormFields] = useState();

  const validate = (data) => {
    const errors = {};
    if (!data.lastname) errors.lastname = "Le nom est obligatoire.";
    if (!data.firstname) errors.firstname = "Le prénom est obligatoire.";
    if (!data.email) errors.email = "L'adresse email est obligatoire.";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    return errors;
  };

  const { title, setTitle } = useTitle();

  // Définir le titre de la page en fonction du mode
  useEffect(() => {
    setFormFields([
      { name: "lastname", label: "Nom", type: "text", icon: faUser },
      { name: "firstname", label: "Prénom", type: "text", icon: faUserRegular },
      { name: "email", label: "Email", type: "email", icon: faAt },
      { name: "is_verified", label: "Adresse email vérifiée", type: "toggle" },
    ]);
    if (mode === "view") {
      setTitle("Détails utilisateur");
    } else if (mode === "edit") {
      setTitle("Modifier utilisateur");
    } else if (mode === "add") {
      setTitle("Ajouter utilisateur");
      setFormFields((prev) => [...prev, { name: "password", label: "Mot de passe", type: "password", icon: faKey }, { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", icon: faKey }]);
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
            setUser(response.data);
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false); // Désactiver le loader
        }
      };

      loadData();
    } else if (mode === "add") {
      setUser({ lastname: "", firstname: "", email: "", is_verified: 0 }); // Formulaire vide pour ajout
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
          data: response,
          mode: mode,
          showAlert: false,
          closePopupTimeout: 2000,
        });
      }
      return { type: "success", text: response.message, redirectUrl: mode === "add" && !isModal ? `/${getFrenchSlug("users")}/${response.id}` : "" };
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
      <Form fields={formFields} item={user} validate={validate} onSubmit={handleSubmit} isReadOnly={isReadOnly} setMode={setMode}>
        {mode === "edit" && !isModal && (
          <div className="flex">
            <DefaultButton
              type="button"
              title="Modifier mot de passe"
              onClick={() => {
                window.location.href = `/${getFrenchSlug("users/")}/${user.id}/${getFrenchSlug("edit-password/")}`;
              }}
              btnStyle="warning"
            />
          </div>
        )}
      </Form>
    </div>
  );
}
