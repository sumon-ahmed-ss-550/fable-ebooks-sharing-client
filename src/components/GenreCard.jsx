"use client";

import { motion } from "framer-motion";
import { GenreCardSkeleton } from "./LoadingSkeleton";

export default function GenreCard({ genres = [], isLoading = false }) {
  // Use real genres data or show loading state
  const displayGenres = genres.slice(0, 8);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Explore Popular Genres
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse through our vast collection organized by your favorite
            categories
          </p>
        </div>
        <a
          href="/genres"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline mt-2 sm:mt-0 transition-colors"
        >
          All Genres →
        </a>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
          <GenreCardSkeleton />
        </div>
      ) : displayGenres.length > 0 ? (
        /* Genres Grid */
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayGenres.map((genre) => (
            <motion.a
              key={genre.name}
              href={`/browse?genre=${encodeURIComponent(genre.name)}`}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 p-5 rounded-2xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-violet-950/20 hover:bg-slate-900/90 transition-all cursor-pointer"
            >
              <span className="font-bold text-slate-200 group-hover:text-amber-400 text-sm sm:text-base transition-colors">
                {genre.name}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400/70 mt-1">
                {genre.count} Books
              </span>
            </motion.a>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 mb-4">No genres available yet.</p>
          <a
            href="/browse"
            className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition"
          >
            Browse All Ebooks
          </a>
        </div>
      )}
    </div>
  );
}
