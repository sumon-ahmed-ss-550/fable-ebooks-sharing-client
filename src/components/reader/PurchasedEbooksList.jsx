"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Chip } from "@heroui/react";
import { BookOpen, Magnifier } from "@gravity-ui/icons";
import EbookReaderModal from "./EbookReaderModal";

export default function PurchasedEbooksList({ books = [], user }) {
  const [search, setSearch] = useState("");

  const filtered = books.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.genre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              My Library
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Purchased Ebooks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access your full digital collection and read anytime on any device.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/browse"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Explore More Books →
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {books.length > 0 && (
        <div className="relative max-w-md">
          <Magnifier className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search within your library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      )}

      {/* Grid of Purchased Books */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((book) => (
            <div
              key={book._id}
              className="group bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/40 hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book Cover */}
                <div className="relative aspect-3/4 overflow-hidden bg-slate-950">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-300 border border-amber-400/20">
                    {book.genre || "Fiction"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  {book.purchasedAt
                    ? new Date(book.purchasedAt).toLocaleDateString()
                    : "Owned"}
                </span>

                <EbookReaderModal ebook={book} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-200">
              {books.length === 0 ? "Your library is empty" : "No matches found"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {books.length === 0
                ? "Browse our vast collection of original ebooks and add stories to your digital shelf."
                : "Try a different search term or clear the filter."}
            </p>
          </div>
          {books.length === 0 && (
            <Link
              href="/browse"
              className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-400/20 transition"
            >
              Browse Ebooks Now
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

