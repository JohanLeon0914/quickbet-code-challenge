import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Params = Promise<{ term: string }>

async function SearchPage(props: {
  params: Params
}) {
  const params = await props.params
  const term = params.term

  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await getSearchMovies(term);

  const popularMovies = await getPopularMovies();

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 mt-32 xl:mt-42">

          <h1 className="text-4xl font-bold px-5 py-4 text-yellow-400">Results for {termToUse}</h1>
          <MoviesCarousel title="Movies" movies={movies} isVertical />
          <MoviesCarousel title="You may also like" movies={popularMovies} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;