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
      className="bg-dark-surface text-dark-text flex justify-center my-4 rounded-full border border-dark-border"
    >
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 outline-none bg-transparent text-dark-text placeholder-dark-textSecondary"
      />
      <button
        type="submit"
        className="bg-dark-accent text-white px-4 py-2 rounded-r-full hover:bg-dark-hover transition"
      >
        Buscar
      </button>
    </form>
  );
}
