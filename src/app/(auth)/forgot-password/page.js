"use client";

import { forgotPassword } from "@/services/auth";
import { Input } from "@/components/Form/Input/Input";
import { DefaultButton } from "@/components/Button/DefaultButton";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { useForm } from "@/hooks/useForm";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";

export default function ForgotPassword() {
  const { setIsLoading } = useIsLoading();

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
        setGlobalMessage({ type: "success", text: "Un email de réinitialisation a été envoyé à votre adresse." });
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
      <form className="space-y-6" onSubmit={handleForgotPassword}>
        <AuthHeading1 title="Mot de passe oublié" />
        <div className="flex flex-col bg-white w-full sm:p-10 gap-5 rounded-md">
          {formFields.map((field) => (
            <Input key={field.name} name={field.name} label={field.label} type={field.type} value={formData[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />
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
