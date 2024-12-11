"use client";

import { forgotPassword } from "@/services/auth";
import { InputGroup } from "@/components/Form/Input/InputGroup";
import { DefaultButton } from "@/components/Button/DefaultButton";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { useForm } from "@/hooks/useForm";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useTitle } from "@/context/TitleContext";
import { useEffect } from "react";

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

  // Configuration du formulaire
  const initialFormState = { username: "" };
  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    return errors;
  };

  // Gestion via le hook `useForm`
  const { formData, fieldErrors, globalMessage, setGlobalMessage, handleChange, validateForm } = useForm(initialFormState, validate);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setGlobalMessage(null);

    if (!validateForm()) return;

    setIsLoading(true); // Activer le loader

    try {
      const response = await forgotPassword({ email: formData.username });
      if (response) {
        setGlobalMessage({ type: "success", text: response.message });
      }
    } catch (error) {
      console.log("Erreur lors de la demande de réinitialisation", error);
      setGlobalMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [{ name: "username", label: "Adresse email", type: "text", required: true }];

  return (
    <>
      <ClientMeta title={title} />
      <form className="space-y-6" onSubmit={handleForgotPassword}>
        <AuthHeading1 title="Mot de passe oublié" />
        <div className="flex flex-col bg-white w-full sm:p-10 gap-5 rounded-md">
          {formFields.map((field) => (
            <InputGroup key={field.name} name={field.name} label={field.label} type={field.type} value={formData[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />
          ))}

          {/* Messages globaux */}
          <GlobalMessage message={globalMessage} />

          <DefaultButton type="submit" title="Envoyer" className="" />
          <p className="text-sm text-gray-500 mt-3">
            <Link href={`/${getFrenchSlug("login")}`} className="text-blue-700 hover:underline dark:text-blue-500">
              Retour à la page de connexion
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
