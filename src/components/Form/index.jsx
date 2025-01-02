import { useEffect, useState } from "react";
import { InputWithAddons } from "./Input/InputWithAddons";
import { Toggle } from "./Input/Toggle";
import { DefaultButton } from "../Button/DefaultButton";
import { useForm } from "@/hooks/useForm";
import { GlobalMessage } from "./Message/GlobalMessage";
import { formatToogleValueIntoBoolean, updateToggleInputs } from "@/utils/toggleHelpers";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import { InputGroup } from "./Input/InputGroup";
import { CheckboxMultiple } from "./Input/CheckboxMultiple";

// Traduction de la largeur en classes Tailwind
function defineWidthClass(field) {
  const widthClass = {
    "1/2": "sm:basis-1/2 basis-full", // Moitié de la largeur
    "1/3": "sm:basis-1/3 basis-full", // Un tiers de la largeur
    full: "w-full", // Pleine largeur
  }[field.widthClass || "1/2"]; // Valeur par défaut : "1/2"

  return widthClass;
}

function generateInput(field, item, isReadOnly = false, fieldErrors, handleChange) {
  if (field.type === "toggle") {
    return <Toggle name={field.name} defaultChecked={item[field.name]} onChange={handleChange} disabled={isReadOnly} className={field.className} label={field.label} errorMessage={fieldErrors[field.name]} />;
  } else if (field.type === "checkbox-multiple") {
    return <CheckboxMultiple name={field.name} options={field.options} selectedValues={item[field.name]} onChange={handleChange} disabled={isReadOnly} className={field.className} label={field.label} errorMessage={fieldErrors[field.name]} />;
  } else if (field.icon) {
    return (
      <>
        <InputWithAddons icon={field.icon} type={field.type} name={field.name} placeholder={field.label} defaultValue={item[field.name] || ""} disabled={isReadOnly} className={field.className} label={field.label} title={field.label} errorMessage={fieldErrors[field.name]} onChange={handleChange} maxLength={field.maxLength} minLength={field.minLength} />
      </>
    );
  } else {
    return <InputGroup name={field.name} label={field.label} type={field.type} value={item[field.name]} onChange={handleChange} errorMessage={fieldErrors[field.name]} required={field.required} />;
  }
}

export default function Form({ children, fields, onSubmit, isReadOnly, item, validate, validateOnChange, initialValues = {}, onSubmitResponseDisplayType = "alert", submitButton, formStyle }) {
  const { fieldErrors, globalMessage, setGlobalMessage, handleChange, validateForm } = useForm(initialValues, validate, validateOnChange);
  const { showAlert } = useAlert();
  const router = useRouter();

  // Récupère les toggle pour un traitement spécial
  const [toggleInputs, setToggleInputs] = useState([]);
  useEffect(() => {
    setToggleInputs((prevInputs) => updateToggleInputs(fields, prevInputs));
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalMessage(null);

    const formData = new FormData(e.target);

    // Convertit en objet tout en gérant les champs multiples
    const formDataFromDOM = {};
    formData.forEach((value, key) => {
      if (formDataFromDOM[key]) {
        // Si la clé existe déjà, convertit en tableau (ou ajoute au tableau existant)
        formDataFromDOM[key] = [].concat(formDataFromDOM[key], value);
      } else {
        // Sinon, assigne la valeur directement
        formDataFromDOM[key] = value;
      }
    });

    formatToogleValueIntoBoolean(formDataFromDOM, toggleInputs); // Traitement spécial des toggles

    if (validateForm(formDataFromDOM)) {
      try {
        // Appelle la fonction onSubmit et attend la réponse
        const response = await onSubmit(formDataFromDOM);
        if (onSubmitResponseDisplayType === "alert") {
          showAlert(response); // Affiche une alerte avec le retour de onSubmit
        } else {
          setGlobalMessage(response);
        }
        if (response.redirectUrl) {
          setTimeout(() => router.push(response.redirectUrl), response.redirectTimeout || 1000);
        }
      } catch (error) {
        // Gère les erreurs éventuelles
        if (onSubmitResponseDisplayType === "alert") {
          showAlert({ type: "error", text: "Une erreur est survenue lors de la soumission du formulaire." });
        } else {
          setGlobalMessage({ type: "error", text: "Une erreur est survenue lors de la soumission du formulaire." });
        }
        console.error("Erreur lors de la soumission :", error);
      }
    }
  };

  return (
    <>
      <form className={formStyle?.formClassName || ""} onSubmit={handleSubmit}>
        <div className={formStyle?.formDivClassName || "flex flex-wrap -mx-2"}>
          {fields.map((field) => {
            const widthClass = defineWidthClass(field);
            const elements = [
              <div key={field.name} className={`px-2 my-2 ${widthClass}`}>
                {generateInput(field, item, isReadOnly, fieldErrors, handleChange)}
              </div>,
              field.breakAfter && <div key={`break-${field.name}`} className="w-full clear-both"></div>, // Retour à la ligne forcé si demandé
            ];

            return elements;
          })}
          <div className="px-2">{children}</div>
        </div>
        <div className="flex justify-center">{globalMessage && <GlobalMessage message={globalMessage} />}</div>
        <div className="mt-4 flex justify-center gap-2 px-2">{!isReadOnly && <DefaultButton type="submit" title={submitButton?.title || "Enregistrer"} widthClass={submitButton?.widthClass || ""} btnStyle={submitButton?.btnStyle || "success"} />}</div>
      </form>
    </>
  );
}
