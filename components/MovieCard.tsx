import Image from "next/image";
import { Movie } from "@/typing";
import getImagePath from "@/lib/getImagePath";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  return (
    <div className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg">
      <Link
        href={`/movie/${movie.id}`}
        className="w-full h-full"
      >
        <Image
          className="w-full lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
          src={getImagePath(movie.backdrop_path || movie.poster_path)}
          alt={movie.title}
          width={1020}
          height={1000}
          key={movie.id}
        />
      </Link>

      <p className="absolute z-20 bottom-5 left-5 text-white">{movie.title}</p>

      <div className="absolute z-20 bottom-5 right-5">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
}

export default MovieCard;
