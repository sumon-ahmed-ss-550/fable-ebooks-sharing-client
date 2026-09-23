"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WriterCard() {
  // Hard-coded writers data inside the component
  const topWriters = [
    {
      id: 1,
      name: "John Carter",
      badge: "Popular Writer",
      booksCount: 14,
      bio: "Best-selling mystery & psychological thriller novelist with over a decade of storytelling.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Sarah Williams",
      badge: "Featured Author",
      booksCount: 9,
      bio: "Award-winning speculative fiction and deep space opera author.",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Michael Brown",
      badge: "Top Rated",
      booksCount: 21,
      bio: "Crafting immersive dark fantasy realms, epic sagas, and ancient mythos.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Top Featured Authors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Meet the talented minds bringing extraordinary stories to life
          </p>
        </div>
        <a
          href="/authors"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline mt-2 sm:mt-0 transition-colors"
        >
          View All Authors →
        </a>
      </div>

      {/* Writers Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {topWriters.map((writer) => (
          <motion.div
            key={writer.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -6 }}
            className="group bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-lg transition-all flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-5">
                <Image
                  width={112}
                  height={112}
                  src={writer.avatar}
                  alt={writer.name}
                  loading="eager"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-amber-400/40 group-hover:border-amber-400 transition-colors shadow-md"
                />
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 text-amber-400 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full border border-amber-400/30 shadow">
                  {writer.badge}
                </span>
              </div>

              {/* Writer Info */}
              <h3 className="font-bold text-lg sm:text-xl text-slate-100 group-hover:text-amber-400 transition-colors mt-2">
                {writer.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-400/90 font-medium mb-3">
                Popular Writer • {writer.booksCount} Ebooks
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {writer.bio}
              </p>
            </div>

            {/* Action Link */}
            <a
              href={`/browse?writer=${encodeURIComponent(writer.name.toLowerCase())}`}
              className="w-full py-2.5 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700/50 hover:border-amber-400 transition-all text-center"
            >
              View Ebooks
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
