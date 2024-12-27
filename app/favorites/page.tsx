"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MoviesCarousel from "@/components/MoviesCarousel";

// Componente de la página de favoritos
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
      return;
    }

    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (favorites.length === 0) {
    return <div className="text-white">No tienes películas favoritas.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-[120px]">
        <MoviesCarousel
          title="Your favorite movies"
          movies={favorites}
          isVertival
        />
      </div>
    </div>
  );
}
