"use client";

import { motion } from "framer-motion";

export default function GlobalLoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const ringSize = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={sizeClasses[size]}>
        <motion.div
          className={`relative ${ringSize[size]}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
          {/* Animated amber segment */}
          <motion.div
            className="absolute inset-0 border-4 border-amber-400 rounded-full border-t-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Full-screen loading overlay
export function FullScreenLoading({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <GlobalLoadingSpinner size="xl" />
        <motion.p
          className="text-slate-300 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
