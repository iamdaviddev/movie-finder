import { MovieDetails } from "@/types/movies";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: '3d61acff117b4875cc32dc04b95c16b3',
    language: "pt-BR"
  }
});

export const fetchPopularMovies = async (page = 1) => {
  const response = await api.get("/movie/popular", { params: { page } });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await api.get("/search/movie", { 
    params: { query, page } 
  });
  return response.data;
};

export const fetchMoviesByGenre = async (genreId: number, page = 1) => {
  const response = await api.get("/discover/movie", {
    params: { with_genres: genreId, page }
  });
  return response.data;
};

export const fetchGenres = async () => {
  const response = await api.get("/genre/movie/list");
  return response.data;
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}?append_to_response=videos`);
  return response.data;
};