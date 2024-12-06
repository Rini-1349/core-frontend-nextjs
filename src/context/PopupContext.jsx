"use client";

import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupContent, setPopupContent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [childDivMaxWidthClass, setChildDivMaxWidthClass] = useState("max-w-md");
  const [popupModalStyle, setPopupModalStyle] = useState({
    top: "20%",
  });
  const [childDivStyle, setChildDivStyle] = useState({});

  const openPopup = (content, popupParams = {}) => {
    setPopupContent(content);
    if (popupParams.childDivMaxWidthClass) {
      setChildDivMaxWidthClass(popupParams.childDivMaxWidthClass);
    }
    if (popupParams.popupModalStyle) {
      setPopupModalStyle(popupParams.popupModalStyle);
    }
    if (popupParams.childDivStyle) {
      setChildDivStyle(popupParams.childDivStyle);
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
    setChildDivMaxWidthClass("max-w-md");
    setPopupModalStyle({
      top: "20%",
    });
    setChildDivStyle({});
  };

  // Gestion du clic à l'extérieur pour fermer la popup
  const handleOverlayClick = (event) => {
    // Si on clique sur l'overlay (fond de la pop-up), on ferme la pop-up
    if (event.target.id === "overlay") {
      closePopup();
    }
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, popupContent, openPopup, closePopup }}>
      {children}
      {isPopupOpen && (
        <>
          {/* Overlay (fond) avec gestion du clic pour fermer la pop-up */}
          <div
            id="overlay"
            className="absolute inset-0 bg-black/25 dark:bg-white/25 z-40"
            onClick={handleOverlayClick} // Clic à l'extérieur
          ></div>

          {/* Pop-up */}
          <div tabIndex="-1" id="popup-modal" className="absolute overflow-y-auto overflow-x-hidden inset-x-0 z-50 flex justify-center items-center" style={popupModalStyle}>
            <div style={childDivStyle} className={`relative p-4 w-full ${childDivMaxWidthClass} max-h-full`}>
              {popupContent}
            </div>
          </div>
        </>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
