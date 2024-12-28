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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-white">You are not logged in.</div>; 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 sm:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">Your Profile</h1>

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-300 hover:scale-105">
        <div className="mb-6 text-center">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
          />
        </div>

        <div className="space-y-4 text-center">
          <p className="text-lg font-semibold text-blue-400">
            Email: 
          </p>
          <span className="text-white">{user.email}</span>
          {user.displayName && (
            <p className="text-sm text-gray-400">
              Nombre: <span className="text-gray-300">{user.displayName}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 w-full max-w-md flex flex-col space-y-4">
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
