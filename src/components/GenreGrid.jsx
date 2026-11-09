"use client";

import { motion } from "framer-motion";

export default function GenreGrid({ genres = [], isLoading = false }) {
  return (
    <div>
      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading genres...</p>
        </div>
      ) : genres.length > 0 ? (
        /* Genres Grid */
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {genres.map((genre) => (
            <motion.a
              key={genre.name}
              href={`/browse?genre=${encodeURIComponent(genre.name)}`}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-violet-950/20 hover:bg-slate-900/90 transition-all cursor-pointer"
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
