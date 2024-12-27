import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

interface PageProps {
  params: { id: string };
  searchParams: { genre?: string };
}

export default async function GenrePage({ params, searchParams }: PageProps) {
  const { id } = params;
  const genre = searchParams?.genre || "Unknown";

  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="flex flex-col space-y-4 xl:mt-42">
        <h1 className="text-4xl font-bold px-5 py-4">Results for {genre}</h1>
      </div>
      <MoviesCarousel title="Genre" movies={movies} isVertical />
    </div>
  );
}
