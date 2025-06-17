'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchMovies } from '@/services/tmdb';
import { InfiniteScrollMovies } from '@/components/infinite-scroll-movies';
import { SearchBar } from '@/components/search-bar';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Link 
          className="text-dark-textSecondary text-sm hover:text-dark-text transition-colors duration-200 inline-block order-2 sm:order-1" 
          href="/"
        >
          Home
        </Link>
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md lg:max-w-lg order-1 sm:order-2">
          <SearchBar initialValue={query} />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center text-center py-12 text-dark-textSecondary">
          Carregando...
        </div>
      ) : initialData ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-dark-text">
            Resultados para: <span className="text-dark-accent">{query}</span>
          </h1>
          <InfiniteScrollMovies
            initialMovies={initialData.results}
            totalPages={initialData.total_pages}
            searchQuery={query}
          />
        </>
      ) : (
        <div className="text-center py-12 text-dark-textSecondary">
          {query ? 'Nenhum resultado encontrado' : 'Digite um termo para buscar'}
        </div>
      )}
    </div>
  );
}
