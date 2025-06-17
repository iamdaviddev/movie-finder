'use client';
import { useEffect, useRef, useState } from 'react';
import { Movies } from '@/types/movies';
import { MovieCard } from './movie-card';
import { fetchPopularMovies, fetchMoviesByGenre, searchMovies } from '@/services/tmdb';

interface InfiniteScrollMoviesProps {
  initialMovies: Movies[];
  totalPages: number;
  genreId?: number;
  searchQuery?: string;
}

export function InfiniteScrollMovies({ 
  initialMovies, 
  totalPages,
  genreId,
  searchQuery
}: InfiniteScrollMoviesProps) {
  const [movies, setMovies] = useState<Movies[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  useEffect(() => {
    const loadMoreMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          response = await searchMovies(searchQuery, page);
        } else if (genreId) {
          response = await fetchMoviesByGenre(genreId, page);
        } else {
          response = await fetchPopularMovies(page);
        }
        setMovies((prev) => [...prev, ...response.results]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) loadMoreMovies();
  }, [page, genreId, searchQuery]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${page}`} movie={movie} />
        ))}
      </div>
      
      <div ref={loader} className="col-span-full flex justify-center py-8">
        {loading && (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-accent)]"></div>
        )}
      </div>
    </>
  );
}
