import { Movies } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";

export function MovieCard({ movie }: { movie: Movies }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="bg-dark-surface rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105 hover:shadow-xl duration-300">
        <div className="relative aspect-[2/3]">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder-movie.jpg'
            }
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-dark-text line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center mt-1 text-sm text-dark-textSecondary">
            <span className="text-dark-imdb mr-1">★</span>
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
}
