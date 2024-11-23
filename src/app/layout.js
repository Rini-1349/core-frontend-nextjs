"use client";

import "@/css/globals.css";
import "@/css/tailadmin.css";
import "@/css/satoshi.css";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { LoadingProvider, useIsLoading } from "@/context/LoadingContext";

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

function LayoutContent({ children }) {
  const { isLoading, setIsLoading } = useIsLoading();

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {isLoading && <Loader />}
      {children}
    </div>
  );
}
