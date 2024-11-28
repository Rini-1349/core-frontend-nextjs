import React, { createContext, useContext, useState } from "react";

/**
 * createContext
 *
 * @type {import("react").Context}
 */
const LoadingContext = createContext();

/**
 * LoadingProvider
 *
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

/**
 * useIsLoading
 *
 * @returns {import("react").Context}
 */
export const useIsLoading = () => useContext(LoadingContext);
