"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { House, TriangleExclamation, RotateRight } from "@gravity-ui/icons";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-red-100 dark:bg-red-900/20 rounded-3xl shadow-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
            <TriangleExclamation width={48} height={48} />
          </div>
        </div>

        {/* Error Messaging */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Something Went Wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-8">
          We encountered an unexpected error. Our team has been notified and we're
          working to fix it.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            color="primary"
            variant="solid"
            size="lg"
            startContent={<RotateRight width={18} height={18} />}
            className="w-full sm:w-auto font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          >
            Try Again
          </Button>

          <Button
            as={Link}
            href="/"
            variant="flat"
            size="lg"
            startContent={<House width={18} height={18} />}
            className="w-full sm:w-auto font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            Return Home
          </Button>
        </div>

        {/* Technical Details (Optional) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-left">
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
