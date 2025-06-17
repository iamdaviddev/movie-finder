'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchMoviesByGenre, fetchGenres } from '@/services/tmdb';
import { InfiniteScrollMovies } from '@/components/infinite-scroll-movies';

export default function GenrePage() {
  const params = useParams();
  const genreId = Number(params.genreId);
  const [genreName, setGenreName] = useState('');
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [genresData, moviesData] = await Promise.all([
          fetchGenres(),
          fetchMoviesByGenre(genreId),
        ]);
        
        const genre = genresData.genres.find((g: any) => g.id === genreId);
        setGenreName(genre?.name || 'Gênero');
        setInitialData(moviesData);
      } catch (error) {
        console.error('Error loading genre:', error);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) loadData();
  }, [genreId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div
          className="text-center py-12"
          style={{ color: 'var(--color-warning)' }}
        >
          Carregando...
        </div>
      ) : initialData ? (
        <>
          <h1
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Filmes de {genreName}
          </h1>
          <InfiniteScrollMovies
            initialMovies={initialData.results}
            totalPages={initialData.total_pages}
            genreId={genreId}
          />
        </>
      ) : (
        <div
          className="text-center py-12"
          style={{ color: 'var(--color-warning)' }}
        >
          Gênero não encontrado
        </div>
      )}
    </div>
  );
}
