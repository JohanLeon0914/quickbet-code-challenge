"use client";
import { getMovieTrailer } from "@/lib/getMovies";
import { Movie } from "@/typing";
import { useState, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

type TrailerLinkProps = {
  movie: Movie;
};

const WatchOfficialTrailerButton = ({ movie }: TrailerLinkProps) => {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const trailerUrl = await getMovieTrailer(movie.id);

      if (trailerUrl) {
        const embedUrl = `https://www.youtube.com/embed/${trailerUrl}`;
        setTrailer(embedUrl);
      }
    }

    fetchMovie();
  }, [movie]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {trailer && (
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md transition"
        >
          Watch Official Trailer
          <CiPlay1 className="text-2xl" />
        </button>
      )}

      {/* Modal */}
      {isModalOpen && trailer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-900 text-white w-full md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-2 text-3xl text-gray-300 hover:text-white transition z-50"
            >
              <IoMdCloseCircle size={24} />
            </button>

            <div className="relative w-full h-0 pb-[56.25%] z-20">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src={trailer} 
                title="Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchOfficialTrailerButton;
