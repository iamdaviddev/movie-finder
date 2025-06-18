'use client'

import { InfiniteScrollMovies } from './infinite-scroll-movies';
import { fetchPopularMovies } from '@/services/tmdb';
import { useEffect, useState } from 'react';
import { SearchMoviesResponse } from '@/types/movies';

export function MovieList() {
  const [initialData, setInitialData] = useState<SearchMoviesResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularMovies();
        setInitialData(data);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading)
    return (
      <div className="text-dark-accent text-center py-12">
        Carregando filmes...
      </div>
    );

  return initialData ? (
    <>
      <h2 className="text-2xl font-bold text-dark-text mb-6">
        Filmes Populares
      </h2>
      <InfiniteScrollMovies
        initialMovies={initialData.results}
        totalPages={initialData.total_pages}
      />
    </>
  ) : null;
}
