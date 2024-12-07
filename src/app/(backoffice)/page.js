"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, getTokenClientSide } from "@/utils/session";
import { useTitle } from "@/context/TitleContext";
import ClientMeta from "@/components/Metadata/ClientMeta";

/**
 * Home page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { title, setTitle } = useTitle();

  useEffect(() => {
    setTitle("Accueil");
  });

  useEffect(() => {
    const session = getSession(getTokenClientSide());
    if (!session) router.push("/login");
    else setUser(session);
    console.log("session : ", session);
  }, []);

  if (!user) return null;

  return (
    <div>
      <ClientMeta title={title} />
    </div>
  );
}
