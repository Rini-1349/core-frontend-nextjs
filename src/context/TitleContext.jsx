"use client";

import { routesPermissions } from "@/lib/routesPermissions";
import { getEnglishSlug } from "@/lib/slugUtils";
import { matchPathname } from "@/utils/routesHelper";
import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const pathname = usePathname(); // Récupère le chemin actuel
  const searchParams = useSearchParams();

  // Déterminez dynamiquement `parentPage` en fonction de `pathname`
  const parentPage = determineParentPage(getEnglishSlug(pathname), searchParams);

  return <TitleContext.Provider value={{ title, setTitle, parentPage }}>{children}</TitleContext.Provider>;
};

// Fonction pour calculer `parentPage` dynamiquement en fonction de la route
const determineParentPage = (pathname, searchParams) => {
  if (pathname === "/profile/edit-password") {
    return {
      href: "/profile",
      title: "Retour profil",
    };
  }

  if (matchPathname(pathname, routesPermissions.userEditPassword)) {
    const userId = pathname.split("/")[2];
    return {
      href: `/users/${userId}?mode=edit${searchParams.get("modal") ? "&modal=true" : ""}`,
      title: "Retour utilisateur",
      userId: userId,
    };
  }

  // Par défaut, aucune page parent
  return null;
};

export const useTitle = () => useContext(TitleContext);
