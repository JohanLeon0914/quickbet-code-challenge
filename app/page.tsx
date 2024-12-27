import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRateMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies();
  const topRateMovies = await getTopRateMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel title="Popular" movies={popularMovies} />
        <MoviesCarousel title="Upcoming" movies={upcomingMovies} />
        <MoviesCarousel title="Top rated" movies={topRateMovies} />
      </div>
    </main>
  );
}
