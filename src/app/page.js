"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession, getCookieClientSide } from "../utils/session";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = getSession(getCookieClientSide());
    if (!session) router.push("/login");
    else setUser(session);
    console.log("session : ", session);
  }, []);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <h1>
        Welcome, {user.firstname} {user.lastname}
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
