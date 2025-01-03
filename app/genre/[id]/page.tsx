import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function GenrePage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const id = params.id
  const genre = searchParams.genre

  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="flex flex-col space-y-4 xl:mt-42">
        <h1 className="text-4xl font-bold px-5 py-4 text-yellow-400">Results for {genre}</h1>
      </div>
      <MoviesCarousel title="Genre" movies={movies} isVertical />
    </div>
  );
}
