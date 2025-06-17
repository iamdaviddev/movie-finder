'use client';
import { useEffect, useState } from 'react';
import { fetchGenres } from '@/services/tmdb';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function GenreFilter() {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadGenres = async () => {
      setLoading(true);
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error loading genres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  if (loading) return <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Filtrar por Gênero</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genero/${genre.id}`}
            className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}