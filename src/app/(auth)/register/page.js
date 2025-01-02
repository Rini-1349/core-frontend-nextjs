"use client";

import { useRouter } from "next/navigation";
import { register } from "@/services/auth";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { getFrenchSlug } from "@/lib/slugUtils";
import { useIsLoading } from "@/context/LoadingContext";
import ClientMeta from "@/components/Metadata/ClientMeta";
import { useTitle } from "@/context/TitleContext";
import { useEffect } from "react";
import Form from "@/components/Form";

/**
 * Register page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Register() {
  const router = useRouter();
  const { setIsLoading } = useIsLoading();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Inscription");
  });

  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    if (!data.password) errors.password = "Le mot de passe est obligatoire.";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    return errors;
  };

  const handleSubmit = async (values) => {
    setIsLoading(true); // Activer le loader

    try {
      const response = await register(values); // Inscription de l'utilisateur
      return { type: "success", text: response.message };
    } catch (error) {
      console.log(error);
      console.log("Signup failed", error);
      return { type: "error", text: error.message };
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "lastname", label: "Nom", type: "text", required: true, widthClass: "full" },
    { name: "firstname", label: "Prénom", type: "text", required: true, widthClass: "full" },
    { name: "username", label: "Adresse email", type: "text", required: true, widthClass: "full" },
    { name: "password", label: "Mot de passe", type: "password", required: true, widthClass: "full" },
    { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", required: true, widthClass: "full" },
  ];
  const submitButton = {
    title: "Créer un compte",
    widthClass: "w-full",
    btnStyle: "primary",
  };
  const formStyle = {
    formDivClassName: "flex flex-col bg-white w-full rounded-md",
  };

  return (
    <div className="px-2">
      <ClientMeta title={title} />
      <AuthHeading1 title="Créer un compte" className="mb-10" />
      <Form fields={formFields} item={{}} validate={validate} onSubmit={handleSubmit} isReadOnly={false} submitButton={submitButton} formStyle={formStyle} onSubmitResponseDisplayType="globalMessage" />
      <p className="text-sm text-gray-500 mt-5 px-2">
        <Link href={getFrenchSlug("/login")} className="text-blue-700 hover:underline">
          Retour à la page de connexion
        </Link>
      </p>
    </div>
  );
}
