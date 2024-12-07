"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getSession, getTokenClientSide } from "@/utils/session";

// Créer un contexte
const SessionContext = createContext();

// Fournisseur du contexte
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Lors du chargement du composant, récupérer la session en fonction du token
    const token = getTokenClientSide();
    if (token) {
      setSession(getSession(token));
    }
  }, []);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useSession = () => {
  return useContext(SessionContext);
};
