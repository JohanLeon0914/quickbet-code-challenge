import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id, genre);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 xl:mt-42">
        <h1 className="text-6xl font-bold px-5">Results for {genre}</h1>
      </div>
      <MoviesCarousel title="Genre" movies={movies} isVertical />
    </div>
  );
}

export default GenrePage;
