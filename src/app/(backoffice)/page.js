"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession, getTokenClientSide } from "@/utils/session";

/**
 * Home page
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getSession(getTokenClientSide());
    if (!session) router.push("/login");
    else setUser(session);
    console.log("session : ", session);
  }, []);

  if (!user) return null;

  return <div></div>;
}
