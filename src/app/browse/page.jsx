import Browse from "@/components/BrowsePage";
import { getPublishedEbooks } from "@/lib/queries/queries";

const page = async () => {
  const ebooks = await getPublishedEbooks();

  return (
    <div>
      <Browse ebooks={ebooks}></Browse>
    </div>
  );
};

export default page;
