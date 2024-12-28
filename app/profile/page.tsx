/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
  
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 transform transition-transform duration-300 hover:scale-105">
        <div className="mb-6 text-center">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
          />
        </div>
  
        <div className="space-y-4">
          <p className="text-lg font-semibold text-blue-400">
            Correo electrónico: <span className="text-white">{user.email}</span>
          </p>
          {user.displayName && (
            <p className="text-sm text-gray-400">
              Nombre: <span className="text-gray-300">{user.displayName}</span>
            </p>
          )}
        </div>
      </div>
  
      <div className="mt-8 p-4 w-96 flex flex-col space-y-4">
        <Link href="/favorites">
          <button className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300">
            Favorite Movies ❤️
          </button>
        </Link>
        <Link href="/logout">
          <button className="w-full px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
