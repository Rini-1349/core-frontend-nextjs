"use client";

import { GlobalMessage } from "@/components/Form/Message/GlobalMessage";
import { AuthHeading1 } from "@/components/Heading/AuthHeading1";
import { resendValidationEmail } from "@/services/auth";
import { getCookieClientSide, getSession, clearSession } from "@/utils/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResendValidationEmail(request) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [globalMessage, setGlobalMessage] = useState(null);

  useEffect(() => {
    const session = getSession(getCookieClientSide());
    if (session) {
      setUser(session);
    } else {
      const query = Object.fromEntries(new URLSearchParams(window.location.search));
      setUser({ id: query.id });
    }
    console.log("session : ", session);
  }, []);

  const handleResendEmail = async () => {
    try {
      const response = await resendValidationEmail(user.id);
      if (response) {
        setGlobalMessage({ type: "success", text: "Email de vérification renvoyé avec succès !" });
      } else {
        console.log("Erreur lors de l'envoi de l'email de vérification");
        setGlobalMessage({ type: "error", text: "Erreur lors de l'envoi de l'email de vérification" });
      }
    } catch (error) {
      console.log("Erreur lors de l'envoi de l'email : ", error);
      setGlobalMessage({ type: "error", text: error.message });
    }
  };

  const handleLogout = () => {
    clearSession(); // Efface le cookie de session
    setUser(null); // Réinitialise l'état de l'utilisateur
    router.push("/login");
  };

  return (
    <div>
      <AuthHeading1 title="Adresse email non vérifiée" className="mb-8" />
      <GlobalMessage message={globalMessage} />
      <p>Il semble que vous n'ayez pas encore vérifié votre adresse email. Veuillez vérifier votre boîte de réception pour le lien de validation.</p>

      <p className="text-sm text-gray-500 mt-3">
        <Link href="#" onClick={handleResendEmail} className="text-blue-600 hover:underline">
          Renvoyer l'email de vérification
        </Link>
      </p>

      {user && user.lastname && (
        <p className="text-sm text-gray-500 mt-3">
          <Link href="#" onClick={handleLogout} className="text-blue-600 hover:underline">
            Déconnexion
          </Link>
        </p>
      )}
    </div>
  );
}
