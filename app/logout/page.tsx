"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/firebase";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth); 
        router.push("/login"); 
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    logoutUser();
  }, [router]); 

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <p>Cerrando sesión...</p>
    </div>
  );
}
