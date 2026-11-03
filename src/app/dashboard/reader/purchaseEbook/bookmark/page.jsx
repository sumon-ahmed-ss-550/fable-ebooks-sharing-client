import { auth } from "@/lib/auth";
import { getReaderBookmarks } from "@/lib/queries/queries";
import { headers } from "next/headers";
import BookmarksList from "@/components/reader/BookmarksList";

const ReaderBookmarkPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const bookmarks = user?.id ? await getReaderBookmarks(user.id) : [];

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <BookmarksList
        initialBookmarks={Array.isArray(bookmarks) ? bookmarks : []}
        user={user}
      />
    </div>
  );
};

export default ReaderBookmarkPage;
