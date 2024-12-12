"use client";

import { forgotPassword } from "@/services/auth";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useTitle } from "@/context/TitleContext";
import { useEffect } from "react";
import Form from "@/components/Form";

/**
 * ForgotPassword page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ForgotPassword() {
  const { setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Mot de passe oublié");
  });

  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    return errors;
  };

  const handleForgotPassword = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const response = await forgotPassword({ email: values.username });
      if (response) {
        return { type: "success", text: response.message };
      }
    } catch (error) {
      console.log("Erreur lors de la demande de réinitialisation", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [{ name: "username", label: "Adresse email", type: "text", required: true, widthClass: "full" }];
  const submitButton = {
    title: "Envoyer",
    widthClass: "w-full",
    btnStyle: "primary",
  };
  const formStyle = {
    formDivClassName: "flex flex-col bg-white w-full rounded-md",
  };

  return (
    <div className="px-2">
      <ClientMeta title={title} />
      <AuthHeading1 title="Mot de passe oublié" className="mb-10" />
      <Form fields={formFields} item={{}} validate={validate} onSubmit={handleForgotPassword} isReadOnly={false} submitButton={submitButton} formStyle={formStyle} onSubmitResponseDisplayType="globalMessage" />

      <p className="text-sm text-gray-500 mt-5 px-2">
        <Link href={`/${getFrenchSlug("login")}`} className="text-blue-700 hover:underline dark:text-blue-500">
          Retour à la page de connexion
        </Link>
      </p>
    </div>
  );
}
