"use client";

import { DefaultButton } from "@/components/Button/DefaultButton";
import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { getFrenchSlug } from "@/lib/slugUtils";
import { editProfilePassword } from "@/services/users";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function EditProfilePassword() {
  const { isLoading, setIsLoading } = useIsLoading();

  const [formFields, setFormFields] = useState([
    { name: "currentPassword", label: "Ancien mot de passe", type: "password", breakAfter: true, icon: faKey },
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
    setTitle(`Profil - Modification mot de passe`);
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      let response;
      response = await editProfilePassword({ data: values });
      return { type: "success", text: response.message };
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
          title="Retour à mon profil"
          onClick={() => {
            window.location.href = `/${getFrenchSlug("profile")}`;
          }}
          btnStyle="primary"
          widthClass=""
          className="mb-5"
        />
      </div>
      <Form fields={formFields} item={{}} validate={validate} onSubmit={handleSubmit} isReadOnly={false} setMode="edit" />
    </div>
  );
}
