"use client";

import { Movie } from "@/typing";
import { useState, useEffect } from "react";

type FavoriteButtonProps = {
  movie: Movie;
};

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
  }, [movie]);

  const handleFavoriteToggle = () => {

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: Movie) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`px-2 py-2 mt-4 rounded-lg text-black ${isFavorite ? "bg-white" : "bg-gray-800"} hover:bg-opacity-80 transition`}
    >
      {isFavorite ? "❤️" : "🤍"} 
    </button>
  );
};

export default FavoriteButton;
