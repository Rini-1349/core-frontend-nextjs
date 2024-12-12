"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resetPassword } from "@/services/auth";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useTitle } from "@/context/TitleContext";
import Form from "@/components/Form";

/**
 * ResetPassword page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ResetPassword() {
  const { setIsLoading } = useIsLoading();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Réinitialisation mot de passe");
  });

  const validate = (data) => {
    const errors = {};
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    return errors;
  };

  // Gestion via le hook `useForm`
  const [globalMessage, setGlobalMessage] = useState(null);

  // Vérification du token au chargement
  useEffect(() => {
    const verifyTokenOnLoad = async () => {
      setIsLoading(true); // Activer le loader

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
  const handlePasswordReset = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const response = await resetPassword({ password: values.password }, queryParams);
      if (response) {
        return { type: "success", text: `${response.message} Redirection...`, redirectUrl: "/", redirectTimeout: 3000 };
      }
    } catch (error) {
      console.error(error.message);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "password", label: "Mot de passe", type: "password", required: true, widthClass: "full" },
    { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", required: true, widthClass: "full" },
  ];
  const submitButton = {
    title: "Réinitialiser le mot de passe",
    widthClass: "w-full",
    btnStyle: "primary",
  };
  const formStyle = {
    formDivClassName: "flex flex-col bg-white w-full rounded-md",
  };

  return (
    <div className="px-2">
      <ClientMeta title={title} />
      <AuthHeading1 title="Réinitialisation mot de passe" className="mb-10" />
      {isTokenValid ? (
        <Form fields={formFields} item={{}} validate={validate} onSubmit={handlePasswordReset} isReadOnly={false} submitButton={submitButton} formStyle={formStyle} onSubmitResponseDisplayType="globalMessage" />
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
  );
}
