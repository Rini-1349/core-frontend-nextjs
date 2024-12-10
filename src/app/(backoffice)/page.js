"use client";

import { useEffect } from "react";
import { useTitle } from "@/context/TitleContext";
import ClientMeta from "@/components/Metadata/ClientMeta";

/**
 * Home page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Home() {
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Accueil");
  }, []);

  return (
    <div>
      <ClientMeta title={title} />
    </div>
  );
}
