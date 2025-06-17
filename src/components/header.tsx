import Link from "next/link";
import { SearchBar } from "./search-bar";

export function Header() {
  return (
    <header className="container mx-auto px-8 flex items-center justify-between mt-4 rounded-full bg-[var(--color-surface)]">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
          Z
        </span>
        <span style={{ color: 'var(--color-text)' }}>
          Movies
        </span>
      </Link>

      <SearchBar />
    </header>
  );
}
