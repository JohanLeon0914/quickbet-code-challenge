import Image from "next/image"; // Importar el componente Image
import FavoriteButton from "@/components/FavoriteButton";
import MoviesCarousel from "@/components/MoviesCarousel";
import WatchOfficialTrailerButton from "@/components/WatchOfficialTrailerButton";
import { getMovieById, getPopularMovies } from "@/lib/getMovies";
import { Movie } from "@/typing";

type Params = Promise<{ id: string }>;
async function MoviePage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;
  const movie: Movie = await getMovieById(id);
  const popularMovies = await getPopularMovies();

  return (
    <div className="relative bg-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              width={384}
              height={576}
              quality={75}
              className="rounded-lg shadow-lg pt-10 w-[300px] lg:w-[384px]"
              priority
            />
          </div>

          <div className="text-white space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold text-shadow">
              {movie.original_title}
            </h1>

            <div>
              <h3 className="text-xl font-semibold">Genres:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg">{movie.overview}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Release Date:</h3>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <h3 className="font-semibold">Original Language:</h3>
                <p>{movie.original_language}</p>
              </div>
              <div className="items-center">
                <h3 className="text-lg font-semibold">Rating:</h3>
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-yellow-500">
                    {movie.vote_average}
                  </span>
                  <span className="text-sm text-gray-400">/ 10</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Add to favorites:</h3>
                <FavoriteButton movie={movie} />
              </div>
            </div>

            <div className="pt-5">
              <WatchOfficialTrailerButton movie={movie} />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <MoviesCarousel title="Recommendations" movies={popularMovies} />
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
