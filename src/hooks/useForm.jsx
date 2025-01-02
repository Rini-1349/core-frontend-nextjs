import { useState } from "react";

/**
 * useForm function
 *
 * @param {{}} initialState
 * @param {function} validate
 * @returns {{
 *   formData: {};
 *   fieldErrors: {};
 *   globalMessage: {};
 *   setGlobalMessage: function;
 *   handleChange: (e: any) => void;
 *   validateForm: (formDataFromDOM?: {}) => boolean;
 * }}
 */
export const useForm = (
  initialState,
  validate,
  validateOnChange = () => {
    return { errors: {} };
  }
) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Met à jour uniquement les champs définis dans initialState
    if (name in initialState) {
      setFormData({ ...formData, [name]: value });
      setGlobalMessage(null);
    }

    // Validation à lancer à chaque changement
    const validation = validateOnChange(name, value, fieldErrors);
    setFieldErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      Object.entries(validation.errors).forEach(([key, value]) => {
        updatedErrors[key] = value; // Ajoute ou met à jour chaque erreur
      });

      if (!validation.errors[name]) {
        updatedErrors[name] = "";
      }

      return updatedErrors;
    });
  };

  const validateForm = (formDataFromDOM = {}) => {
    // Fusionne les champs contrôlés et non contrôlés
    const combinedData = { ...formDataFromDOM, ...formData };

    const errors = validate(combinedData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setGlobalMessage({
        type: "error",
        text: "Veuillez corriger les erreurs dans le formulaire.",
      });
      return false;
    }
    return true;
  };

  return {
    formData,
    fieldErrors,
    globalMessage,
    setGlobalMessage,
    handleChange,
    validateForm,
  };
};
