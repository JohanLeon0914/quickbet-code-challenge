"use client";

import React, { useEffect, useState } from "react";
import MoviesCarousel from "@/components/MoviesCarousel";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-center px-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-300">
            No tienes películas favoritas.
          </h1>
          <p className="mt-4 text-gray-400 text-lg sm:text-xl">
            ¡Explora nuestra colección y guarda tus películas favoritas para verlas más tarde!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-[120px]">
        <MoviesCarousel
          title="Your favorite movies"
          movies={favorites}
          isVertical
        />
      </div>
    </div>
  );
}
