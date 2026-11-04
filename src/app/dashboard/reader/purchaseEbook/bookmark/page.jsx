import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getReaderBookmarks } from "@/lib/queries/queries";
import BookmarksList from "@/components/reader/BookmarksList";

export default async function ReaderBookmarkPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let bookmarks = [];
  let error = null;

  if (user?.id) {
    try {
      const data = await getReaderBookmarks(user.id);
      bookmarks = Array.isArray(data) ? data : [];
    } catch (err) {
      error = err.message;
      bookmarks = [];
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-400">Error: {error}</p>
          <p className="text-slate-400 mt-2">Please try logging in again.</p>
        </div>
      ) : (
        <BookmarksList initialBookmarks={bookmarks} user={user} />
      )}
    </div>
  );
}
