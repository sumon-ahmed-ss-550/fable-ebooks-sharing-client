"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function EbookCard() {
  const [selectedBook, setSelectedBook] = useState(null);

  // Hard-coded mock data inside the component
  const ebooks = [
    {
      id: 1,
      title: "The Silent Ocean",
      author: "John Carter",
      genre: "Mystery",
      rating: 4.9,
      reviews: 128,
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      price: "$9.99",
      description:
        "Deep beneath the calm waters lies a secret that could alter humanity forever. A detective takes on his toughest case yet.",
      pages: 342,
      published: "2024",
    },
    {
      id: 2,
      title: "Echoes of Eternity",
      author: "Sarah Williams",
      genre: "Sci-Fi",
      rating: 4.8,
      reviews: 95,
      cover:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
      price: "$12.50",
      description:
        "Traversing across multi-planetary colonizations, two scientists fight time and causality to save earth's last archive.",
      pages: 410,
      published: "2023",
    },
    {
      id: 3,
      title: "Whispers in the Mist",
      author: "Michael Brown",
      genre: "Fantasy",
      rating: 4.7,
      reviews: 210,
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      price: "$8.99",
      description:
        "An ancient forest holds guardians of old spellcraft. When darkness creeps in, an unlikely hero steps forward.",
      pages: 288,
      published: "2024",
    },
    {
      id: 4,
      title: "Letters to Yesterday",
      author: "Elena Rostova",
      genre: "Romance",
      rating: 4.9,
      reviews: 340,
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
      price: "$7.99",
      description:
        "Found tucked inside a vintage bookstore in Paris, a series of wartime letters unlocks a love story that transcended decades.",
      pages: 256,
      published: "2023",
    },
    {
      id: 5,
      title: "The Quantum Paradox",
      author: "Marcus Vance",
      genre: "Sci-Fi",
      rating: 4.6,
      reviews: 82,
      cover:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      price: "$14.99",
      description:
        "When artificial consciousness achieves emotional resonance, humanity must question what truly defines the human soul.",
      pages: 520,
      published: "2024",
    },
    {
      id: 6,
      title: "Shadows Over Venice",
      author: "John Carter",
      genre: "Thriller",
      rating: 4.8,
      reviews: 175,
      cover:
        "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
      price: "$10.99",
      description:
        "A high-stakes thriller navigating political intrigue and covert societies across Venetian canals during Carnival week.",
      pages: 380,
      published: "2024",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Featured Ebooks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Handpicked titles carefully selected for you this week
          </p>
        </div>
        <a
          href="/browse"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline mt-2 sm:mt-0 transition-colors"
        >
          Explore All →
        </a>
      </div>

      {/* Staggered Grid Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {ebooks.map((book) => (
          <motion.div
            key={book.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-950/20 hover:border-violet-500/30 transition-all flex flex-col h-full"
          >
            {/* Cover Image Container */}
            <div className="relative aspect-3/4 overflow-hidden bg-slate-950">
              <Image
                width={400}
                height={533}
                src={book.cover}
                alt={`${book.title} ebook cover`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Genre Badge */}
              <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold rounded-full border border-amber-400/20 shadow-md">
                {book.genre}
              </span>

              {/* Price Badge */}
              <span className="absolute bottom-3 right-3 px-3 py-1 bg-amber-500 text-slate-950 text-sm font-extrabold rounded-lg shadow-md">
                {book.price}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col grow justify-between bg-slate-900/40">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    ★ {book.rating}{" "}
                    <span className="text-slate-500">({book.reviews})</span>
                  </span>
                  <span>{book.published}</span>
                </div>

                <h3 className="font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5 mb-2 font-medium">
                  by {book.author}
                </p>

                <p className="text-xs text-slate-400/80 line-clamp-2 leading-relaxed mb-4">
                  {book.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-700/50 hover:border-amber-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Preview Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
              <div className="flex gap-4">
                <Image
                  width={112}
                  height={168}
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  className="w-28 h-40 object-cover rounded-xl border border-slate-800 shadow"
                />
                <div className="flex-1">
                  <span className="text-xs text-amber-400 font-semibold">
                    {selectedBook.genre}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100">
                    {selectedBook.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">
                    by {selectedBook.author}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {selectedBook.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-400">
                      {selectedBook.price}
                    </span>
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 cursor-pointer"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
