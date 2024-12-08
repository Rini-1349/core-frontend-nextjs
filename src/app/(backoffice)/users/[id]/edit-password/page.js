"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { editUserPassword, getUserDetails } from "@/services/users";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState(null);
  const [formFields, setFormFields] = useState([
    { name: "newPassword", label: "Nouveau mot de passe", type: "password", icon: faKey },
    { name: "confirmNewPassword", label: "Confirmation nouveau mot de passe", type: "password", icon: faKey },
  ]);

  const validate = (data) => {
    const errors = {};
    if (data.newPassword !== data.confirmNewPassword) errors.confirmNewPassword = "Les mots de passe ne correspondent pas.";
    return errors;
  };

  const { title, setTitle } = useTitle();
  // Définir le titre de la page en fonction du mode
  useEffect(() => {
    setTitle(`Modification mot de passe`);
  }, []);

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
            setTitle(`Modification mot de passe - ${response.lastname} ${response.firstname}`);
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

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      let response;
      response = await editUserPassword({ id, data: values });

      return { type: "success", text: "Mot de passe modifié avec succès" };
    } catch (error) {
      console.log(error);
      console.log("Edit password failed", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  return (
    <div>
      <ClientMeta title={title} />
      <div className="flex">
        <DefaultButton
          type="button"
          title="Retour à l'utilisateur"
          onClick={() => {
            window.location.href = `/${getFrenchSlug("users/")}/${user.id}?mode=edit`;
          }}
          btnStyle="primary"
          widthClass=""
          className="mb-5"
        />
      </div>
      <Form fields={formFields} item={user} validate={validate} onSubmit={handleSubmit} isReadOnly={false} setMode="edit" />
    </div>
  );
}
