import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getReaderBookmarks } from "@/lib/queries/queries";
import BookmarksList from "@/components/reader/BookmarksList";
import { Suspense } from "react";
import Loading from "./loading";

async function BookmarksContent({ user }) {
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
    <>
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-400">Error: {error}</p>
          <p className="text-slate-400 mt-2">Please try logging in again.</p>
        </div>
      ) : (
        <BookmarksList initialBookmarks={bookmarks} user={user} />
      )}
    </>
  );
}

export default async function ReaderBookmarkPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <Suspense fallback={<Loading />}>
      <BookmarksContent user={user} />
    </Suspense>
  );
}
