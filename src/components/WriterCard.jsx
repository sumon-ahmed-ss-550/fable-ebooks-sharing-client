"use client";

import { motion } from "framer-motion";
import { WriterCardSkeleton } from "./LoadingSkeleton";

export default function WriterCard({ writers = [], isLoading = false }) {
  // Default badge based on writer stats
  const getBadge = (writer) => {
    if (writer.writerVerificationStatus === "verified") {
      return "Verified Writer";
    }
    if (writer.stats?.totalBooks >= 10) {
      return "Popular Writer";
    }
    if (writer.stats?.totalSales >= 5) {
      return "Top Seller";
    }
    return "Featured Author";
  };

  // Use real writers data or show loading state
  const topWriters = writers.slice(0, 3);

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

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <WriterCardSkeleton />
          <WriterCardSkeleton />
          <WriterCardSkeleton />
        </div>
      ) : topWriters.length > 0 ? (
        /* Writers Grid */
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
              key={writer._id}
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
                  {writer.image ? (
                    <img
                      src={writer.image}
                      alt={writer.name}
                      loading="eager"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-amber-400/40 group-hover:border-amber-400 transition-colors shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border-2 border-amber-400/40 group-hover:border-amber-400 transition-colors shadow-md">
                      <span className="text-3xl font-bold text-amber-400">
                        {writer.name?.charAt(0)?.toUpperCase() || "A"}
                      </span>
                    </div>
                  )}
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 text-amber-400 text-[10px] sm:text-xs font-bold px-3 py-0.5 rounded-full border border-amber-400/30 shadow">
                    {getBadge(writer)}
                  </span>
                </div>

                {/* Writer Info */}
                <h3 className="font-bold text-lg sm:text-xl text-slate-100 group-hover:text-amber-400 transition-colors mt-2">
                  {writer.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-400/90 font-medium mb-3">
                  {getBadge(writer)} • {writer.stats?.totalBooks || 0} Ebooks
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {writer.bio || "A talented writer sharing their stories with the world."}
                </p>
              </div>

              {/* Action Link */}
              <a
                href={`/browse?writerId=${writer._id}`}
                className="w-full py-2.5 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700/50 hover:border-amber-400 transition-all text-center"
              >
                View Ebooks
              </a>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 mb-4">No featured authors available yet.</p>
          <a
            href="/authors"
            className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition"
          >
            View All Authors
          </a>
        </div>
      )}
    </div>
  );
}
