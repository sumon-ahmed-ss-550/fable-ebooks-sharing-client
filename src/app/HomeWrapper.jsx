"use client";

import { useState, useEffect } from "react";
import BannerSection from "@/components/BannerSection";
import EbookCard from "@/components/EbookCard";
import GenreCard from "@/components/GenreCard";
import WriterCard from "@/components/WriterCard";

export default function HomeWrapper({ books, writers, genres }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show skeleton only on first mount for smooth UX
  const isLoading = !isMounted;

  console.log("HomeWrapper render - isMounted:", isMounted);
  console.log("HomeWrapper render - isLoading:", isLoading);
  console.log("HomeWrapper render - books length:", books?.length);

  return (
    <div>
      {/* banner section */}
      <BannerSection />

      {/* ebook card */}
      <EbookCard books={books || []} isLoading={isLoading} />

      {/* ebook writers */}
      <WriterCard writers={writers || []} isLoading={isLoading} />

      {/* genre card */}
      <GenreCard genres={genres || []} isLoading={isLoading} />
    </div>
  );
}
