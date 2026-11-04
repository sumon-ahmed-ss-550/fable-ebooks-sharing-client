"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getReaderBookmarks } from "@/lib/queries/queries";
import BookmarksList from "@/components/reader/BookmarksList";

const WriterBookmarksPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user?.id) {
        try {
          console.log("Fetching bookmarks for user:", user.id);
          const data = await getReaderBookmarks(user.id);
          console.log("Bookmarks data:", data);
          setBookmarks(Array.isArray(data) ? data : []);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
          setError(error.message);
          setBookmarks([]);
        }
      }
      setIsLoading(false);
    };

    fetchBookmarks();
  }, [user?.id]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-zinc-100 max-w-6xl mx-auto">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading bookmarks...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">Error: {error}</p>
          <p className="text-slate-400 mt-2">Please try logging in again.</p>
        </div>
      ) : (
        <BookmarksList initialBookmarks={bookmarks} user={user} />
      )}
    </div>
  );
};

export default WriterBookmarksPage;

