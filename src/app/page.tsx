import { Footer } from "@/components/footer";
import { BackgroundCarrosel } from "@/components/background-carousel";
import { MovieList } from "@/components/movie-list";
import { GenreFilter } from "@/components/genre-filter";

export default function Home() {
  return (
    <div className="">
      <BackgroundCarrosel />
      
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <GenreFilter />
          <MovieList />
        </div>
      </main>
      
    </div>
  );
}