"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/services/auth";
import { useRouter } from "next/navigation";
import { clearSession } from "@/utils/session"; // Vous devrez peut-être ajouter cette fonction pour supprimer la session.
import Link from "next/link";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { Loader } from "@/components/Loader/Loader";

export default function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // État pour le loader
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showResendLinkOption, setShowResendLinkOption] = useState(false);
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const [globalMessage, setGlobalMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true); // Activer le loader

    const verifyEmailToken = async () => {
      try {
        const response = await verifyEmail(params); // Vérifie le token de vérification d'email
        if (response) {
          setGlobalMessage({ type: "success", text: "Votre email a été vérifié avec succès." });
          setIsEmailVerified(true); // Confirmation de la vérification de l'email
          clearSession(); // Efface la session après la vérification réussie
        }
      } catch (error) {
        console.log(error.message);
        setGlobalMessage({ type: "error", text: error.message });
        setShowResendLinkOption(true); // Affiche l'option de renvoi de lien
      } finally {
        setIsLoading(false); // Désactiver le loader
      }
    };

    verifyEmailToken();
  }, [params, router]);

  return (
    <>
      <Loader visible={isLoading} /> {/* Affichage du loader */}
      <div>
        <AuthHeading1 title="Vérification adresse email" className="mb-8" />
        <GlobalMessage message={globalMessage} />

        {isEmailVerified && (
          <p className="text-sm text-gray-500 mt-3">
            <Link href="/login" className="text-blue-600 hover:underline">
              Accéder à la page de connexion
            </Link>
          </p>
        )}

        {!isEmailVerified && showResendLinkOption && (
          <p className="text-sm text-gray-500 mt-3">
            <Link href={`/resend-validation-email?${params}`} className="text-blue-600 hover:underline">
              Générer un nouveau lien de vérification
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
