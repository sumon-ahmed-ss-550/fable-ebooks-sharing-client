"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Magnifier, BookOpen, ChartBar, Star } from "@gravity-ui/icons";

export default function WritersList({ writers = [], isLoading = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [sortBy, setSortBy] = useState("books");

  // Get all unique genres from writers
  const allGenres = [
    ...new Set(
      writers.flatMap((w) => w.stats?.topGenres || []).filter(Boolean)
    ),
  ].sort();

  // Filter writers
  const filteredWriters = writers.filter((writer) => {
    const matchesSearch =
      writer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.bio?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      !filterGenre ||
      (writer.stats?.topGenres || []).includes(filterGenre);

    return matchesSearch && matchesGenre;
  });

  // Sort writers
  const sortedWriters = [...filteredWriters].sort((a, b) => {
    if (sortBy === "books") {
      return b.stats?.totalBooks - a.stats?.totalBooks;
    } else if (sortBy === "sales") {
      return b.stats?.totalSales - a.stats?.totalSales;
    } else if (sortBy === "earnings") {
      return b.stats?.totalEarnings - a.stats?.totalEarnings;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-2">
              All Authors
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Discover talented writers and explore their published works
            </p>
          </div>
          <Link
            href="/browse"
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl border border-amber-400/30 transition-all text-center"
          >
            Browse Ebooks
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition"
            >
              <option value="">All Genres</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-sm text-slate-100 focus:outline-none focus:border-amber-400 transition"
            >
              <option value="books">Most Books</option>
              <option value="sales">Most Sales</option>
              <option value="earnings">Highest Earnings</option>
            </select>
          </div>

          <p className="text-sm text-slate-400">
            Showing {sortedWriters.length} of {writers.length} authors
          </p>
        </div>
      </div>

      {/* Writers Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading authors...</p>
        </div>
      ) : sortedWriters.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedWriters.map((writer) => (
            <motion.div
              key={writer._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 shadow-lg transition-all"
            >
              {/* Writer Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  {writer.image ? (
                    <img
                      src={writer.image}
                      alt={writer.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-700"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                  {writer.writerVerificationStatus === "verified" && (
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors">
                    {writer.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {writer.bio || "No bio available"}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-950/50 rounded-xl">
                <div className="text-center">
                  <BookOpen className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <p className="text-lg font-bold text-slate-100">
                    {writer.stats?.totalBooks || 0}
                  </p>
                  <p className="text-[10px] text-slate-400">Books</p>
                </div>
                <div className="text-center">
                  <ChartBar className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                  <p className="text-lg font-bold text-slate-100">
                    {writer.stats?.totalSales || 0}
                  </p>
                  <p className="text-[10px] text-slate-400">Sales</p>
                </div>
                <div className="text-center">
                  <Star className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                  <p className="text-lg font-bold text-slate-100">
                    ${writer.stats?.totalEarnings?.toFixed(0) || 0}
                  </p>
                  <p className="text-[10px] text-slate-400">Earned</p>
                </div>
              </div>

              {/* Genres */}
              {(writer.stats?.topGenres || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {writer.stats.topGenres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] rounded-lg"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <Link
                href={`/browse?writerId=${writer._id}`}
                className="block w-full py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-sm font-semibold rounded-xl border border-slate-700/50 hover:border-amber-400 transition-all text-center"
              >
                View Books
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-200 mb-2">
            No authors found
          </h3>
          <p className="text-slate-400 mb-4">
            {writers.length === 0
              ? "No writers have published any books yet."
              : "Try adjusting your search or filters."}
          </p>
          <Link
            href="/browse"
            className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition"
          >
            Browse Ebooks
          </Link>
        </div>
      )}
    </div>
  );
}
