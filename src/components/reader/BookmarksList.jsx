"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { Bookmark, BookmarkFill, TrashBin } from "@gravity-ui/icons";
import { readerToggleBookmark } from "@/lib/action/action";
import { useRouter } from "next/navigation";

export default function BookmarksList({ initialBookmarks = [], user }) {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (ebookId) => {
    setRemovingId(ebookId);
    try {
      await readerToggleBookmark(user?.id, ebookId);
      setBookmarks((prev) => prev.filter((b) => (b._id?.$oid || b._id) !== ebookId));
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <BookmarkFill className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Saved Stories
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Bookmarked Ebooks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Titles you have saved for later reading and discovery.
          </p>
        </div>

        <div>
          <Link
            href="/browse"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Discover More Books →
          </Link>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((book) => {
            const ebookId = book._id?.$oid || book._id;
            return (
              <div
                key={ebookId}
                className="group bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/40 hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-3/4 overflow-hidden bg-slate-950">
                    {book.coverImage && (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-amber-400/20">
                      {book.genre || "General"}
                    </span>
                    <button
                      onClick={() => handleRemove(ebookId)}
                      disabled={removingId === ebookId}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-slate-950/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors border border-slate-800"
                      title="Remove Bookmark"
                    >
                      <TrashBin className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    ${Number(book.price || 0).toFixed(2)}
                  </span>
                  <Link
                    href={`/browse/${encodeURIComponent(ebookId)}`}
                    className="px-3.5 py-1.5 bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-semibold rounded-lg border border-amber-400/20 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">No bookmarks yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Click the bookmark icon on any ebook while browsing to save it here.
            </p>
          </div>
          <Link
            href="/browse"
            className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-400/20 transition"
          >
            Browse Library
          </Link>
        </div>
      )}
    </div>
  );
}

