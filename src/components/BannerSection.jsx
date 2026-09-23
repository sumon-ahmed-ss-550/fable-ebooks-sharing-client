"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";

const heroSlides = [
  {
    id: 1,
    tag: "Featured Collection",
    title: "Discover & Read Original Ebooks",
    highlight: "Original Ebooks",
    description:
      "Explore a rich collection of original stories, indie masterpieces, and thought-provoking literature crafted by passion-driven writers worldwide.",
    ctaText: "Browse Ebooks",
    ctaLink: "/browse",
    secondaryCtaText: "Explore Genres",
    secondaryCtaLink: "#genres",
  },
  {
    id: 2,
    tag: "Trending Sci-Fi & Fantasy",
    title: "Unravel Worlds Beyond Imagination",
    highlight: "Beyond Imagination",
    description:
      "Immerse yourself in futuristic cyberpunk sagas, deep space chronicles, and epic high-fantasy mythologies written by visionary authors.",
    ctaText: "Explore Sci-Fi",
    ctaLink: "/browse?genre=sci-fi",
    secondaryCtaText: "Popular Authors",
    secondaryCtaLink: "#writers",
  },
  {
    id: 3,
    tag: "Indie Authors Highlight",
    title: "Publish & Share Your Own Story",
    highlight: "Your Own Story",
    description:
      "Are you a passionate writer? Join our thriving community, reach thousands of eager readers, and monetize your digital books directly.",
    ctaText: "Start Publishing",
    ctaLink: "/publish",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "/about",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right/next, -1 = left/prev
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(slideNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slideNext]);

  // Framer Motion Animation Variants for Slide Transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <section
      className="relative pt-16 pb-12 overflow-hidden border-b border-slate-800/50 bg-slate-950 text-slate-100 min-h-115 sm:min-h-125 flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-75 h-50 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
        <div className="max-w-4xl mx-auto min-h-75 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              {/* Category Badge */}
              <span className="px-3.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full shadow-sm mb-4 inline-block">
                {currentSlide.tag}
              </span>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
                {currentSlide.title.replace(currentSlide.highlight, "")}
                <span className="bg-linear-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  {currentSlide.highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  href={currentSlide.ctaLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all text-xs sm:text-sm tracking-wide"
                >
                  {currentSlide.ctaText}
                </motion.a>

                {currentSlide.secondaryCtaText && (
                  <motion.a
                    href={currentSlide.secondaryCtaLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-bold rounded-xl transition-all text-xs sm:text-sm"
                  >
                    {currentSlide.secondaryCtaText}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls (Arrows, Dots & Auto-play Toggle) */}
        <div className="mt-8 flex items-center justify-between max-w-xs mx-auto">
          {/* Prev Arrow */}
          <button
            onClick={slidePrev}
            aria-label="Previous Slide"
            className="p-2 bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-full transition-all cursor-pointer shadow-md"
          >
            <FiChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-7 bg-amber-400"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={slideNext}
            aria-label="Next Slide"
            className="p-2 bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-full transition-all cursor-pointer shadow-md"
          >
            <FiChevronRight size={18} />
          </button>

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            className="p-2 bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-amber-400 rounded-full transition-all cursor-pointer"
            title={isAutoPlaying ? "Pause Auto-play" : "Start Auto-play"}
          >
            {isAutoPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
