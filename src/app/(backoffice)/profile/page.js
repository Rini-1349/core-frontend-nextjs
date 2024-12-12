"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { getProfile, updateProfile } from "@/services/users";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import { faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Profile() {
  const { isLoading, setIsLoading } = useIsLoading();
  const [user, setUser] = useState(null);

  const validate = (data) => {
    const errors = {};
    if (!data.lastname) errors.lastname = "Le nom est obligatoire.";
    if (!data.firstname) errors.firstname = "Le prénom est obligatoire.";
    if (!data.email) errors.email = "L'adresse email est obligatoire.";
    return errors;
  };

  const { title, setTitle } = useTitle();
  useEffect(() => {
    setTitle("Mon profil");
  }, []);

  const formFields = [
    { name: "lastname", label: "Nom", type: "text", icon: faUser },
    { name: "firstname", label: "Prénom", type: "text", icon: faUserRegular },
    { name: "email", label: "Email", type: "email", breakAfter: true, icon: faAt },
  ];

  // Récupération des données utilisateur
  useEffect(() => {
    // Fonction pour récupérer les données
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await getProfile();
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
  }, []);

  if (!user) return <div></div>;

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const response = await updateProfile({ data: values });

      return { type: "success", text: response.message };
    } catch (error) {
      console.log(error);
      console.log("Profile update failed", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div>
      <ClientMeta title={title} />
      <Form fields={formFields} item={user} validate={validate} onSubmit={handleSubmit} isReadOnly={false} setMode="edit">
        <div className="flex">
          <DefaultButton
            type="button"
            title="Modifier mot de passe"
            onClick={() => {
              window.location.href = `/${getFrenchSlug("profile/")}/${getFrenchSlug("edit-password/")}`;
            }}
            btnStyle="warning"
          />
        </div>
      </Form>
    </div>
  );
}
