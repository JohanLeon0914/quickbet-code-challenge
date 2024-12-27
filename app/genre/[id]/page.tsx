import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Props = {
  params: {
    id: string;
  };
  searchParams?: {
    genre?: string;
  };
};

async function GenrePage({ params: { id }, searchParams }: Props) {
  const movies = await getDiscoverMovies(id);
  const genre = searchParams?.genre || "Unknown"; 

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="flex flex-col space-y-4 xl:mt-42">
        <h1 className="text-4xl font-bold px-5 py-4">Results for {genre}</h1>
      </div>
      <MoviesCarousel title="Genre" movies={movies} isVertical />
    </div>
  );
}

export default GenrePage;
