"use client";

import "@/css/globals.css";
import "@/css/tailadmin.css";
import "@/css/satoshi.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { LoadingProvider, useIsLoading } from "@/context/LoadingContext";

/**
 * RootLayout
 *
 * @export
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="fr">
      <body suppressHydrationWarning={true} className={``}>
        <LoadingProvider>
          <LayoutContent>{children}</LayoutContent>
        </LoadingProvider>
      </body>
    </html>
  );
}

/**
 * LayoutContent
 *
 * @param {{ children: JSX.Element; }} param0
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
function LayoutContent({ children }) {
  const { isLoading, setIsLoading } = useIsLoading();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {isLoading && <Loader />}
      {children}
    </div>
  );
}
