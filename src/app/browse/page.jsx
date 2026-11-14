"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = {
    page: searchParams.get("page") || 1,
    limit: searchParams.get("limit") || 12,
    search: searchParams.get("search") || "",
    genre: searchParams.get("genre") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "title-asc",
    writerId: searchParams.get("writerId") || "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPublishedEbooks(queryParams);
        setData(result);
      } catch (err) {
        console.error("Error fetching ebooks:", err);
        setData({ ebooks: [], pagination: null });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [queryParams]);

  return (
    <div>
      <Browse ebooks={data?.ebooks || []} pagination={data?.pagination} isLoading={isLoading}></Browse>
    </div>
  );
}
