import BannerSection from "@/components/BannerSection";
import EbookCard from "@/components/EbookCard";
import GenreCard from "@/components/GenreCard";
import WriterCard from "@/components/WriterCard";
import { getPublishedEbooks, getAllWriters } from "@/lib/queries/queries";

export default async function Home() {
  let publishedBooks = [];
  let writers = [];
  let isLoading = false;

  try {
    [publishedBooks, writers] = await Promise.all([
      getPublishedEbooks(),
      getAllWriters(),
    ]);
  } catch (err) {
    publishedBooks = [];
    writers = [];
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
    <div>
      {/* banner section */}
      <BannerSection />

      {/* ebook card */}
      <EbookCard books={publishedBooks.ebooks || []} isLoading={isLoading} />

      {/* ebook writers */}
      <WriterCard writers={writers} isLoading={isLoading} />

      {/* genre card */}
      <GenreCard genres={genres} isLoading={isLoading} />
    </div>
  );
}
