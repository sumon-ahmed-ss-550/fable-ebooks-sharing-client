import BannerSection from "@/components/BannerSection";
import EbookCard from "@/components/EbookCard";
import GenreCard from "@/components/GenreCard";
import WriterCard from "@/components/WriterCard";
import { getPublishedEbooks } from "@/lib/queries/queries";

export default async function Home() {
  let publishedBooks = [];
  let isLoading = false;
  try {
    publishedBooks = await getPublishedEbooks();
  } catch (err) {
    publishedBooks = [];
    isLoading = true;
  }

  return (
    <div>
      {/* banner section */}
      <BannerSection />

      {/* ebook card */}
      <EbookCard books={publishedBooks} isLoading={isLoading} />

      {/* ebook writers */}
      <WriterCard />

      {/* genre card */}
      <GenreCard />
    </div>
  );
}
