"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@heroui/react";

// Gravity UI Icons
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe,
} from "@gravity-ui/icons";
import Image from "next/image";

const slides = [
  {
    id: 1,
    tag: "Democratizing Literature",
    title: "Read, Share & Discover Unlimited eBooks",
    description:
      "Empowering readers and emerging writers worldwide. Access a diverse library, purchase securely via Stripe, and track your reading journey.",
    badgeIcon: Globe,
    ctaText: "Explore Catalog",
    ctaLink: "/browse",
    secondaryCtaText: "Start Writing",
    secondaryCtaLink: "/dashboard",
    // Unsplash high quality digital reading / ebook art
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-indigo-600/90 via-slate-900/80 to-slate-950",
  },
  {
    id: 2,
    tag: "For Independent Authors",
    title: "Publish Your Stories to a Global Audience",
    description:
      "Upload your manuscripts, manage availability, track real-time sales analytics, and connect directly with passionate readers.",
    badgeIcon: Sparkles,
    ctaText: "Become an Author",
    ctaLink: "/dashboard",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "/about",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600/90 via-slate-900/80 to-slate-950",
  },
  {
    id: 3,
    tag: "Seamless & Secure",
    title: "Instant Access & Role-Based Workspaces",
    description:
      "Experience Stripe-powered checkout, role-based user management, instant JWT authentication, and interactive reading dashboards.",
    badgeIcon: ShieldCheck,
    ctaText: "Browse eBooks",
    ctaLink: "/browse",
    secondaryCtaText: "Join Fable Today",
    secondaryCtaLink: "/login",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600/90 via-slate-900/80 to-slate-950",
  },
];

export default function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds (pauses when user hovers)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[currentIndex];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <section
      aria-label="Hero Banner Slider"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white min-h-130 sm:min-h-140 flex items-center shadow-2xl border border-slate-800">
        {/* Background Image Carousel with Fade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-0"
          >
            <Image
              width={1200}
              height={600}
              src={activeSlide.image}
              alt={activeSlide.title}
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
            {/* Dynamic Dark Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${activeSlide.gradient} opacity-95`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full p-8 sm:p-12 lg:p-16 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white shadow-sm">
                <BadgeIcon width={16} height={16} className="text-indigo-300" />
                <span>{activeSlide.tag}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                {activeSlide.title}
              </h1>

              {/* Description */}
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {activeSlide.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  as={Link}
                  href={activeSlide.ctaLink}
                  color="primary"
                  variant="solid"
                  size="lg"
                  endContent={<ArrowRight width={18} height={18} />}
                  className="font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  {activeSlide.ctaText}
                </Button>

                <Button
                  as={Link}
                  href={activeSlide.secondaryCtaLink}
                  variant="bordered"
                  size="lg"
                  startContent={<BookOpen width={18} height={18} />}
                  className="font-medium text-white border-white/30 hover:bg-white/10 hover:border-white/60 backdrop-blur-sm"
                >
                  {activeSlide.secondaryCtaText}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-indigo-600 text-white border border-white/10 backdrop-blur-md transition-all duration-200 focus:outline-none"
          >
            <ChevronLeft width={20} height={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-indigo-600 text-white border border-white/10 backdrop-blur-md transition-all duration-200 focus:outline-none"
          >
            <ChevronRight width={20} height={20} />
          </button>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-8 left-8 sm:left-12 lg:left-16 z-30 flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-indigo-400"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
