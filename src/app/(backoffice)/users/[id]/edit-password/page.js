"use client";

import Form from "@/components/Form";
import ModalHeading from "@/components/Heading/ModalHeading";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useIsLoading } from "@/context/LoadingContext";
import { useSession } from "@/context/SessionContext";
import { useTitle } from "@/context/TitleContext";
import { editUserPassword, getUserDetails } from "@/services/users";
import { hasSessionExpired } from "@/utils/session";
import { validateConfirmPassword, validatePassword } from "@/utils/validationHelpers";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { isLoading, setIsLoading } = useIsLoading();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const [isModal, setIsModal] = useState(searchParams.get("modal") === "true" ? true : false);
  const { session } = useSession();

  const [user, setUser] = useState(null);
  const [formFields, setFormFields] = useState([
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
    setTitle(`Modification mot de passe - ${user?.lastname || ""} ${user?.firstname || ""}`);
  }, [user]);

  // Récupération des données utilisateur
  useEffect(() => {
    if (id) {
      // Fonction pour récupérer les données
      const loadData = async () => {
        setIsLoading(true);
        try {
          const response = await getUserDetails(id);
          if (response) {
            setUser(response.data.user);
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
    if (isModal && hasSessionExpired(session)) {
      window.parent.postMessage({
        type: "expiredSession",
      });
      return {};
    }

    try {
      let response;
      response = await editUserPassword({ id, data: values });

      // Si ouverture en modale : envoi des informations à la page parente
      if (isModal) {
        window.parent.postMessage({
          type: "formSubmissionSuccess",
          data: response.data,
          mode: "edit",
          showAlert: false,
          closePopupTimeout: 2000,
        });
      }

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
      <ModalHeading title={title} isModal={isModal} />
      <Form fields={formFields} item={user} validate={validate} validateOnChange={validateOnChange} onSubmit={handleSubmit} setMode="edit" />
    </div>
  );
}
