/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false); 
      } else {
        setLoading(false);
        router.push("/login"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="text-white">Cargando...</div>; 
  }

  if (!user) {
    return <div className="text-white">No estás logueado.</div>; 
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-semibold mb-4">Your profile</h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <img
            src={user.photoURL || "/default-profile.png"} 
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>
        <p className="text-lg font-semibold">Correo electrónico: {user.email}</p>
        <p className="text-sm text-gray-400">ID: {user.uid}</p>

        {user.displayName && <p className="text-sm text-gray-400">Nombre: {user.displayName}</p>}
      </div>
      <Link href="/favorites">
        <button className="mt-6 w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          Your favorite movies
        </button>
      </Link>
    </div>
  );
}
