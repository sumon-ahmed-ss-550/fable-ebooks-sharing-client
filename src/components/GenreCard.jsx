"use client";

import { motion } from "framer-motion";

export default function GenreCard() {
  // Hard-coded genres data inside the component
  const genres = [
    { name: "Fiction", count: "1,240+ Books" },
    { name: "Mystery", count: "850+ Books" },
    { name: "Romance", count: "920+ Books" },
    { name: "Sci-Fi", count: "640+ Books" },
    { name: "Fantasy", count: "1,100+ Books" },
    { name: "Horror", count: "430+ Books" },
    { name: "Thriller", count: "780+ Books" },
    { name: "Adventure", count: "510+ Books" },
  ];

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

      {/* Genres Grid */}
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
        {genres.map((genre) => (
          <motion.a
            key={genre.name}
            href={`/browse?genre=${encodeURIComponent(genre.name.toLowerCase())}`}
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
              {genre.count}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
