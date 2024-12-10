import React, { createContext, useContext, useState, useEffect } from "react";

// Créer un contexte pour l'alerte
const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

// Fournisseur de contexte
export const AlertProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (msg) => {
    setAlertMessage(msg);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  return <AlertContext.Provider value={{ alertMessage, showAlert, hideAlert }}>{children}</AlertContext.Provider>;
};
