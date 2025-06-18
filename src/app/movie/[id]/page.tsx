'use client';

import { useEffect, useState } from 'react';
import { api, fetchMovieDetails } from '@/services/tmdb';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { MovieCard } from '@/components/movie-card';
import type { Genre, Movies, MovieDetails } from '@/types/movies';
import { Header } from '@/components/header';

export default function MovieDetails() {
  const params = useParams();
  const router = useRouter();
  const movieId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState<Movies[]>([]);

  useEffect(() => {
    if (!movieId) return;

    const loadData = async () => {
      try {
        setLoading(true);

        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        console.log('Videos:', data.videos);
        const similar = await api.get(`/movie/${movieId}/similar`);
        setSimilarMovies(similar.data.results.slice(0, 5));
      } catch (error) {
        console.error('Error loading movie:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [movieId, router]);

  if (loading) {
    return (
      <div style={{ color: 'var(--color-warning)' }} className="text-center py-12">
        Carregando...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12 text-red-500">
        Filme não encontrado.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <div className="flex flex-col md:flex-row gap-8 mt-12 mb-12">
        <div className="md:w-1/3">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="rounded-lg shadow-lg w-full"
              priority
            />
          ) : (
            <div className="w-full h-[750px] bg-gray-800 flex items-center justify-center rounded-lg text-white">
              Imagem indisponível
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre: Genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: 'var(--color-hover)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
            <span>{movie.runtime} minutos</span>
            <span>{movie.release_date?.split('-')[0]}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            Sinopse
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            {movie.overview || 'Sinopse não disponível.'}
          </p>

          {movie.videos.results && movie.videos.results.length > 0 && (() => {
            const trailer = movie.videos.results.find(
              (video) => video.site === 'YouTube' && video.type === 'Trailer'
            );
            return trailer ? (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  Trailer
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    className="w-full h-64 md:h-96 rounded-lg"
                    style={{ border: '2px solid var(--color-border)' }}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null;
          })()}
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            Filmes Similares
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
