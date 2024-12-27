/* eslint-disable @next/next/no-img-element */
import FavoriteButton from "@/components/FavoriteButton";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getMovieById, getPopularMovies } from "@/lib/getMovies";
import { Movie } from "@/typing";
type Params = Promise<{ id: string }>
async function MoviePage(props: {
  params: Params
}) {
  const params = await props.params
  const id = params.id
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
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-72 md:w-96 pt-10"
            />
          </div>

          <div className="text-white space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold text-shadow">{movie.original_title}</h1> {/* Sombra para mejorar legibilidad */}
            
            <div>
              <h3 className="text-xl font-semibold">Géneros:</h3>
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
                <h3 className="font-semibold">Fecha de estreno:</h3>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <h3 className="font-semibold">Idioma original:</h3>
                <p>{movie.original_language}</p>
              </div>
              <div>
                <h3 className="font-semibold">Calificación:</h3>
                <p>{movie.vote_average} / 10</p>
              </div>
              <div>
                <h3 className="font-semibold">Add to favorites:</h3>
                <FavoriteButton movie={movie} />
              </div>
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
