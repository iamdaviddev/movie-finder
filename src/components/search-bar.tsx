'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/buscar?query=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark-surface text-dark-text flex w-full max-w-xl mx-auto my-4 rounded-full border border-dark-border overflow-hidden"
    >
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 text-sm sm:text-base outline-none bg-transparent text-dark-text placeholder-dark-textSecondary"
      />
      <button
        type="submit"
        className="bg-dark-accent text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold hover:bg-dark-hover transition-colors duration-200"
      >
        Buscar
      </button>
    </form>
  );
}
