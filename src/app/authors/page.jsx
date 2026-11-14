import { getAllWriters } from "@/lib/queries/queries";
import WritersList from "@/components/WritersList";

export const dynamic = 'force-dynamic';

const AuthorsPage = async () => {
  let writers = [];
  let isLoading = false;

  try {
    writers = await getAllWriters();
  } catch (err) {
    console.error("Error fetching writers:", err);
    writers = [];
    isLoading = true;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <WritersList writers={writers} isLoading={isLoading} />
    </div>
  );
};

export default AuthorsPage;
