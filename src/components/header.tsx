import Link from "next/link";
import { SearchBar } from "./search-bar";

export function Header() {
  return (
    <header className="bg-[var(--color-surface)] px-3 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity duration-200"
        >
          <span 
            className="text-xl sm:text-2xl lg:text-3xl font-bold" 
            style={{ color: 'var(--color-accent)' }}
          >
            MovieFinder
          </span>
        </Link>

        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
