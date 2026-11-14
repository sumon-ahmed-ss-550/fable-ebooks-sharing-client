"use client";

import { useState, useEffect } from "react";
import { getPublishedEbooks } from "@/lib/queries/queries";
import GenreGrid from "@/components/GenreGrid";

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const publishedBooks = await getPublishedEbooks();

        // Extract unique genres from published books
        const genreMap = new Map();
        publishedBooks.ebooks?.forEach((book) => {
          if (book.genre) {
            const count = genreMap.get(book.genre) || 0;
            genreMap.set(book.genre, count + 1);
          }
        });

        const genreList = Array.from(genreMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setGenres(genreList);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setGenres([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

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
