"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resetPassword } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Form/Input/Input";
import { DefaultButton } from "@/components/Button/DefaultButton";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { useForm } from "@/hooks/useForm";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";

export default function ResetPassword() {
  const router = useRouter();
  const { setIsLoading } = useIsLoading();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();

  // Configuration du formulaire
  const initialFormState = { password: "", confirmPassword: "" };
  const validate = (data) => {
    const errors = {};
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    return errors;
  };

  // Gestion via le hook `useForm`
  const { formData, fieldErrors, globalMessage, setGlobalMessage, handleChange, validateForm } = useForm(initialFormState, validate);

  // Vérification du token au chargement
  useEffect(() => {
    setIsLoading(true); // Activer le loader

    const verifyTokenOnLoad = async () => {
      try {
        const response = await resetPassword({ checkOnly: true }, queryParams);
        if (response) {
          setIsTokenValid(true);
        }
      } catch (error) {
        console.log(error.message);
        setGlobalMessage({ type: "error", text: error.message });
      } finally {
        setIsLoading(false); // Désactiver le loader
      }
    };

    verifyTokenOnLoad();
  }, [queryParams]);

  // Gestion de la réinitialisation
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setGlobalMessage(null);

    if (!validateForm()) return;

    setIsLoading(true); // Activer le loader

    try {
      const response = await resetPassword({ password: formData.password }, queryParams);
      if (response) {
        setGlobalMessage({ type: "success", text: "Mot de passe réinitialisé avec succès." });
        setIsTokenValid(false);
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      console.error(error.message);
      setGlobalMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "password", label: "Mot de passe", type: "password", required: true },
    { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", required: true },
  ];

  return (
    <>
      <div>
        <AuthHeading1 title="Réinitialisation mot de passe" />

        {isTokenValid ? (
          <form onSubmit={handlePasswordReset}>
            <div className="flex flex-col bg-white w-full sm:p-10 gap-5 rounded-md">
              {formFields.map((field) => (
                <Input key={field.name} name={field.name} label={field.label} type={field.type} value={formData[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />
              ))}

              {/* Messages globaux */}
              <GlobalMessage message={globalMessage} />

              <DefaultButton type="submit" title="Réinitialiser le mot de passe" />
            </div>
          </form>
        ) : (
          <div className="text-sm text-gray-500 mt-3">
            <GlobalMessage message={globalMessage} />
            {globalMessage && globalMessage.type === "error" ? (
              <Link href={`/${getFrenchSlug("forgot-password")}`} className="text-blue-600 hover:underline">
                Générer un nouveau lien
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}
