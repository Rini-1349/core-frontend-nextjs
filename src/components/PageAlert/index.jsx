import { useAlert } from "@/context/AlertContext";
import React, { useEffect } from "react";

function PageAlert() {
  const { alertMessage, hideAlert } = useAlert();
  let color = "blue";

  if (alertMessage) {
    switch (alertMessage.type) {
      case "success":
        color = "green";
        break;
      case "error":
        color = "red";
        break;
      default:
        color = "blue";
        break;
    }
  }

  // Fermer l'alerte après 5 secondes
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 5000); // L'alerte disparait après 5 secondes
      return () => clearTimeout(timer); // Cleanup du timer
    }
  }, [alertMessage, hideAlert]);

  return (
    alertMessage && (
      <div className={`sticky top-0 left-0 right-0 z-50`}>
        <div className={`absolute top-0 left-0 right-0 p-4 -mx-4 -translate-y-4 text-sm text-${color}-800 rounded-lg bg-${color}-100`} role="alert">
          <div className="flex justify-between items-center">
            <div className="m-auto">
              <span className="font-medium">{alertMessage.heading}</span> {alertMessage.text}
            </div>
            <button
              className="ml-2 text-${color}-800"
              onClick={hideAlert} // Bouton pour fermer l'alerte manuellement
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default PageAlert;
