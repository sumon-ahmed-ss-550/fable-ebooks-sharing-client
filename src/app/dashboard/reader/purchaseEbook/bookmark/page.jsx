"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getReaderBookmarks } from "@/lib/queries/queries";
import BookmarksList from "@/components/reader/BookmarksList";

const ReaderBookmarkPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user?.id) {
        try {
          const data = await getReaderBookmarks(user.id);
          setBookmarks(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
          setBookmarks([]);
        }
      }
      setIsLoading(false);
    };

    fetchBookmarks();
  }, [user?.id]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading bookmarks...</p>
        </div>
      ) : (
        <BookmarksList initialBookmarks={bookmarks} user={user} />
      )}
    </div>
  );
};

export default ReaderBookmarkPage;
