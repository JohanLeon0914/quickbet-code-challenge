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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-center px-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-300">
            {"You don't have any favorite movies."}
          </h1>
          <p className="mt-4 text-gray-400 text-lg sm:text-xl">
            Browse our collection and save your favorite movies to watch later!
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
