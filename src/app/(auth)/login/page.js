"use client";

import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { setSession } from "@/utils/session";
import { Input } from "@/components/Form/Input/Input";
import { DefaultButton } from "@/components/Button/DefaultButton";
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { useForm } from "@/hooks/useForm";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { Loader } from "@/components/Loader/Loader";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // État pour le loader

  // Configuration du formulaire
  const initialFormState = { username: "", password: "" };
  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    if (!data.password) errors.password = "Le mot de passe est obligatoire.";
    return errors;
  };

  // Gestion via le hook `useForm`
  const { formData, fieldErrors, globalMessage, setGlobalMessage, handleChange, validateForm } = useForm(initialFormState, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalMessage(null);

    if (!validateForm()) return;

    setIsLoading(true); // Activer le loader

    try {
      const { token } = await login(formData);
      setSession(token);
      setGlobalMessage({ type: "success", text: "Connexion réussie. Redirection..." });
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      console.log("Login failed", error);
      setGlobalMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "username", label: "Adresse email", type: "text", required: true },
    { name: "password", label: "Mot de passe", type: "password", required: true },
  ];

  return (
    <>
      <Loader visible={isLoading} /> {/* Affichage du loader */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthHeading1 title="Connexion" />

        <div className="flex flex-col bg-white w-full sm:p-10 gap-5 rounded-md">
          {/* Rendu dynamique des champs */}
          {formFields.map((field) => (
            <Input key={field.name} name={field.name} label={field.label} type={field.type} value={formData[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />
          ))}

          {/* Messages globaux */}
          <GlobalMessage message={globalMessage} />

          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline ml-auto">
              Mot de passe oublié ?
            </Link>
          </div>

          <DefaultButton type="submit" title="Connexion" className="" />

          <p className="text-sm text-gray-500 mt-3">
            Pas encore inscrit ?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
