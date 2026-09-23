import BannerSection from "@/components/BannerSection";
import EbookCard from "@/components/EbookCard";
import GenreCard from "@/components/GenreCard";
import WriterCard from "@/components/WriterCard";

export default function Home() {
  return (
    <div>
      {/* banner section */}
      <BannerSection />

      {/* ebook card */}
      <EbookCard></EbookCard>

      {/* ebook writers */}
      <WriterCard></WriterCard>

      {/* genre card */}
      <GenreCard></GenreCard>
    </div>
  );
}
