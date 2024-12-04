"use client";

import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupContent, setPopupContent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, popupContent, openPopup, closePopup }}>
      {children}
      {isPopupOpen && (
        <>
          <div className="absolute inset-0 bg-black/25 dark:bg-white/25 z-40"></div>
          <div
            tabIndex="-1"
            id="popup-modal"
            className="absolute overflow-y-auto overflow-x-hidden inset-x-0 z-50 flex justify-center items-center"
            style={{
              top: "20%", // Décale la popup pour qu'elle commence à 20% de la hauteur de la fenêtre
            }}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">{popupContent}</div>
          </div>
        </>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
