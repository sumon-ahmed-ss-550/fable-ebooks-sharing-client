import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

export const dynamic = 'force-dynamic';

export default async function BrowsePage({ searchParams }) {
  const queryParams = {
    page: searchParams.page || 1,
    limit: searchParams.limit || 12,
    search: searchParams.search || "",
    genre: searchParams.genre || "",
    minPrice: searchParams.minPrice || 0,
    maxPrice: searchParams.maxPrice || "",
    sort: searchParams.sort || "title-asc",
    writerId: searchParams.writerId || "",
  };

  let data = null;
  let isLoading = false;

  try {
    data = await getPublishedEbooks(queryParams);
  } catch (err) {
    isLoading = true;
    data = { ebooks: [], pagination: null };
  }

  return (
    <div>
      <Browse ebooks={data?.ebooks || []} pagination={data?.pagination} isLoading={isLoading}></Browse>
    </div>
  );
}
