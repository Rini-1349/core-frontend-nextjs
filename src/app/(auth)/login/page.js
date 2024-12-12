"use client";

import { login } from "@/services/auth";
import { setSession } from "@/utils/session";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";
import { useTitle } from "@/context/TitleContext";
import { useEffect } from "react";
import ClientMeta from "@/components/Metadata/ClientMeta";
import Form from "@/components/Form";

/**
 * Login page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Login() {
  const { setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Connexion");
  });

  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    if (!data.password) errors.password = "Le mot de passe est obligatoire.";
    return errors;
  };

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const { token } = await login(values);
      setSession(token);
      return { type: "success", text: "Connexion réussie. Redirection...", redirectUrl: "/" };
    } catch (error) {
      console.log("Login failed", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "username", label: "Adresse email", type: "text", required: true, widthClass: "full" },
    { name: "password", label: "Mot de passe", type: "password", required: true, widthClass: "full" },
  ];
  const submitButton = {
    title: "Connexion",
    widthClass: "w-full",
    btnStyle: "primary",
  };
  const formStyle = {
    formDivClassName: "flex flex-col bg-white w-full rounded-md",
  };

  return (
    <div className="px-2">
      <ClientMeta title={title} />
      <AuthHeading1 title="Connexion" className="mb-10" />
      <Form fields={formFields} item={{}} validate={validate} onSubmit={handleSubmit} isReadOnly={false} submitButton={submitButton} formStyle={formStyle} onSubmitResponseDisplayType="globalMessage">
        <div className="flex items-center justify-between mb-5">
          <Link href={`/${getFrenchSlug("forgot-password")}`} className="text-sm text-blue-600 hover:underline ml-auto">
            Mot de passe oublié ?
          </Link>
        </div>
      </Form>
      <p className="text-sm text-gray-500 mt-5 px-2">
        Pas encore inscrit ?{" "}
        <Link href={`/${getFrenchSlug("register")}`} className="text-blue-600 hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
