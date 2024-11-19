"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth";
import { Input } from "@/components/Form/Input/Input";
import Link from "next/link";
import { DefaultButton } from "@/components/Button/DefaultButton";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { useForm } from "@/hooks/useForm";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { Loader } from "@/components/Loader/Loader";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // État pour le loader

  // Configuration du formulaire
  const initialFormState = { lastname: "", firstname: "", username: "", password: "", confirmPassword: "" };
  const validate = (data) => {
    const errors = {};
    if (!data.username) errors.username = "L'adresse email est obligatoire.";
    if (!data.password) errors.password = "Le mot de passe est obligatoire.";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
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
      await register(formData); // Inscription de l'utilisateur
      setGlobalMessage({ type: "success", text: "Compte créé avec succès. Veuillez valider votre adresse email via le lien qui vous a été envoyé." });
    } catch (error) {
      console.log(error);
      console.log("Signup failed", error);
      setGlobalMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  const formFields = [
    { name: "lastname", label: "Nom", type: "text", required: true },
    { name: "firstname", label: "Prénom", type: "text", required: true },
    { name: "username", label: "Adresse email", type: "text", required: true },
    { name: "password", label: "Mot de passe", type: "password", required: true },
    { name: "confirmPassword", label: "Confirmation mot de passe", type: "password", required: true },
  ];

  return (
    <>
      <Loader visible={isLoading} /> {/* Affichage du loader */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthHeading1 title="Créer un compte" />
        <div className="flex flex-col bg-white w-full sm:p-10 gap-5 rounded-md">
          {formFields.map((field) => (
            <Input key={field.name} name={field.name} label={field.label} type={field.type} value={formData[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />
          ))}

          {/* Messages globaux */}
          <GlobalMessage message={globalMessage} />

          <DefaultButton type="submit" title="Créer un compte" className="mx-auto px-6" />

          <p className="text-sm text-gray-500 mt-3">
            <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
              Retour à la page de connexion
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
