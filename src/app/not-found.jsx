"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@heroui/react";

// Gravity UI Icons (Direct Imports)
import { House, Magnifier, BookOpen, ArrowLeft } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Visual Animated Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative inline-block mb-6 select-none"
        >
          {/* Subtle Background 404 Watermark */}
          <span className="text-9xl sm:text-[12rem] font-extrabold text-slate-200/80 dark:text-slate-800/60 tracking-tight leading-none block">
            404
          </span>

          {/* Floating Book Badge */}
          <motion.div
            initial={{ y: 8 }}
            animate={{ y: -8 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <BookOpen width={36} height={36} />
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
              <Magnifier width={28} height={28} className="text-slate-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The book or page you are looking for seems to have vanished from our
            catalog or has been moved.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            as={Link}
            href="/"
            color="primary"
            variant="solid"
            size="lg"
            startContent={<House width={18} height={18} />}
            className="w-full sm:w-auto font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          >
            Return Home
          </Button>

          <Button
            as={Link}
            href="/browse"
            variant="flat"
            size="lg"
            startContent={<BookOpen width={18} height={18} />}
            className="w-full sm:w-auto font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            Browse Ebooks
          </Button>
        </motion.div>

        {/* Go Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-10"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft width={16} height={16} />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </main>
  );
}
