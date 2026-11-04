"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getOneEbook, getReaderPurchasedEbooks } from "@/lib/queries/queries";
import PurchasedEbooksList from "@/components/reader/PurchasedEbooksList";

const ReaderPurchaseEbookPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const searchParams = useSearchParams();
  const pendingEbookId = searchParams?.get("ebookId");

  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [pendingEbook, setPendingEbook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const [books, ebook] = await Promise.all([
            getReaderPurchasedEbooks(user.id),
            pendingEbookId ? getOneEbook(pendingEbookId) : null,
          ]);
          setPurchasedBooks(Array.isArray(books) ? books : []);
          setPendingEbook(ebook);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setPurchasedBooks([]);
          setPendingEbook(null);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user?.id, pendingEbookId]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading purchased ebooks...</p>
        </div>
      ) : (
        <PurchasedEbooksList
          books={purchasedBooks}
          user={user}
          pendingEbook={pendingEbook}
        />
      )}
    </div>
  );
};

export default ReaderPurchaseEbookPage;
