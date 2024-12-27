"use client";
import React, { useState, useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { auth } from "@/firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 

function ProfileDropdown() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  const routes = user
    ? [
        { name: "Your profile", route: "/profile" },
        { name: "Favorites", route: "/favorites" },
        { name: "Logout", route: "/logout" },
      ]
    : [
        { name: "Login", route: "/login" },
      ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        <IoPersonCircle size={24} /> <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {routes.map((route) => (
          <DropdownMenuItem key={route.name}>
            <Link href={route.route}>
              {route.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
