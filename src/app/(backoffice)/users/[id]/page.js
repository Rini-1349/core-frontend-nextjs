"use client";

import Form from "@/components/Form";
import { useIsLoading } from "@/context/LoadingContext";
import { getUserDetails, updateUser } from "@/services/users";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();

  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(searchParams.get("mode") === "edit" ? "edit" : "view");
  const [isModal, setIsModal] = useState(searchParams.get("modal") === "true" ? true : false);
  const isReadOnly = mode === "view"; // Mode lecture seule si 'view'

  const validate = (data) => {
    const errors = {};
    if (!data.lastname) errors.lastname = "Le nom est obligatoire.";
    if (!data.firstname) errors.firstname = "Le prénom est obligatoire.";
    if (!data.email) errors.email = "L'adresse email est obligatoire.";
    return errors;
  };

  // Récupération des données utilisateur
  useEffect(() => {
    if (id) {
      // Fonction pour récupérer les données
      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await getUserDetails(id);
          if (response) {
            setUser(response);
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

  if (!user) return <div></div>;

  const formFields = [
    { name: "lastname", label: "Nom", type: "text", icon: faUser },
    { name: "firstname", label: "Prénom", type: "text", icon: faUserRegular },
    { name: "email", label: "Email", type: "email", icon: faAt },
    { name: "is_verified", label: "Adresse email vérifiée", type: "toggle" },
  ];

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const response = await updateUser({ id, data: values });
      // Si ouverture en modale : envoi des informations à la page parente
      if (isModal) {
        window.parent.postMessage({
          type: "formSubmissionSuccess",
          data: response,
          mode: mode,
        });
      }
      return { type: "success", text: "Mise à jour effectuée" };
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
      <h1>{isReadOnly ? "Détails de l’utilisateur" : "Modifier l’utilisateur"}</h1>
      <Form fields={formFields} item={user} validate={validate} onSubmit={handleSubmit} isReadOnly={isReadOnly} setMode={setMode} />
    </div>
  );
}
