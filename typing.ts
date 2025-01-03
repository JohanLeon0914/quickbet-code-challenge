export type Movie = {
	id: number;
	title: string;
	original_title: string;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genres: Genre[];
	original_language: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
	media_type?: string
}

export type SearchResults = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export type Genre = {
    id: string,
    name: string,
}

export type Genres = {
    genres: Genre[]
}

export interface Element {
    type:
      | 'Bloopers'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Clip'
      | 'Trailer'
      | 'Teaser'
  }

  export interface Video {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: "Trailer" | "Clip" | "Behind the Scenes" | "Featurette" | "Other";
  }

  export interface MovieVideosResponse {
    id: number;
    results: Video[];
  }