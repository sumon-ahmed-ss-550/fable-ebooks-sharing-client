import BannerSection from "@/components/BannerSection";
import EbookCard from "@/components/EbookCard";
import GenreCard from "@/components/GenreCard";
import WriterCard from "@/components/WriterCard";
import { getPublishedEbooks, getAllWriters } from "@/lib/queries/queries";
import HomeWrapper from "./HomeWrapper";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let publishedBooks = [];
  let writers = [];

  try {
    [publishedBooks, writers] = await Promise.all([
      getPublishedEbooks(),
      getAllWriters(),
    ]);
  } catch (err) {
    console.error("Error fetching data:", err);
    publishedBooks = { ebooks: [] };
    writers = [];
  }

  // Extract unique genres from published books
  const genreMap = new Map();
  publishedBooks?.ebooks?.forEach((book) => {
    if (book.genre) {
      const count = genreMap.get(book.genre) || 0;
      genreMap.set(book.genre, count + 1);
    }
  });

  const genres = Array.from(genreMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <HomeWrapper
      books={publishedBooks?.ebooks || []}
      writers={writers || []}
      genres={genres}
    />
  );
}
