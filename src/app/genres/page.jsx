import { getPublishedEbooks } from "@/lib/queries/queries";
import GenreGrid from "@/components/GenreGrid";

export const dynamic = 'force-dynamic';

export default async function GenresPage() {
  let publishedBooks = [];
  let isLoading = false;

  try {
    publishedBooks = await getPublishedEbooks();
  } catch (err) {
    publishedBooks = [];
    isLoading = true;
  }

  // Extract unique genres from published books
  const genreMap = new Map();
  publishedBooks.ebooks?.forEach((book) => {
    if (book.genre) {
      const count = genreMap.get(book.genre) || 0;
      genreMap.set(book.genre, count + 1);
    }
  });

  const genres = Array.from(genreMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-2">
            All Genres
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Browse our complete collection of book genres
          </p>
        </div>

        {/* Genres Grid */}
        <GenreGrid genres={genres} isLoading={isLoading} />
      </div>
    </div>
  );
}
