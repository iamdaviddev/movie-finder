'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/services/tmdb';
import { InfiniteScrollMovies } from '@/components/infinite-scroll-movies';
import { SearchBar } from '@/components/search-bar';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const search = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setInitialData(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar initialValue={query} />
      </div>

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : initialData ? (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Resultados para: <span className="text-blue-600">{query}</span>
          </h1>
          <InfiniteScrollMovies
            initialMovies={initialData.results}
            totalPages={initialData.total_pages}
            searchQuery={query}
          />
        </>
      ) : (
        <div className="text-center py-12">
          {query ? 'Nenhum resultado encontrado' : 'Digite um termo para buscar'}
        </div>
      )}
    </div>
  );
}