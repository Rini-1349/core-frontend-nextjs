"use client";

import Form from "@/components/Form";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { editProfilePassword } from "@/services/users";
import { validateConfirmPassword, validatePassword } from "@/utils/validationHelpers";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function EditProfilePassword() {
  const { setIsLoading } = useIsLoading();

  const [formFields] = useState([
    { name: "currentPassword", label: "Ancien mot de passe", type: "password", breakAfter: true, icon: faKey },
    { name: "password", label: "Nouveau mot de passe", type: "password", icon: faKey },
    { name: "confirmPassword", label: "Confirmation nouveau mot de passe", type: "password", icon: faKey },
  ]);

  const validate = (data) => {
    const errors = {};
    const passwordError = validatePassword(data.password);
    const confirmPasswordError = validateConfirmPassword("confirmPassword", data.confirmPassword);
    if (passwordError !== "") errors.password = passwordError;
    if (confirmPasswordError !== "") errors.confirmPassword = confirmPasswordError;
    return errors;
  };

  const validateOnChange = (name, value, fieldErrors) => {
    let errors = { password: fieldErrors.password, confirmPassword: fieldErrors.confirmPassword };

    // Validation pour le mot de passe et la confirmation de mot de passe
    if (name === "password" || name === "confirmPassword") {
      errors["password"] = validatePassword(value);
      errors["confirmPassword"] = validateConfirmPassword(name, value);
    }

    return { errors: errors };
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
      <Form fields={formFields} item={{}} validate={validate} validateOnChange={validateOnChange} onSubmit={handleSubmit} setMode="edit" />
    </div>
  );
}
