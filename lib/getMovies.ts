import { SearchResults, Movie, MovieVideosResponse, Video } from "../typing";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("include_video", "false");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
        next: {
            revalidate: cacheTime || 60 * 60 * 24, //24 hours
        },
    };

    const response = await fetch(url.toString(), options);
    const data = (await response.json()) as SearchResults;

    return data;
}


export async function getUpcomingMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/upcoming")
    const data = await fetchFromTMDB(url)

    return data.results;
}

export async function getTopRateMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/top_rated")
    const data = await fetchFromTMDB(url)

    return data.results;
}

export async function getPopularMovies() {
    const url = new URL("https://api.themoviedb.org/3/movie/popular")
    const data = await fetchFromTMDB(url)

    return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
    const url = new URL("https://api.themoviedb.org/3/discover/movie");

    if (keywords) {
        url.searchParams.set("with_keywords", keywords);
    }

    if (id) {
        url.searchParams.set("with_genres", id);
    }

    const data = await fetchFromTMDB(url);
    return data.results;
}


export async function getSearchMovies(term: string) {
    const url = new URL("https://api.themoviedb.org/3/search/movie");

    url.searchParams.set("query", term);

    const data = await fetchFromTMDB(url)
    return data.results;

}

export async function getMovieById(movieId: string): Promise<Movie> {
    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
        throw new Error(`Failed to fetch movie with ID: ${movieId}`);
    }

    const data = (await response.json()) as Movie;

    return data;
}

export async function getMovieTrailer(movieId: number): Promise<string> {
    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/videos`);

    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
        throw new Error(`Failed to fetch videos for movie with ID: ${movieId}`);
    }

    const data: MovieVideosResponse = await response.json(); 

    const trailer: Video | undefined = data.results.find((video) => video.type === "Trailer");

    if (!trailer) {
        throw new Error("No trailer found for this movie");
    }

    return trailer.key;
}

