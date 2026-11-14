"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { readerToggleBookmark } from "@/lib/action/action";
import { getReaderBookmarkIds } from "@/lib/queries/queries";
import SimplePagination from "./Pagination";
import { EbookCardSkeleton } from "./LoadingSkeleton";

const Browse = ({ ebooks = [], pagination = null, isLoading = false }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [bookmarks, setBookmarks] = useState({});
  const [searchInput, setSearchInput] = useState("");

  // Get filter values from URL
  const searchQuery = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortOrder = searchParams.get("sort") || "title-asc";
  const writerId = searchParams.get("writerId") || "";

  // Sync search input with URL on mount and URL changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const availableEbooks = Array.isArray(ebooks) ? ebooks : [];
  const genres = [
    ...new Set(availableEbooks.map((ebook) => ebook.genre).filter(Boolean)),
  ].sort((first, second) => first.localeCompare(second));

  // Debounced function to update URL params
  const updateURL = useCallback((params) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });
    router.push(`/browse?${currentParams.toString()}`);
  }, [searchParams, router]);

  // Debounced search update
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update if the search param is different from current value
      const currentSearch = searchParams.get("search") || "";
      if (currentSearch !== searchInput) {
        updateURL({ search: searchInput });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, updateURL]);

  // Load existing bookmarks for logged in user
  useEffect(() => {
    if (!user?.id) return;
    getReaderBookmarkIds(user.id)
      .then((ids) => {
        if (Array.isArray(ids)) {
          const map = {};
          ids.forEach((id) => {
            map[id] = true;
          });
          setBookmarks(map);
        }
      })
      .catch((err) => console.error("Error fetching bookmarks:", err));
  }, [user?.id]);

  const toggleBookmark = async (id) => {
    // optimistic update
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (user?.id) {
      try {
        await readerToggleBookmark(user.id, id);
      } catch (err) {
        console.error("Bookmark toggle failed:", err);
      }
    }
  };

  const clearFilters = () => {
    router.push("/browse");
  };

  // Show writer info if filtering by writer
  const showWriterFilter = writerId !== "";

  // Handlers for filter changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleGenreChange = (e) => {
    updateURL({ genre: e.target.value });
  };

  const handleMaxPriceChange = (e) => {
    updateURL({ maxPrice: e.target.value });
  };

  const handleSortChange = (e) => {
    updateURL({ sort: e.target.value });
  };

  return (
    <section className="bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            The Fable Library
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
            Find your next favorite read
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
            Explore stories from independent writers and discover a book worth
            getting lost in.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="sm:col-span-2 lg:col-span-1">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Search books
              </span>
              <input
                type="search"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Title, description, genre..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Genre
              </span>
              <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              >
                <option value="">All genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Maximum price
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Any price"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sort by
              </span>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              >
                <option value="title-asc">Title: A to Z</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400" aria-live="polite">
              Showing{" "}
              <span className="font-semibold text-slate-200">
                {availableEbooks.length}
              </span>{" "}
              {availableEbooks.length === 1 ? "book" : "books"}
              {showWriterFilter && (
                <span className="ml-2 text-amber-400">
                  (by Writer)
                </span>
              )}
            </p>
            {(searchQuery ||
              selectedGenre ||
              maxPrice ||
              sortOrder !== "title-asc" ||
              showWriterFilter) && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ebooks card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 8 }).map((_, index) => (
              <EbookCardSkeleton key={index} />
            ))
          ) : availableEbooks.length > 0 ? (
            availableEbooks.map((ebook) => {
              const ebookId = ebook._id?.$oid || ebook._id;
              const isBookmarked = !!bookmarks[ebookId];

              return (
                <div
                  key={ebookId}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-violet-950/20"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                    <img
                      src={ebook.coverImage}
                      alt={ebook.title || "Ebook Cover"}
                      loading="eager"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 z-10 rounded-full border border-amber-400/20 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300 shadow-md backdrop-blur-md">
                      {ebook.genre}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(ebookId)}
                      className={`absolute right-3 top-3 z-10 rounded-full border p-2.5 shadow-md backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer ${
                        isBookmarked
                          ? "border-amber-300 bg-amber-400 text-slate-950 hover:bg-amber-300"
                          : "border-white/15 bg-slate-950/70 text-white hover:border-amber-300/50 hover:bg-slate-900 hover:text-amber-300"
                      }`}
                      aria-label={
                        isBookmarked
                          ? `Remove ${ebook.title} from bookmarks`
                          : `Bookmark ${ebook.title}`
                      }
                      aria-pressed={isBookmarked}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill={isBookmarked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-grow flex-col justify-between bg-slate-900/40 p-5">
                    <div>
                      <h2 className="line-clamp-1 text-lg font-bold text-slate-100 transition-colors duration-200 group-hover:text-amber-300">
                        {ebook.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                        {ebook.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                      <div className="shrink-0">
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                          Price
                        </span>
                        <span className="text-lg font-extrabold text-amber-400">
                          ${Number(ebook.price || 0).toFixed(2)}
                        </span>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          ebook.status === "published"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : "border-amber-400/20 bg-amber-400/10 text-amber-300"
                        }`}
                      >
                        {ebook.status}
                      </span>
                    </div>
                    <Link
                      href={`/browse/${encodeURIComponent(ebookId)}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:border-amber-300 hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      View book details
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900/50 py-16 text-center text-slate-400">
              <p className="text-lg font-semibold text-slate-200">
                {availableEbooks.length
                  ? "No books match your filters"
                  : "No ebooks to explore just yet"}
              </p>
              <p className="mt-2 text-sm">
                {availableEbooks.length
                  ? "Try changing your search or clearing some filters."
                  : "Check back soon for new stories from Fable writers."}
              </p>
              {availableEbooks.length > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-amber-400 transition hover:bg-amber-400/10 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-8 flex justify-center">
            <SimplePagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", page);
                router.push(`/browse?${params.toString()}`);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Browse;
