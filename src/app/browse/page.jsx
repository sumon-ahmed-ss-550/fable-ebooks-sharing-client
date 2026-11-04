import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

const page = async ({ searchParams }) => {
  const params = {
    page: searchParams.page || 1,
    limit: searchParams.limit || 12,
    search: searchParams.search || "",
    genre: searchParams.genre || "",
    minPrice: searchParams.minPrice || 0,
    maxPrice: searchParams.maxPrice || "",
    sort: searchParams.sort || "newest",
  };

  const data = await getPublishedEbooks(params);

  return (
    <div>
      <Browse ebooks={data?.ebooks || []} pagination={data?.pagination}></Browse>
    </div>
  );
};

export default page;
