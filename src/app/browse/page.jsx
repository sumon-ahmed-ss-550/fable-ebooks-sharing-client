import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const queryParams = {
    page: params.page || 1,
    limit: params.limit || 12,
    search: params.search || "",
    genre: params.genre || "",
    minPrice: params.minPrice || 0,
    maxPrice: params.maxPrice || "",
    sort: params.sort || "title-asc",
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
};

export default page;
