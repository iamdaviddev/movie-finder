export interface Movies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  release_date?: string;
  runtime?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchMoviesResponse {
  page: number;
  results: Movies[];
  total_results: number;
  total_pages: number;
}

export interface GenresResponse {
  genres: Genre[];
}