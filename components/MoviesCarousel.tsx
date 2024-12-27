"use client";

import { cn } from "@/lib/utils";
import { Movie } from "@/typing";
import MovieCard from "./MovieCard";
import { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; 

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

function MoviesCarousel({ title, movies, isVertical }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false); 

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300; 
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShowArrows = (show: boolean) => {
    if (!isVertical) {
      setShowArrows(show)
    }
  };

  return (
    <div className="z-10 text-white">
      <h2 className="text-xl font-bold px-10 py-2">{title}</h2>
      <div
        className="relative"
        onMouseEnter={() => handleShowArrows(true)} 
        onMouseLeave={() => handleShowArrows(false)} 
      >
        <div
          className={cn(
            "flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide",
            isVertical && "flex-col space-x-0 space-y-12"
          )}
          ref={carouselRef}
        >
          {isVertical
            ? movies.map((movie) => (
                <div
                  key={movie.id}
                  className={cn(
                    isVertical && "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
                  )}
                >
                  <MovieCard key={movie.id} movie={movie} />
                  <div className="max-w-2xl">
                    <p className="font-bold">
                      {movie.title} ({movie.release_date?.split("_")[0]})
                    </p>
                    <hr className="mb-3" />
                    <p className="">{movie.overview}</p>
                  </div>
                </div>
              ))
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        {showArrows && (
          <>
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
            >
              <BsChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
            >
              <BsChevronRight size={24} /> 
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MoviesCarousel;
