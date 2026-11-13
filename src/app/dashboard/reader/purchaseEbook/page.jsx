"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getReaderPurchasedEbooks } from "@/lib/queries/queries";
import PurchasedEbooksList from "@/components/reader/PurchasedEbooksList";
import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { EbookCardSkeleton } from "@/components/LoadingSkeleton";

const ReaderPurchaseEbookPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const books = await getReaderPurchasedEbooks(user.id);
          setPurchasedBooks(Array.isArray(books) ? books : []);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setPurchasedBooks([]);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user?.id]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="space-y-6">
          <div className="text-center py-12">
            <GlobalLoadingSpinner size="lg" />
            <p className="mt-4 text-slate-400">Loading purchased ebooks...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EbookCardSkeleton />
            <EbookCardSkeleton />
            <EbookCardSkeleton />
          </div>
        </div>
      ) : (
        <PurchasedEbooksList
          books={purchasedBooks}
          user={user}
        />
      )}
    </div>
  );
};

export default ReaderPurchaseEbookPage;
