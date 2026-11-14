import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

export const dynamic = 'force-dynamic';

export default async function BrowsePage({ searchParams }) {
  const params = await searchParams;
  const queryParams = {
    page: parseInt(params.page) || 1,
    limit: parseInt(params.limit) || 12,
    search: params.search || "",
    genre: params.genre || "",
    minPrice: parseFloat(params.minPrice) || 0,
    maxPrice: params.maxPrice || "",
    sort: params.sort || "title-asc",
    writerId: params.writerId || "",
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
